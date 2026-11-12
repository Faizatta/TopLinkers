<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MarketRate;
use Illuminate\Http\Request;

class RateController extends Controller
{
    public function index()
    {
        $record = MarketRate::where('key', 'live_rates')->first();
        return response()->json($record ? $record->payload : (object)[])
            ->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }

    public function store(Request $request)
    {
        $payload = $request->all();

        $record = MarketRate::updateOrCreate(
            ['key' => 'live_rates'],
            ['payload' => $payload]
        );

        return response()->json([
            'success' => true,
            'rates' => $record->payload,
        ]);
    }

    public function getPromoStrip()
    {
        $record = MarketRate::where('key', 'promo_strip')->first();
        return response()->json($record ? $record->payload : [
            'enabled' => true,
            'badge' => 'LIMITED OFFER',
            'text' => 'Flash Booking Offer: Special Reduced Rates on Selected PECHS / TopCity Plots & Harsukh Suites!',
            'ctaLabel' => 'Explore Offers',
            'ctaLink' => '/listings',
            'expiresAt' => '',
        ])->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }

    public function storePromoStrip(Request $request)
    {
        $payload = $request->validate([
            'enabled' => 'nullable|boolean',
            'badge' => 'nullable|string|max:80',
            'text' => 'nullable|string|max:500',
            'ctaLabel' => 'nullable|string|max:80',
            'ctaLink' => 'nullable|string|max:255',
            'expiresAt' => 'nullable|string|max:80',
        ]);

        $record = MarketRate::updateOrCreate(
            ['key' => 'promo_strip'],
            ['payload' => $payload]
        );

        return response()->json([
            'success' => true,
            'promoStrip' => $record->payload,
        ]);
    }
}
