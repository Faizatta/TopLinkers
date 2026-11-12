<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\RateController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BlogController;

Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'service' => 'TopLinkers Executive API']);
});

// Admin Auth
Route::post('/login', [AuthController::class, 'login']);

// Lead Generation & CRM
Route::get('/leads', [LeadController::class, 'index']);
Route::post('/leads', [LeadController::class, 'store']);
Route::patch('/leads/{id}/status', [LeadController::class, 'updateStatus']);
Route::delete('/leads/{id}', [LeadController::class, 'destroy']);

// Live Market Rates & Front Promo Strip
Route::get('/rates', [RateController::class, 'index']);
Route::post('/rates', [RateController::class, 'store']);
Route::get('/promo-strip', [RateController::class, 'getPromoStrip']);
Route::post('/promo-strip', [RateController::class, 'storePromoStrip']);

// Properties Manager
Route::get('/properties', [PropertyController::class, 'index']);
Route::post('/properties', [PropertyController::class, 'store']);
Route::put('/properties/{id}', [PropertyController::class, 'update']);
Route::delete('/properties/{id}', [PropertyController::class, 'destroy']);

// Owner, Partners & Team Employees Manager
Route::get('/team', [TeamController::class, 'index']);
Route::post('/team', [TeamController::class, 'store']);
Route::put('/team/{id}', [TeamController::class, 'update']);
Route::delete('/team/{id}', [TeamController::class, 'destroy']);

// Admin Roles & Permissions Manager
Route::get('/roles', [RoleController::class, 'index']);
Route::post('/roles', [RoleController::class, 'storeRole']);
Route::put('/roles/{id}', [RoleController::class, 'updateRole']);
Route::delete('/roles/{id}', [RoleController::class, 'destroyRole']);
Route::post('/permissions', [RoleController::class, 'storePermission']);
Route::delete('/permissions/{id}', [RoleController::class, 'destroyPermission']);

// Client Reviews & Testimonials Manager
Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);
Route::put('/reviews/{id}', [ReviewController::class, 'update']);
Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);

// Portal Login Users Manager (RBAC)
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Blog Articles & Market Insights Manager
Route::post('/upload', [BlogController::class, 'uploadImage']);
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{slug}', [BlogController::class, 'show']);
Route::post('/blogs', [BlogController::class, 'store']);
Route::put('/blogs/{id}', [BlogController::class, 'update']);
Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);
