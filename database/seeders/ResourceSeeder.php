<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Resource;
use Illuminate\Support\Str;

class ResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Buat Kategori
        $ruangan = Category::create(['name' => 'Ruang Rapat', 'slug' => 'ruang-rapat']);
        $kendaraan = Category::create(['name' => 'Kendaraan Dinas', 'slug' => 'kendaraan-dinas']);
        $alat = Category::create(['name' => 'Peralatan Elektronik', 'slug' => 'peralatan-elektronik']);

        // 2. Buat Resource Contoh
        Resource::create([
            'category_id' => $ruangan->id,
            'name' => 'Ruang Meeting Utama',
            'description' => 'Kapasitas 20 orang, projector ready.',
            'status' => 'available'
        ]);

        Resource::create([
            'category_id' => $kendaraan->id,
            'name' => 'Toyota Avanza (B 1234 ABC)',
            'description' => 'Mobil operasional kantor.',
            'status' => 'available'
        ]);

        Resource::create([
            'category_id' => $alat->id,
            'name' => 'Macbook Pro M3',
            'description' => 'Untuk keperluan editing video.',
            'status' => 'maintenance'
        ]);
    }
}