<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'type',
        'company_name',
        'contact_person',
        'email',
        'phone',
        'mobile',
        'website',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'status',
        'notes',
        'original_lead_id',
        'created_by',
        'updated_by',
    ];

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

    // Original lead that was converted to this contact
    public function originalLead()
    {
        return $this->belongsTo(Lead::class, 'original_lead_id');
    }

    // Activities related to this contact
    public function activities()
    {
        return $this->morphMany(Activity::class, 'related');
    }

    // Scope for active contacts
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // Scope for specific type
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }
}
