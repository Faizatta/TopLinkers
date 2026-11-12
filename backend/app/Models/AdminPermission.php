<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminPermission extends Model
{
    protected $fillable = [
        'key',
        'label',
        'module',
        'description',
        'is_system',
    ];

    protected $casts = [
        'is_system' => 'boolean',
    ];
}
