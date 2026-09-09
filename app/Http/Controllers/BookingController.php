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
                $slot = TimeSlot::where('id', $validated['time_slot_id'])
                    ->lockForUpdate()
                    ->firstOrFail();

                if (! $slot->is_available) {
                    throw new \RuntimeException('This time slot is no longer available. Please select another time.');
                }

                $totalVisitors = (int) $validated['learner_count'] + (int) $validated['accompanying_persons'];

                $booking = Booking::create([
                    'time_slot_id' => $slot->id,
                    'institution_name' => $validated['institution_name'],
                    'institution_category' => $validated['institution_category'],
                    'contact_person' => $validated['contact_person'],
                    'contact_email' => $validated['contact_email'],
                    'contact_phone' => $validated['contact_phone'],
                    'reason_for_visit' => $validated['reason_for_visit'],
                    'visitor_count' => $totalVisitors,
                    'learner_count' => $validated['learner_count'],
                    'accompanying_persons' => $validated['accompanying_persons'],
                    'has_disability' => (bool) $validated['has_disability'],
                    'disability_nature' => $validated['has_disability'] ? $validated['disability_nature'] : null,
                    'county' => $validated['county'],
                    'constituency' => $validated['constituency'],
                    'consent_accepted' => true,
                    'consent_accepted_at' => now(),
                    'status' => 'confirmed',
                ]);

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
                'institution_category' => $booking->institution_category,
                'contact_person' => $booking->contact_person,
                'contact_email' => $booking->contact_email,
                'contact_phone' => $booking->contact_phone,
                'reason_for_visit' => $booking->reason_for_visit,
                'visitor_count' => $booking->visitor_count,
                'learner_count' => $booking->learner_count,
                'accompanying_persons' => $booking->accompanying_persons,
                'has_disability' => $booking->has_disability,
                'disability_nature' => $booking->disability_nature,
                'county' => $booking->county,
                'constituency' => $booking->constituency,
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
