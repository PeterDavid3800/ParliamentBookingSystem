<?php

namespace App\Services;

use App\Models\TimeSlot;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class TimeSlotService
{
    /**
     * Visits run Monday-Friday, 9:00 AM-5:00 PM.
     * Sitting days (Tue-Thu): 20-minute slots.
     * Non-sitting days (Mon/Fri): 30-minute slots.
     */
    public static function getSlotDefinitions(Carbon $date): array
    {
        $dayOfWeek = $date->dayOfWeek;

        if (! in_array($dayOfWeek, [1, 2, 3, 4, 5], true)) {
            return [];
        }

        $durationMinutes = in_array($dayOfWeek, [2, 3, 4], true) ? 20 : 30;
        $cursor = Carbon::createFromFormat('H:i', '09:00');
        $closing = Carbon::createFromFormat('H:i', '17:00');
        $definitions = [];

        while ($cursor->lt($closing)) {
            $end = $cursor->copy()->addMinutes($durationMinutes);
            if ($end->gt($closing)) {
                break;
            }

            $definitions[] = [
                'start' => $cursor->format('H:i'),
                'end' => $end->format('H:i'),
                'max' => 1,
            ];

            $cursor = $end;
        }

        return $definitions;
    }

    public static function getOrCreateSlots(Carbon $date): Collection
    {
        $definitions = static::getSlotDefinitions($date);

        if (empty($definitions)) {
            return collect();
        }

        $dateString = $date->toDateString();
        $desiredKeys = collect($definitions)
            ->map(fn ($def) => $def['start'] . '-' . $def['end'])
            ->all();

        $existing = TimeSlot::where('date', $dateString)->get();

        foreach ($existing as $slot) {
            $key = substr($slot->start_time, 0, 5) . '-' . substr($slot->end_time, 0, 5);
            if (! in_array($key, $desiredKeys, true) && $slot->bookings()->count() === 0) {
                $slot->delete();
            }
        }

        foreach ($definitions as $def) {
            TimeSlot::firstOrCreate(
                [
                    'date' => $dateString,
                    'start_time' => $def['start'],
                    'end_time' => $def['end'],
                ],
                ['max_bookings' => $def['max']]
            );
        }

        return TimeSlot::where('date', $dateString)
            ->where(function ($query) use ($definitions) {
                foreach ($definitions as $index => $def) {
                    $method = $index === 0 ? 'where' : 'orWhere';
                    $query->{$method}(function ($q) use ($def) {
                        $q->where('start_time', $def['start'])
                          ->where('end_time', $def['end']);
                    });
                }
            })
            ->orderBy('start_time')
            ->get();
    }

    public static function getAvailableSlots(Carbon $date): Collection
    {
        return static::getOrCreateSlots($date)
            ->filter(fn (TimeSlot $slot) => $slot->is_available)
            ->values();
    }

    public static function isDateAvailable(Carbon $date): bool
    {
        return ! empty(static::getSlotDefinitions($date));
    }
}
