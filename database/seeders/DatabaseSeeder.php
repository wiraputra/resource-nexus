<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Akun ADMINISTRATOR
        User::factory()->create([
            'name' => 'Super Admin',
            'last_name' => 'Nexus',
            'email' => 'admin@nexus.com',
            'password' => Hash::make('password'), // Password: password
            'role' => 'admin',
        ]);

        // 2. Akun STAFF BIASA
        User::factory()->create([
            'name' => 'Regular Staff',
            'last_name' => 'Member',
            'email' => 'staff@nexus.com',
            'password' => Hash::make('password'), // Password: password
            'role' => 'staff',
        ]);

        // Jalankan seeder resource yang sudah kita buat sebelumnya
        $this->call([
            ResourceSeeder::class,
        ]);
    }
}
