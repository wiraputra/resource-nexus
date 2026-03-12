<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migrasi untuk membuat tabel users dan pendukungnya.
     */
    public function up(): void
    {
        // 1. TABEL USERS (Disesuaikan dengan fitur Profile & Role)
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // Autentikasi Dasar
            $table->string('name'); // Akan berfungsi sebagai First Name
            $table->string('last_name')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            // Sistem Role (Admin / Staff)
            $table->string('role')->default('staff');

            // Informasi Profil (Sesuai Desain UI)
            $table->string('avatar')->nullable();
            $table->string('phone')->nullable();
            $table->string('location')->nullable();
            $table->text('summary')->nullable();

            $table->rememberToken();
            $table->timestamps();
        });

        // 2. TABEL TOKEN PASSWORD (Bawaan Laravel)
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // 3. TABEL SESI (Bawaan Laravel)
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Balikkan migrasi.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
