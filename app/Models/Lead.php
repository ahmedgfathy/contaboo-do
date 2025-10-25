<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lead extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'company',
        'job_title',
        'status',
        'source',
        'estimated_value',
        'notes',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'assigned_to',
        'created_by',
        'updated_by',
        'last_contact_date',
    ];

    protected $casts = [
        'estimated_value' => 'decimal:2',
        'last_contact_date' => 'datetime',
    ];

    protected $appends = ['full_name'];

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function audits()
    {
        return $this->hasMany(LeadAudit::class);
    }

    protected static function booted()
    {
        static::created(function ($lead) {
            $lead->createAudit('created', 'Lead created', null, $lead->toArray());
        });

        static::updated(function ($lead) {
            $original = $lead->getOriginal();
            $changes = $lead->getChanges();
            unset($changes['updated_at']);
            
            if (!empty($changes)) {
                $description = 'Lead updated: ' . implode(', ', array_keys($changes));
                $lead->createAudit('updated', $description, $original, $changes);
            }
        });

        static::deleted(function ($lead) {
            $lead->createAudit('deleted', 'Lead deleted', $lead->toArray(), null);
        });
    }

    public function createAudit($action, $description, $oldValues = null, $newValues = null)
    {
        // Only create audit if user is authenticated
        if (auth()->check()) {
            LeadAudit::create([
                'lead_id' => $this->id,
                'user_id' => auth()->id(),
                'action' => $action,
                'description' => $description,
                'old_values' => $oldValues,
                'new_values' => $newValues,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        }
    }
}