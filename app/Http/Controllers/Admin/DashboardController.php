<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_bookings' => Booking::count(),
                'confirmed_bookings' => Booking::where('status', 'confirmed')->count(),
                'today_bookings' => Booking::confirmed()
                    ->whereHas('timeSlot', fn ($q) => $q->where('date', today()))
                    ->count(),
                'upcoming_bookings' => Booking::confirmed()
                    ->whereHas('timeSlot', fn ($q) => $q->where('date', '>=', today()))
                    ->count(),
                'recent_bookings' => Booking::with('timeSlot')
                    ->latest()
                    ->take(10)
                    ->get()
                    ->map(fn ($b) => [
                        'id' => $b->id,
                        'confirmation_code' => $b->confirmation_code,
                        'institution_name' => $b->institution_name,
                        'contact_person' => $b->contact_person,
                        'visitor_count' => $b->visitor_count,
                        'status' => $b->status,
                        'date' => $b->timeSlot->date->toDateString(),
                        'time_range' => $b->timeSlot->time_range,
                        'created_at' => $b->created_at->toDateTimeString(),
                    ]),
            ],
        ]);
    }
}
