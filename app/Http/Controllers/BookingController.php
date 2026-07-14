<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Mail\BookingConfirmation;
use App\Mail\BookingNotification;
use App\Models\Booking;
use App\Models\TimeSlot;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function store(StoreBookingRequest $request)
    {
        $validated = $request->validated();

        try {
            $result = DB::transaction(function () use ($request, $validated) {
                // Lock the time slot row to prevent race conditions
                $slot = TimeSlot::where('id', $validated['time_slot_id'])
                    ->lockForUpdate()
                    ->firstOrFail();

                if (! $slot->is_available) {
                    throw new \RuntimeException('This time slot is no longer available. It has been fully booked.');
                }

                $booking = Booking::create([
                    'time_slot_id' => $slot->id,
                    'institution_name' => $validated['institution_name'],
                    'contact_person' => $validated['contact_person'],
                    'contact_email' => $validated['contact_email'],
                    'contact_phone' => $validated['contact_phone'],
                    'reason_for_visit' => $validated['reason_for_visit'],
                    'visitor_count' => $validated['visitor_count'],
                    'status' => 'confirmed',
                ]);

                // Handle document uploads
                if ($request->hasFile('documents')) {
                    foreach ($request->file('documents') as $file) {
                        $path = $file->store('documents', 'public');

                        $booking->documents()->create([
                            'file_path' => $path,
                            'original_name' => $file->getClientOriginalName(),
                            'mime_type' => $file->getMimeType(),
                            'size' => $file->getSize(),
                        ]);
                    }
                }

                return $booking;
            });
        } catch (\RuntimeException $e) {
            return back()->withErrors([
                'time_slot_id' => $e->getMessage(),
            ]);
        }

        // Send emails (outside transaction — if emails fail, booking still succeeds)
        try {
            Mail::to($result->contact_email)->send(new BookingConfirmation($result));
            Mail::to(config('app.parliament_admin_email', env('PARLIAMENT_ADMIN_EMAIL', 'visits@parliament.go.ke')))
                ->send(new BookingNotification($result));
        } catch (\Exception $e) {
            report($e);
        }

        return redirect()->route('booking.confirmation', ['code' => $result->confirmation_code]);
    }

    public function show(string $code)
    {
        $booking = Booking::with(['timeSlot', 'documents'])
            ->where('confirmation_code', $code)
            ->firstOrFail();

        return Inertia::render('BookingConfirmation', [
            'booking' => [
                'confirmation_code' => $booking->confirmation_code,
                'institution_name' => $booking->institution_name,
                'contact_person' => $booking->contact_person,
                'contact_email' => $booking->contact_email,
                'contact_phone' => $booking->contact_phone,
                'reason_for_visit' => $booking->reason_for_visit,
                'visitor_count' => $booking->visitor_count,
                'status' => $booking->status,
                'date' => $booking->timeSlot->date->toDateString(),
                'time_range' => $booking->timeSlot->time_range,
                'documents' => $booking->documents->map(fn ($d) => [
                    'original_name' => $d->original_name,
                ]),
            ],
        ]);
    }
}
