<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('time_slots', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');
            $table->unsignedTinyInteger('max_bookings')->default(4);
            $table->timestamps();

            $table->unique(['date', 'start_time', 'end_time']);
            $table->index('date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('time_slots');
    }
};
