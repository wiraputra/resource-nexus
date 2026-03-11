<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ResourceController;
use App\Http\Controllers\Admin\BookingController;
// Import Model agar data bisa ditarik ke dashboard
use App\Models\Resource;
use App\Models\Booking;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Grup Route yang membutuhkan Login & Verifikasi
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard dimodifikasi agar mengirim data statistik riil
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'stats' => [
                'total_resources' => Resource::count(),
                'available_now'  => Resource::where('status', 'available')->count(),
                'active_bookings' => Booking::where('end_time', '>', now())->count(),
                'total_users'     => User::count(),
            ],
            'recent_bookings' => Booking::with(['user', 'resource'])->latest()->take(5)->get(),
            'categories' => Category::withCount('resources')->get(),
        ]);
    })->name('dashboard');

    // Route untuk Management Resource (Sisi Admin)
    Route::get('/admin/resources', [ResourceController::class, 'index'])->name('admin.resources');
    Route::get('/admin/resources/create', [ResourceController::class, 'create'])->name('admin.resources.create');
    Route::post('/admin/resources', [ResourceController::class, 'store'])->name('admin.resources.store');
    Route::delete('/admin/resources/{resource}', [ResourceController::class, 'destroy'])->name('admin.resources.destroy');
    Route::get('/admin/resources/{resource}/edit', [ResourceController::class, 'edit'])->name('admin.resources.edit');
    Route::patch('/admin/resources/{resource}', [ResourceController::class, 'update'])->name('admin.resources.update');

    // Route untuk Management Booking
    Route::get('/admin/bookings', [BookingController::class, 'index'])->name('admin.bookings.index');
    Route::post('/admin/bookings', [BookingController::class, 'store'])->name('admin.bookings.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
