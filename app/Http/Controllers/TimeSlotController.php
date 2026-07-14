<?php

namespace App\Http\Controllers;

use App\Services\TimeSlotService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TimeSlotController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'date' => ['required', 'date', 'after_or_equal:today'],
        ]);

        $date = Carbon::parse($request->input('date'));

        // Reject dates more than 90 days in the future
        if ($date->gt(now()->addDays(90))) {
            return response()->json([
                'slots' => [],
                'message' => 'Bookings can only be made up to 90 days in advance.',
            ]);
        }

        // Check if date is available (not a weekend / closed day)
        if (! TimeSlotService::isDateAvailable($date)) {
            return response()->json([
                'slots' => [],
                'message' => 'No visits are available on this date. The Parliament is closed on weekends.',
            ]);
        }

        $slots = TimeSlotService::getAvailableSlots($date);

        return response()->json([
            'slots' => $slots->map(fn ($slot) => [
                'id' => $slot->id,
                'start_time' => $slot->start_time,
                'end_time' => $slot->end_time,
                'time_range' => $slot->time_range,
                'max_bookings' => $slot->max_bookings,
                'booked_count' => $slot->booked_count,
                'available_spots' => $slot->available_spots,
            ]),
            'date' => $date->toDateString(),
            'day_name' => $date->format('l'),
        ]);
    }
}
