<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Resource extends Model
{
    protected $fillable = ['category_id', 'name', 'description', 'status', 'image'];

    /**
     * Relasi ke Category: Satu resource milik satu kategori.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
