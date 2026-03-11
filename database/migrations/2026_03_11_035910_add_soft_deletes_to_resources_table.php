<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migration untuk menambah kolom deleted_at.
     */
    public function up(): void
    {
        Schema::table('resources', function (Blueprint $table) {
            // Perintah ini otomatis membuat kolom 'deleted_at' tipe timestamp yang nullable
            $table->softDeletes();
        });
    }

    /**
     * Batalkan migration (Rollback).
     */
    public function down(): void
    {
        Schema::table('resources', function (Blueprint $table) {
            // Menghapus kembali kolom 'deleted_at' jika migration dibatalkan
            $table->dropSoftDeletes();
        });
    }
};
