<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'price',
        'type',
        'purpose',
        'location',
        'area',
        'bedrooms',
        'bathrooms',
        'image',
        'featured',
        'description',
        'offer_enabled',
        'offer_label',
        'offer_price',
        'offer_expires_at',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'price' => 'integer',
        'offer_enabled' => 'boolean',
        'offer_price' => 'integer',
    ];
}
