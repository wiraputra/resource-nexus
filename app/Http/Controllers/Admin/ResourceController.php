<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ResourceController extends Controller
{
    /**
     * Menampilkan daftar resource aktif (yang belum dihapus).
     */
    public function index(Request $request): Response
    {
        $resources = Resource::with('category')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                      ->orWhere('description', 'like', '%' . $search . '%');
            })
            ->latest()
            ->get();

        return Inertia::render('Admin/Resources/Index', [
            'resources' => $resources,
            'filters'   => $request->only(['search'])
        ]);
    }

    /**
     * Menampilkan daftar resource yang ada di tempat sampah (Soft Deleted).
     */
    public function trashed(): Response
    {
        // onlyTrashed() hanya mengambil data yang sudah di-soft delete
        $resources = Resource::onlyTrashed()->with('category')->latest()->get();

        return Inertia::render('Admin/Resources/Trashed', [
            'resources' => $resources
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
     * Menyimpan data resource baru.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:available,maintenance,busy',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

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
     * Memproses perubahan data.
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
     * Menghapus sementara (Soft Delete).
     * Gambar TIDAK dihapus agar bisa dipulihkan nanti.
     */
    public function destroy(Resource $resource): RedirectResponse
    {
        $resource->delete();

        return redirect()->route('admin.resources')
            ->with('message', 'Resource moved to Trash Bin.');
    }

    /**
     * Memulihkan data yang sudah dihapus.
     */
    public function restore($id): RedirectResponse
    {
        // Cari data termasuk yang sudah di-trash
        $resource = Resource::withTrashed()->findOrFail($id);
        $resource->restore();

        return redirect()->route('admin.resources.trashed')
            ->with('message', 'Resource successfully restored!');
    }

    /**
     * Menghapus secara permanen dari Database.
     * Gambar akan dihapus selamanya dari storage.
     */
    public function forceDelete($id): RedirectResponse
    {
        $resource = Resource::withTrashed()->findOrFail($id);

        // Hapus file fisik gambar karena data akan dibuang selamanya
        if ($resource->image) {
            Storage::disk('public')->delete($resource->image);
        }

        $resource->forceDelete();

        return redirect()->route('admin.resources.trashed')
            ->with('message', 'Resource permanently deleted!');
    }
}
