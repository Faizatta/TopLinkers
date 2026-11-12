<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Generate dynamic XML sitemap with all public pages & property listings.
     */
    public function sitemap(): Response
    {
        $baseUrl = 'https://toplinkers.com';
        $today = date('Y-m-d');

        $staticPages = [
            ['loc' => '/', 'priority' => '1.0', 'changefreq' => 'daily', 'image' => "{$baseUrl}/toplinkers-logo.jpg", 'title' => 'Top Linkers Real Estate, Construction & Solar'],
            ['loc' => '/hr-sukh', 'priority' => '0.95', 'changefreq' => 'weekly', 'image' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85', 'title' => 'Harsukh Residencies Nathia Gali Hillside Suites'],
            ['loc' => '/listings', 'priority' => '0.90', 'changefreq' => 'daily'],
            ['loc' => '/services', 'priority' => '0.85', 'changefreq' => 'weekly'],
            ['loc' => '/team', 'priority' => '0.80', 'changefreq' => 'weekly'],
            ['loc' => '/about', 'priority' => '0.80', 'changefreq' => 'monthly'],
            ['loc' => '/contact', 'priority' => '0.80', 'changefreq' => 'monthly'],
            ['loc' => '/compare', 'priority' => '0.70', 'changefreq' => 'monthly'],
            ['loc' => '/create-listing', 'priority' => '0.70', 'changefreq' => 'monthly'],
        ];

        $properties = Property::all();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
        $xml .= '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";

        // Static routes
        foreach ($staticPages as $page) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . htmlspecialchars("{$baseUrl}{$page['loc']}") . "</loc>\n";
            $xml .= "    <lastmod>{$today}</lastmod>\n";
            $xml .= "    <changefreq>{$page['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$page['priority']}</priority>\n";
            if (!empty($page['image'])) {
                $xml .= "    <image:image>\n";
                $xml .= "      <image:loc>" . htmlspecialchars($page['image']) . "</image:loc>\n";
                $xml .= "      <image:title>" . htmlspecialchars($page['title'] ?? 'Top Linkers') . "</image:title>\n";
                $xml .= "    </image:image>\n";
            }
            $xml .= "  </url>\n";
        }

        // Dynamic property listings
        foreach ($properties as $prop) {
            $lastmod = $prop->updated_at ? $prop->updated_at->format('Y-m-d') : $today;
            $slugEncoded = rawurlencode($prop->slug);
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . htmlspecialchars("{$baseUrl}/property/{$slugEncoded}") . "</loc>\n";
            $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.80</priority>\n";
            if ($prop->image) {
                $xml .= "    <image:image>\n";
                $xml .= "      <image:loc>" . htmlspecialchars($prop->image) . "</image:loc>\n";
                $xml .= "      <image:title>" . htmlspecialchars($prop->title) . "</image:title>\n";
                $xml .= "    </image:image>\n";
            }
            $xml .= "  </url>\n";
        }

        $xml .= "</urlset>\n";

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8',
            'Cache-Control' => 'public, max-age=3600'
        ]);
    }

    /**
     * Generate robots.txt
     */
    public function robots(): Response
    {
        $txt = "# Top Linkers Real Estate, Construction & Solar - robots.txt\n";
        $txt .= "User-agent: *\n";
        $txt .= "Allow: /\n";
        $txt .= "Disallow: /admin/\n";
        $txt .= "Disallow: /api/\n\n";
        $txt .= "# Host & Sitemaps\n";
        $txt .= "Host: https://toplinkers.com\n";
        $txt .= "Sitemap: https://toplinkers.com/sitemap.xml\n";

        return response($txt, 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
            'Cache-Control' => 'public, max-age=86400'
        ]);
    }
}
