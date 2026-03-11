<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage; // Tambahkan untuk menangani file
use Inertia\Inertia;
use Inertia\Response;

class ResourceController extends Controller
{
    /**
     * Menampilkan daftar semua resource dengan fitur Pencarian.
     */
    public function index(Request $request): Response
    {
        $resources = Resource::with('category')
            // Logika Pencarian: Mencari di nama atau deskripsi
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                      ->orWhere('description', 'like', '%' . $search . '%');
            })
            ->latest()
            ->get();

        return Inertia::render('Admin/Resources/Index', [
            'resources' => $resources,
            'filters'   => $request->only(['search']) // Mengirim balik kata kunci pencarian ke frontend
        ]);
    }

    /**
     * Menampilkan halaman form tambah resource baru.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Resources/Create', [
            'categories' => Category::all()
        ]);
    }

    /**
     * Menyimpan data resource baru beserta Gambar.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:available,maintenance,busy',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Max 2MB
        ]);

        // Proses Upload Gambar
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('resources', 'public');
        }

        Resource::create($validated);

        return redirect()->route('admin.resources')
            ->with('message', 'Resource successfully created!');
    }

    /**
     * Menampilkan halaman form edit.
     */
    public function edit(Resource $resource): Response
    {
        return Inertia::render('Admin/Resources/Edit', [
            'resource' => $resource,
            'categories' => Category::all()
        ]);
    }

    /**
     * Memproses perubahan data dan update Gambar.
     */
    public function update(Request $request, Resource $resource): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:available,maintenance,busy',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Proses Update Gambar (Hapus yang lama jika ada yang baru)
        if ($request->hasFile('image')) {
            if ($resource->image) {
                Storage::disk('public')->delete($resource->image);
            }
            $validated['image'] = $request->file('image')->store('resources', 'public');
        }

        $resource->update($validated);

        return redirect()->route('admin.resources')
            ->with('message', 'Resource successfully updated!');
    }

    /**
     * Menghapus resource dan file gambarnya.
     */
    public function destroy(Resource $resource): RedirectResponse
    {
        // Hapus file dari storage sebelum hapus data di database
        if ($resource->image) {
            Storage::disk('public')->delete($resource->image);
        }

        $resource->delete();

        return redirect()->route('admin.resources')
            ->with('message', 'Resource successfully deleted!');
    }
}
