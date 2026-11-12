<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'lead_code',
        'name',
        'phone',
        'email',
        'city',
        'division',
        'project',
        'budget',
        'status',
        'priority',
        'source',
        'notes',
    ];
}
