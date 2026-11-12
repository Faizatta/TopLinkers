<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PropertyController extends Controller
{
    public function index()
    {
        return response()->json(Property::orderByDesc('created_at')->get())
            ->header('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|integer',
            'type' => 'nullable|string',
            'purpose' => 'nullable|string',
            'location' => 'nullable|string',
            'area' => 'nullable|string',
            'bedrooms' => 'nullable|integer',
            'bathrooms' => 'nullable|integer',
            'image' => 'nullable|string',
            'featured' => 'nullable|boolean',
            'description' => 'nullable|string',
            'offer_enabled' => 'nullable|boolean',
            'offer_label' => 'nullable|string|max:120',
            'offer_price' => 'nullable|integer',
            'offer_expires_at' => 'nullable|string|max:80',
        ]);

        $slug = $request->input('slug') ?: Str::slug($validated['title']) . '-' . time();

        $property = Property::updateOrCreate(
            ['slug' => $slug],
            [
                'title' => $validated['title'],
                'price' => $validated['price'],
                'type' => $validated['type'] ?? 'plot',
                'purpose' => $validated['purpose'] ?? 'for-sale',
                'location' => $validated['location'] ?? 'Islamabad',
                'area' => $validated['area'] ?? '10 Marla',
                'bedrooms' => $validated['bedrooms'] ?? 0,
                'bathrooms' => $validated['bathrooms'] ?? 0,
                'image' => $validated['image'] ?? null,
                'featured' => $validated['featured'] ?? false,
                'description' => $validated['description'] ?? null,
                'offer_enabled' => (bool) ($validated['offer_enabled'] ?? false),
                'offer_label' => $validated['offer_label'] ?? null,
                'offer_price' => $validated['offer_price'] ?? null,
                'offer_expires_at' => $validated['offer_expires_at'] ?? null,
            ]
        );

        return response()->json($property, 201);
    }

    public function update(Request $request, string $id)
    {
        $property = Property::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        $property->update($request->all());
        return response()->json($property);
    }

    public function destroy(string $id)
    {
        $property = Property::where('id', $id)->orWhere('slug', $id)->first();
        if ($property) {
            $property->delete();
        }
        return response()->json(['success' => true]);
    }
}
