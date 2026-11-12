<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'member_code',
        'name',
        'role',
        'category',
        'tag',
        'experience',
        'phone',
        'whatsapp',
        'email',
        'photo',
        'bio',
        'quote',
        'address',
        'instagram',
        'facebook',
        'linkedin',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
