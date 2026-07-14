<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('time_slot_id')->constrained('time_slots')->cascadeOnDelete();
            $table->string('institution_name');
            $table->string('contact_person');
            $table->string('contact_email');
            $table->string('contact_phone');
            $table->text('reason_for_visit');
            $table->unsignedTinyInteger('visitor_count');
            $table->string('status')->default('confirmed'); // confirmed, cancelled
            $table->string('confirmation_code')->unique();
            $table->timestamps();

            $table->index('confirmation_code');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
