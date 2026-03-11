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
     * Menghapus resource dari database.
     */
    public function destroy(Resource $resource): RedirectResponse
    {
        // Menghapus data dari database
        $resource->delete();

        // Redirect kembali dengan pesan sukses
        return redirect()->route('admin.resources')
            ->with('message', 'Resource successfully deleted!');
    }
}
