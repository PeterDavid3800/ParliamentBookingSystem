<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    protected $fillable = [
        'time_slot_id',
        'institution_name',
        'institution_category',
        'contact_person',
        'contact_email',
        'contact_phone',
        'reason_for_visit',
        'visitor_count',
        'learner_count',
        'accompanying_persons',
        'has_disability',
        'disability_nature',
        'county',
        'constituency',
        'consent_accepted',
        'consent_accepted_at',
        'status',
        'confirmation_code',
    ];

    protected function casts(): array
    {
        return [
            'visitor_count' => 'integer',
            'learner_count' => 'integer',
            'accompanying_persons' => 'integer',
            'has_disability' => 'boolean',
            'consent_accepted' => 'boolean',
            'consent_accepted_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Booking $booking) {
            if (empty($booking->confirmation_code)) {
                $booking->confirmation_code = 'PV-' . strtoupper(substr(
                    bin2hex(random_bytes(4)),
                    0,
                    8
                ));
            }
        });
    }

    public function timeSlot(): BelongsTo
    {
        return $this->belongsTo(TimeSlot::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    public function scopeSearch($query, string $term)
    {
        return $query->where(function ($q) use ($term) {
            $q->where('institution_name', 'like', "%{$term}%")
              ->orWhere('contact_person', 'like', "%{$term}%")
              ->orWhere('confirmation_code', 'like', "%{$term}%")
              ->orWhere('county', 'like', "%{$term}%")
              ->orWhere('constituency', 'like', "%{$term}%");
        });
    }
}
