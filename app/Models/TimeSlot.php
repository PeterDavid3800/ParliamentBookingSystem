<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TimeSlot extends Model
{
    protected $fillable = [
        'date',
        'start_time',
        'end_time',
        'max_bookings',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'max_bookings' => 'integer',
        ];
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function getBookedCountAttribute(): int
    {
        return $this->bookings()->where('status', '!=', 'cancelled')->count();
    }

    public function getIsAvailableAttribute(): bool
    {
        return $this->booked_count < $this->max_bookings;
    }

    public function getAvailableSpotsAttribute(): int
    {
        return max(0, $this->max_bookings - $this->booked_count);
    }

    public function scopeForDate($query, $date)
    {
        return $query->where('date', $date);
    }

    public function getTimeRangeAttribute(): string
    {
        return date('g:i A', strtotime($this->start_time))
            . ' – '
            . date('g:i A', strtotime($this->end_time));
    }
}
