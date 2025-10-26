<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SavedFilter extends Model
{
    protected $fillable = [
        'name',
        'user_id',
        'is_public',
        'module',
        'columns',
        'conditions',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'columns' => 'array',
        'conditions' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scope to get filters accessible by a user (their own + public filters)
    public function scopeAccessibleBy($query, $userId)
    {
        return $query->where(function($q) use ($userId) {
            $q->where('user_id', $userId)
              ->orWhere('is_public', true);
        });
    }
}
