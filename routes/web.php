<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\TimeSlotController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', function () {
    return redirect()->route('admin.login');
});

// ─── Public Website Routes ────────────────────────────────────────

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/schedule', function () {
    return Inertia::render('Schedule');
})->name('schedule');

Route::get('/book', function () {
    return Inertia::render('BookingForm');
})->name('book');

Route::get('/faq', function () {
    return Inertia::render('FAQ');
})->name('faq');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

Route::get('/api/time-slots', [TimeSlotController::class, 'index'])
    ->name('time-slots.index');

Route::post('/bookings', [BookingController::class, 'store'])
    ->name('bookings.store');

Route::get('/bookings/{code}', [BookingController::class, 'show'])
    ->name('booking.confirmation');

// ─── Admin Routes (Hidden — no public links) ─────────────────────

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/login', [AdminAuthController::class, 'showLoginForm'])
            ->name('login');
        Route::post('/login', [AdminAuthController::class, 'login']);
    });

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout'])
            ->name('logout');

        Route::get('/', [DashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/bookings', [AdminBookingController::class, 'index'])
            ->name('bookings.index');
        Route::get('/bookings/export', [AdminBookingController::class, 'export'])
            ->name('bookings.export');
        Route::get('/bookings/{booking}', [AdminBookingController::class, 'show'])
            ->name('bookings.show');
        Route::put('/bookings/{booking}', [AdminBookingController::class, 'update'])
            ->name('bookings.update');
        Route::delete('/bookings/{booking}', [AdminBookingController::class, 'destroy'])
            ->name('bookings.destroy');
    });
});