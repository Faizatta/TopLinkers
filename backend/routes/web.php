<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SitemapController;

// Dynamic XML Sitemap & Robots.txt for Search Engines
Route::get('/sitemap.xml', [SitemapController::class, 'sitemap']);
Route::get('/robots.txt', [SitemapController::class, 'robots']);
Route::get('/ads.txt', function () {
    return response("google.com, pub-9699786853848201, DIRECT, f08c47fec0942fa0\n", 200)
        ->header('Content-Type', 'text/plain; charset=utf-8');
});

Route::get('/', function () {
    return view('welcome');
});
