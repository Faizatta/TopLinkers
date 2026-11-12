<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SitemapController;

// Dynamic XML Sitemap & Robots.txt for Search Engines
Route::get('/sitemap.xml', [SitemapController::class, 'sitemap']);
Route::get('/robots.txt', [SitemapController::class, 'robots']);

Route::get('/', function () {
    return view('welcome');
});
