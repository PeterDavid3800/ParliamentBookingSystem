<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Parliament Admin',
            'email' => 'admin@parliament.go.ke',
            'password' => bcrypt('parliament2026'),
            'is_admin' => true,
        ]);
    }
}
