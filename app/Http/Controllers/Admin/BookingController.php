<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::with('timeSlot')
            ->when($request->search, fn ($q, $s) => $q->search($s))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->date_from, fn ($q, $d) => $q->whereHas('timeSlot', fn ($q) => $q->where('date', '>=', $d)))
            ->when($request->date_to, fn ($q, $d) => $q->whereHas('timeSlot', fn ($q) => $q->where('date', '<=', $d)))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => $bookings->through(fn ($b) => [
                'id' => $b->id,
                'confirmation_code' => $b->confirmation_code,
                'institution_name' => $b->institution_name,
                'contact_person' => $b->contact_person,
                'contact_email' => $b->contact_email,
                'contact_phone' => $b->contact_phone,
                'visitor_count' => $b->visitor_count,
                'status' => $b->status,
                'date' => $b->timeSlot->date->toDateString(),
                'time_range' => $b->timeSlot->time_range,
                'created_at' => $b->created_at->toDateTimeString(),
            ]),
            'filters' => $request->only(['search', 'status', 'date_from', 'date_to']),
        ]);
    }

    public function show(Booking $booking)
    {
        $booking->load(['timeSlot', 'documents']);

        return Inertia::render('Admin/Bookings/Show', [
            'booking' => [
                'id' => $booking->id,
                'confirmation_code' => $booking->confirmation_code,
                'institution_name' => $booking->institution_name,
                'contact_person' => $booking->contact_person,
                'contact_email' => $booking->contact_email,
                'contact_phone' => $booking->contact_phone,
                'reason_for_visit' => $booking->reason_for_visit,
                'visitor_count' => $booking->visitor_count,
                'status' => $booking->status,
                'date' => $booking->timeSlot->date->toDateString(),
                'start_time' => $booking->timeSlot->start_time,
                'end_time' => $booking->timeSlot->end_time,
                'time_range' => $booking->timeSlot->time_range,
                'documents' => $booking->documents->map(fn ($d) => [
                    'id' => $d->id,
                    'original_name' => $d->original_name,
                    'mime_type' => $d->mime_type,
                    'size' => $d->size,
                    'url' => asset('storage/' . $d->file_path),
                ]),
                'created_at' => $booking->created_at->toDateTimeString(),
            ],
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'institution_name' => ['required', 'string', 'max:255'],
            'contact_person' => ['required', 'string', 'max:255'],
            'contact_email' => ['required', 'email', 'max:255'],
            'contact_phone' => ['required', 'string', 'max:50'],
            'reason_for_visit' => ['required', 'string', 'max:2000'],
            'visitor_count' => ['required', 'integer', 'min:1', 'max:50'],
            'status' => ['required', 'in:confirmed,cancelled'],
        ]);

        $booking->update($validated);

        return redirect()->route('admin.bookings.show', $booking->id)
            ->with('success', 'Booking updated successfully.');
    }

    public function destroy(Booking $booking)
    {
        $booking->update(['status' => 'cancelled']);

        return redirect()->route('admin.bookings.index')
            ->with('success', 'Booking cancelled successfully.');
    }

    public function export(Request $request): StreamedResponse
    {
        $bookings = Booking::with('timeSlot')
            ->when($request->date_from, fn ($q, $d) => $q->whereHas('timeSlot', fn ($q) => $q->where('date', '>=', $d)))
            ->when($request->date_to, fn ($q, $d) => $q->whereHas('timeSlot', fn ($q) => $q->where('date', '<=', $d)))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="bookings-export-' . now()->toDateString() . '.csv"',
        ];

        return response()->stream(function () use ($bookings) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, [
                'Code', 'Institution', 'Contact Person', 'Email', 'Phone',
                'Date', 'Time Slot', 'Visitors', 'Reason', 'Status', 'Created',
            ]);

            foreach ($bookings as $b) {
                fputcsv($handle, [
                    $b->confirmation_code,
                    $b->institution_name,
                    $b->contact_person,
                    $b->contact_email,
                    $b->contact_phone,
                    $b->timeSlot->date->toDateString(),
                    $b->timeSlot->time_range,
                    $b->visitor_count,
                    $b->reason_for_visit,
                    $b->status,
                    $b->created_at->toDateTimeString(),
                ]);
            }

            fclose($handle);
        }, 200, $headers);
    }
}
