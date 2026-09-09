<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('institution_category')->nullable()->after('institution_name');
            $table->unsignedTinyInteger('learner_count')->nullable()->after('reason_for_visit');
            $table->unsignedTinyInteger('accompanying_persons')->default(0)->after('learner_count');
            $table->boolean('has_disability')->default(false)->after('accompanying_persons');
            $table->string('disability_nature')->nullable()->after('has_disability');
            $table->string('county')->nullable()->after('disability_nature');
            $table->string('constituency')->nullable()->after('county');
            $table->boolean('consent_accepted')->default(false)->after('constituency');
            $table->timestamp('consent_accepted_at')->nullable()->after('consent_accepted');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'institution_category',
                'learner_count',
                'accompanying_persons',
                'has_disability',
                'disability_nature',
                'county',
                'constituency',
                'consent_accepted',
                'consent_accepted_at',
            ]);
        });
    }
};
