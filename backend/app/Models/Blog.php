<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'author',
        'author_role',
        'author_photo',
        'image',
        'read_time',
        'summary',
        'content',
        'tags',
        'is_published',
        'views',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'tags' => 'array',
        'views' => 'integer',
        'published_at' => 'datetime',
    ];

    /**
     * Boot function to automatically generate slugs if not provided
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($blog) {
            if (empty($blog->slug)) {
                $blog->slug = Str::slug($blog->title);
            }
            if (empty($blog->published_at)) {
                $blog->published_at = now();
            }
        });
    }
}
