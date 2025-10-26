<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'type',
        'status',
        'listing_type',
        'price',
        'area',
        'bedrooms',
        'bathrooms',
        'parking_spaces',
        'floor_number',
        'total_floors',
        'year_built',
        'furnished',
        'amenities',
        'images',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'latitude',
        'longitude',
        'reference_number',
        'notes',
        'owner_id',
        'assigned_to',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'area' => 'decimal:2',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'furnished' => 'boolean',
        'amenities' => 'array',
        'images' => 'array',
        'year_built' => 'integer',
    ];

    protected $appends = ['full_address'];

    // Relationships
    public function owner(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'owner_id');
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
        return $this->hasMany(PropertyAudit::class)->latest();
    }

    // Accessors
    public function getFullAddressAttribute(): string
    {
        $parts = array_filter([
            $this->address,
            $this->city,
            $this->state,
            $this->country,
            $this->postal_code,
        ]);

        return implode(', ', $parts);
    }

    // Model Events for Audit
    protected static function booted(): void
    {
        static::created(function ($property) {
            $property->createAudit('created', 'Property created');
        });

        static::updated(function ($property) {
            $changes = $property->getChanges();
            unset($changes['updated_at']);

            if (!empty($changes)) {
                $description = 'Property updated';
                $action = 'updated';

                if (isset($changes['status'])) {
                    $action = 'status_changed';
                    $description = "Status changed from {$property->getOriginal('status')} to {$changes['status']}";
                } elseif (isset($changes['price'])) {
                    $action = 'price_changed';
                    $description = "Price changed from {$property->getOriginal('price')} to {$changes['price']}";
                } elseif (isset($changes['assigned_to'])) {
                    $action = 'assigned';
                    $oldUser = $property->getOriginal('assigned_to') ? User::find($property->getOriginal('assigned_to'))->name : 'Unassigned';
                    $newUser = $changes['assigned_to'] ? User::find($changes['assigned_to'])->name : 'Unassigned';
                    $description = "Assigned from {$oldUser} to {$newUser}";
                }

                $property->createAudit($action, $description, $property->getOriginal(), $changes);
            }
        });

        static::deleted(function ($property) {
            $property->createAudit('deleted', 'Property deleted');
        });
    }

    private function createAudit(string $action, string $description, array $oldValues = [], array $newValues = []): void
    {
        if (!auth()->check()) {
            return;
        }

        PropertyAudit::create([
            'property_id' => $this->id,
            'user_id' => auth()->id(),
            'action' => $action,
            'description' => $description,
            'old_values' => !empty($oldValues) ? $oldValues : null,
            'new_values' => !empty($newValues) ? $newValues : null,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}
