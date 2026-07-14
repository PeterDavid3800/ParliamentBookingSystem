<?php

namespace App\Services;

use App\Models\TimeSlot;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class TimeSlotService
{
    /**
     * Define slot rules per day of week.
     * Returns an array of [start_time, end_time, max_bookings] for each slot on that day.
     */
    public static function getSlotDefinitions(Carbon $date): array
    {
        $dayOfWeek = $date->dayOfWeek; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat

        return match ($dayOfWeek) {
            // Tuesday — sitting day, morning only
            2 => [
                ['start' => '08:00', 'end' => '11:00', 'max' => 4],
            ],
            // Wednesday — sitting day, full day
            3 => [
                ['start' => '08:00', 'end' => '12:45', 'max' => 4],
                ['start' => '12:45', 'end' => '17:30', 'max' => 4],
            ],
            // Thursday — sitting day, afternoon only
            4 => [
                ['start' => '14:30', 'end' => '17:30', 'max' => 4],
            ],
            // Monday & Friday — non-sitting, extended full day
            1, 5 => [
                ['start' => '08:00', 'end' => '12:45', 'max' => 5],
                ['start' => '12:45', 'end' => '17:30', 'max' => 5],
            ],
            // Saturday & Sunday — closed
            default => [],
        };
    }

    /**
     * Get existing slots for a date or create them on demand.
     */
    public static function getOrCreateSlots(Carbon $date): Collection
    {
        $existing = TimeSlot::where('date', $date->toDateString())->get();

        if ($existing->isNotEmpty()) {
            return $existing;
        }

        $definitions = static::getSlotDefinitions($date);

        if (empty($definitions)) {
            return collect();
        }

        foreach ($definitions as $def) {
            TimeSlot::create([
                'date' => $date->toDateString(),
                'start_time' => $def['start'],
                'end_time' => $def['end'],
                'max_bookings' => $def['max'],
            ]);
        }

        return TimeSlot::where('date', $date->toDateString())->get();
    }

    /**
     * Get available slots (with capacity remaining) for a date.
     */
    public static function getAvailableSlots(Carbon $date): Collection
    {
        return static::getOrCreateSlots($date)
            ->filter(fn (TimeSlot $slot) => $slot->is_available)
            ->values();
    }

    /**
     * Check if a date is available for booking (not closed, not in the past).
     */
    public static function isDateAvailable(Carbon $date): bool
    {
        $definitions = static::getSlotDefinitions($date);

        return ! empty($definitions);
    }
}
