<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Get all blogs with optional filtering
     */
    public function index(Request $request)
    {
        $this->seedDefaultsIfEmpty();

        $query = Blog::query();

        // If not admin request, only show published posts
        if (!$request->boolean('all') && !$request->boolean('admin')) {
            $query->where('is_published', true);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->filled('q')) {
            $term = '%' . $request->input('q') . '%';
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', $term)
                  ->orWhere('summary', 'like', $term)
                  ->orWhere('content', 'like', $term)
                  ->orWhere('author', 'like', $term);
            });
        }

        $blogs = $query->orderBy('created_at', 'desc')->get()->map(function ($b) {
            return $this->formatBlog($b);
        });

        return response()->json($blogs)
            ->header('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');
    }

    /**
     * Get single blog by slug or ID
     */
    public function show($slugOrId)
    {
        $this->seedDefaultsIfEmpty();

        $blog = Blog::where('slug', $slugOrId)
            ->orWhere('id', $slugOrId)
            ->firstOrFail();

        // Increment view count
        $blog->increment('views');

        return response()->json($this->formatBlog($blog))
            ->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }

    /**
     * Upload an image file from local device/system
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|file|image|mimes:jpeg,png,jpg,webp,gif,svg|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $ext = strtolower($file->getClientOriginalExtension() ?: 'jpg');
            $filename = 'blog_' . time() . '_' . Str::random(8) . '.' . $ext;
            $targetDir = public_path('uploads/blogs');
            if (!file_exists($targetDir)) {
                @mkdir($targetDir, 0755, true);
            }
            $file->move($targetDir, $filename);

            $url = url('uploads/blogs/' . $filename);
            return response()->json([
                'success' => true,
                'url' => $url,
                'filename' => $filename
            ]);
        }

        return response()->json(['error' => 'No image file uploaded'], 400);
    }

    /**
     * Convert base64 data URLs into static files on disk if present
     */
    private function processImagePayload(?string $imageField, string $prefix = 'blog'): ?string
    {
        if (empty($imageField)) {
            return $imageField;
        }

        if (preg_match('/^data:image\/(\w+);base64,/', $imageField, $type)) {
            $data = substr($imageField, strpos($imageField, ',') + 1);
            $ext = strtolower($type[1]);
            if (!in_array($ext, ['jpg', 'jpeg', 'gif', 'png', 'webp', 'svg'])) {
                $ext = 'png';
            }
            if ($ext === 'jpeg') $ext = 'jpg';

            $decoded = base64_decode($data);
            if ($decoded !== false) {
                $filename = $prefix . '_' . time() . '_' . Str::random(8) . '.' . $ext;
                $targetDir = public_path('uploads/blogs');
                if (!file_exists($targetDir)) {
                    @mkdir($targetDir, 0755, true);
                }
                file_put_contents($targetDir . DIRECTORY_SEPARATOR . $filename, $decoded);
                return url('uploads/blogs/' . $filename);
            }
        }

        return $imageField;
    }

    /**
     * Create a new blog post
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blogs,slug',
            'category' => 'required|string|max:100',
            'author' => 'required|string|max:120',
            'author_role' => 'nullable|string|max:120',
            'author_photo' => 'nullable|string',
            'image' => 'nullable|string',
            'read_time' => 'nullable|string|max:50',
            'summary' => 'required|string|max:2000',
            'content' => 'required|string',
            'is_published' => 'nullable|boolean',
            'tags' => 'nullable|array',
        ]);

        $slug = !empty($validated['slug']) 
            ? Str::slug($validated['slug']) 
            : Str::slug($validated['title']);

        // Check if slug collision exists
        $origSlug = $slug;
        $count = 1;
        while (Blog::where('slug', $slug)->exists()) {
            $slug = "{$origSlug}-{$count}";
            $count++;
        }

        $coverImage = isset($validated['image']) ? $this->processImagePayload($validated['image'], 'cover') : null;
        $authorPhoto = isset($validated['author_photo']) ? $this->processImagePayload($validated['author_photo'], 'author') : null;

        $blog = Blog::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'category' => $validated['category'],
            'author' => $validated['author'],
            'author_role' => $validated['author_role'] ?? 'TopLinkers Specialist',
            'author_photo' => $authorPhoto ?? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
            'image' => $coverImage ?? 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
            'read_time' => $validated['read_time'] ?? '5 min read',
            'summary' => $validated['summary'],
            'content' => $validated['content'],
            'is_published' => $request->input('is_published', true),
            'tags' => $validated['tags'] ?? [],
            'published_at' => now(),
        ]);

        return response()->json($this->formatBlog($blog), 201);
    }

    /**
     * Update an existing blog post
     */
    public function update(Request $request, $id)
    {
        $blog = Blog::where('id', $id)
            ->orWhere('slug', $id)
            ->firstOrFail();

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blogs,slug,' . $blog->id,
            'category' => 'sometimes|required|string|max:100',
            'author' => 'sometimes|required|string|max:120',
            'author_role' => 'nullable|string|max:120',
            'author_photo' => 'nullable|string',
            'image' => 'nullable|string',
            'read_time' => 'nullable|string|max:50',
            'summary' => 'sometimes|required|string|max:2000',
            'content' => 'sometimes|required|string',
            'is_published' => 'nullable|boolean',
            'tags' => 'nullable|array',
        ]);

        if (isset($validated['slug']) && $validated['slug'] !== $blog->slug) {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        if (isset($validated['image'])) {
            $validated['image'] = $this->processImagePayload($validated['image'], 'cover');
        }
        if (isset($validated['author_photo'])) {
            $validated['author_photo'] = $this->processImagePayload($validated['author_photo'], 'author');
        }

        $blog->update($validated);

        return response()->json($this->formatBlog($blog));
    }

    /**
     * Delete a blog post
     */
    public function destroy($id)
    {
        $blog = Blog::where('id', $id)
            ->orWhere('slug', $id)
            ->firstOrFail();

        $blog->delete();

        return response()->json(['message' => 'Article deleted successfully', 'id' => $id]);
    }

    /**
     * Format model into unified frontend representation
     */
    private function formatBlog(Blog $b): array
    {
        return [
            'id' => (string) $b->id,
            'db_id' => $b->id,
            'title' => $b->title,
            'slug' => $b->slug,
            'category' => $b->category,
            'author' => $b->author,
            'authorRole' => $b->author_role,
            'authorPhoto' => $b->author_photo,
            'image' => $b->image,
            'readTime' => $b->read_time,
            'summary' => $b->summary,
            'content' => $b->content,
            'date' => $b->published_at ? $b->published_at->format('F d, Y') : $b->created_at->format('F d, Y'),
            'tags' => $b->tags ?? [],
            'isPublished' => (bool) $b->is_published,
            'views' => (int) $b->views,
            'created_at' => $b->created_at->toISOString(),
            'updated_at' => $b->updated_at->toISOString(),
        ];
    }

    /**
     * Seed initial TopLinkers blog articles if table is empty
     */
    private function seedDefaultsIfEmpty()
    {
        if (Blog::count() > 0) {
            return;
        }

        $seedPosts = [
            [
                'title' => 'Complete Guide to PHA Flats in Sector I-12 & I-16: Prices, Layouts & Rental Yields',
                'slug' => 'pha-flats-i12-i16-investment-guide',
                'category' => 'PHA Housing',
                'author' => 'Muhammad Tariq',
                'author_role' => 'Founder & Chief Executive',
                'author_photo' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
                'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
                'read_time' => '5 min read',
                'summary' => 'Detailed breakdown of C-Type (1,100 & 912 Sq Ft), D-Type (870 Sq Ft), and B-Type (1,496 Sq Ft) units with cash and installment payment schedules.',
                'content' => "Pakistan Housing Authority (PHA) apartments in Sector I-12 and Sector I-16 have become prime opportunities for both end-users and investors seeking steady rental yields in Islamabad. With construction progressing swiftly and CDA arterial road links operating smoothly, prices ranging from PKR 48 Lac to PKR 85 Lac offer unmatched affordability compared to private apartment schemes.\n\nTopLinkers Advisory maintains on-ground site inspection desks in both sectors to guide clients through title verification, installment schedule clearance, and fast possession transfer.",
                'is_published' => true,
                'views' => 1420,
                'published_at' => now()->subDays(24),
            ],
            [
                'title' => 'TopCity-1 vs Faisal Town Phase II: Where Should You Buy a 10 Marla Plot in 2026?',
                'slug' => 'topcity1-faisal-town2-motorway-growth',
                'category' => 'Market Trends',
                'author' => 'Kamran Akhtar',
                'author_role' => 'Senior Real Estate Analyst',
                'author_photo' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
                'image' => 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80',
                'read_time' => '6 min read',
                'summary' => 'Comparative valuation between TopCity-1 on Islamabad Airport interchange and Zedem\'s high-demand Faisal Town Phase 2.',
                'content' => "With the expansion of the Rawalpindi Ring Road and Islamabad Airport Metro link, properties situated along the western expressway corridor have seen significant appreciation. TopCity-1 offers ready possession with underground infrastructure at PKR 2.5 Crore for 10 Marla, while FT-II provides flexible 4-year installment files.\n\nInvestors looking for medium-term capital gains often diversify between both options to balance immediate rental/possession value with installment leverage.",
                'is_published' => true,
                'views' => 980,
                'published_at' => now()->subDays(20),
            ],
            [
                'title' => 'Installing 10kW, 20kW & 50kW Solar Systems: Slashing WAPDA Bills in Pakistan',
                'slug' => 'solar-energy-pakistan-homes-roi',
                'category' => 'Solar Solutions',
                'author' => 'Asif Mahmood',
                'author_role' => 'PEC Registered Lead Engineer',
                'author_photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                'image' => 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=80',
                'read_time' => '5 min read',
                'summary' => 'TopLinkers Engineering guide to on-grid Net Metering systems, hybrid battery backups, and 2.5-year ROI benchmarks.',
                'content' => "As electricity tariffs increase, solar power is no longer an optional luxury but a vital home infrastructure requirement. TopLinkers Solar Solutions provides turnkey net metering installations across 3 primary categories: 10kW for 1 Kanal homes, 20kW for large villas/commercial offices, and 50kW for multi-story plazas.\n\nWith Tier-1 N-Type TOPCon bifacial panels and high-efficiency European inverters, households achieve complete grid bill relief with payback in under 28 months.",
                'is_published' => true,
                'views' => 2130,
                'published_at' => now()->subDays(13),
            ],
            [
                'title' => 'Commercial Real Estate in Gulberg Islamabad: Opal Square & D-Markaz Outlook',
                'slug' => 'gulberg-greens-commercial-plazas-appraisal',
                'category' => 'Commercial Realty',
                'author' => 'Muhammad Tariq',
                'author_role' => 'Founder & Chief Executive',
                'author_photo' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
                'read_time' => '4 min read',
                'summary' => 'Why multinational firms, digital agencies, and banks are concentrating in Gulberg Islamabad\'s commercial corridors.',
                'content' => "Gulberg Islamabad has emerged as the premier corporate and luxury residential district of the twin cities. Anchored by wide signal-free expressways, lush landscaping, and fiber-optic grids, commercial real estate in Opal Square and D-Markaz yields attractive corporate rental returns.",
                'is_published' => true,
                'views' => 740,
                'published_at' => now()->subDays(9),
            ],
            [
                'title' => 'PECHS Islamabad: Affordable 5 Marla Plots Starting from PKR 25 Lac',
                'slug' => 'pechs-affordable-housing-islamabad',
                'category' => 'Affordable Plots',
                'author' => 'Zainab Rehman',
                'author_role' => 'Property Advisor',
                'author_photo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
                'image' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
                'read_time' => '4 min read',
                'summary' => 'Analyzing PECHS boundary wall security, rapid construction permits, and strategic location next to Fateh Jang road.',
                'content' => "For genuine buyers with budgets under PKR 30 Lac, PECHS society provides registered plots with direct CDA zone alignment. Our sales team details block-by-block development status and utility access.",
                'is_published' => true,
                'views' => 1100,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Turnkey Construction Costs in Islamabad & Rawalpindi (2026 Material Rates)',
                'slug' => 'turnkey-construction-cost-per-sqft-islamabad',
                'category' => 'Construction',
                'author' => 'Asif Mahmood',
                'author_role' => 'PEC Registered Lead Engineer',
                'author_photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
                'read_time' => '7 min read',
                'summary' => 'Current per-square-foot rates for gray structure and premium finishings in DHA, Bahria Town and Gulberg.',
                'content' => "Building a custom house requires careful material selection and experienced on-site engineering. TopLinkers Construction breaks down steel, cement, European tiles, thermal glass, and labor pricing per square foot.",
                'is_published' => true,
                'views' => 1890,
                'published_at' => now()->subDays(3),
            ]
        ];

        foreach ($seedPosts as $post) {
            Blog::create($post);
        }
    }
}
