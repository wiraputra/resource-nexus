<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            // Menghubungkan ke user yang meminjam
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            // Menghubungkan ke barang yang dipinjam
            $table->foreignId('resource_id')->constrained()->cascadeOnDelete();

            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('status')->default('approved'); // pending, approved, rejected
            $table->text('purpose')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
