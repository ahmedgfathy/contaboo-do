<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Opportunity extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'lead_id',
        'property_id',
        'value',
        'probability',
        'stage',
        'expected_close_date',
        'actual_close_date',
        'type',
        'status',
        'notes',
        'lost_reason',
        'assigned_to',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'probability' => 'integer',
        'expected_close_date' => 'date',
        'actual_close_date' => 'date',
    ];

    protected static function booted()
    {
        static::created(function ($opportunity) {
            OpportunityAudit::create([
                'opportunity_id' => $opportunity->id,
                'user_id' => auth()->id(),
                'action' => 'created',
                'new_values' => $opportunity->toArray(),
                'description' => 'Opportunity created',
            ]);
        });

        static::updated(function ($opportunity) {
            $changes = $opportunity->getChanges();
            if (!empty($changes)) {
                $description = 'Opportunity updated';
                
                if (isset($changes['stage'])) {
                    $description = "Stage changed from {$opportunity->getOriginal('stage')} to {$changes['stage']}";
                } elseif (isset($changes['status'])) {
                    $description = "Status changed from {$opportunity->getOriginal('status')} to {$changes['status']}";
                }

                OpportunityAudit::create([
                    'opportunity_id' => $opportunity->id,
                    'user_id' => auth()->id(),
                    'action' => 'updated',
                    'old_values' => $opportunity->getOriginal(),
                    'new_values' => $changes,
                    'description' => $description,
                ]);
            }
        });
    }

    // Relationships
    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function audits(): HasMany
    {
        return $this->hasMany(OpportunityAudit::class)->latest();
    }
}
