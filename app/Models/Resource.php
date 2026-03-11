<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Tambahkan import ini
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Resource extends Model
{
    // Gunakan trait SoftDeletes di sini
    use SoftDeletes;

    protected $fillable = ['category_id', 'name', 'description', 'status', 'image'];

    /**
     * Relasi ke Category: Satu resource milik satu kategori.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
