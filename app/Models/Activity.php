<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Activity extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'type',
        'subject',
        'description',
        'due_date',
        'completed_at',
        'priority',
        'status',
        'duration',
        'location',
        'related_type',
        'related_id',
        'assigned_to',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'due_date' => 'datetime',
        'completed_at' => 'datetime',
    ];

    // Polymorphic relationship - can relate to any model
    public function related()
    {
        return $this->morphTo();
    }

    // Assigned user
    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    // Created by user
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Updated by user
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // Scope for overdue activities
    public function scopeOverdue($query)
    {
        return $query->where('status', '!=', 'completed')
            ->where('due_date', '<', now());
    }

    // Scope for upcoming activities
    public function scopeUpcoming($query)
    {
        return $query->where('status', '!=', 'completed')
            ->where('due_date', '>=', now())
            ->orderBy('due_date', 'asc');
    }

    // Scope for completed activities
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    // Check if activity is overdue
    public function isOverdue()
    {
        return $this->status !== 'completed' 
            && $this->due_date 
            && $this->due_date->isPast();
    }

    // Mark as complete
    public function complete()
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);
    }

    // Mark as incomplete
    public function uncomplete()
    {
        $this->update([
            'status' => 'pending',
            'completed_at' => null,
        ]);
    }
}
