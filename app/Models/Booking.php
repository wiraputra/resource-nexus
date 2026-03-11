<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    // Penting: Daftarkan kolom yang boleh diisi secara massal
    protected $fillable = [
        'user_id',
        'resource_id',
        'start_time',
        'end_time',
        'status',
        'purpose'
    ];

    /**
     * Relasi: Booking ini milik siapa (User)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi: Resource apa yang dipinjam
     */
    public function resource(): BelongsTo
    {
        return $this->belongsTo(Resource::class);
    }
}
