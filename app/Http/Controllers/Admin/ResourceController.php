<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ResourceController extends Controller
{
    /**
     * Menampilkan daftar semua resource.
     */
    public function index(): Response
    {
        $resources = Resource::with('category')->latest()->get();

        return Inertia::render('Admin/Resources/Index', [
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
     * Menyimpan data resource baru ke database.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:available,maintenance,busy',
        ]);

        Resource::create($validated);

        return redirect()->route('admin.resources')
            ->with('message', 'Resource successfully created!');
    }

    /**
     * Menampilkan halaman form edit untuk resource tertentu.
     */
    public function edit(Resource $resource): Response
    {
        return Inertia::render('Admin/Resources/Edit', [
            'resource' => $resource,
            'categories' => Category::all()
        ]);
    }

    /**
     * Memproses perubahan data resource di database.
     */
    public function update(Request $request, Resource $resource): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:available,maintenance,busy',
        ]);

        $resource->update($validated);

        return redirect()->route('admin.resources')
            ->with('message', 'Resource successfully updated!');
    }

    /**
     * Menghapus resource dari database.
     */
    public function destroy(Resource $resource): RedirectResponse
    {
        $resource->delete();

        return redirect()->route('admin.resources')
            ->with('message', 'Resource successfully deleted!');
    }
}
