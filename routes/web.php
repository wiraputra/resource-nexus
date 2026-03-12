<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ResourceController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\ReportController;
use App\Models\Resource;
use App\Models\Booking;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// ============================================================
// KELOMPOK 1: SEMUA PENGGUNA (ADMIN & STAFF)
// ============================================================
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard Utama
    Route::get('/dashboard', function () {
        $categoryChart = Category::withCount('resources')->get()->map(fn($cat) => [
            'name' => $cat->name,
            'total' => $cat->resources_count
        ]);

        $trendChart = Booking::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')->orderBy('date')->get()
            ->map(fn($item) => [
                'day' => date('D', strtotime($item->date)),
                'bookings' => $item->count
            ]);

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_resources' => Resource::count(),
                'available_now'  => Resource::where('status', 'available')->count(),
                'active_bookings' => Booking::where('end_time', '>', now())->count(),
                'total_users'     => User::count(),
            ],
            'recent_bookings' => Booking::with(['user', 'resource'])->latest()->take(5)->get(),
            'categories' => Category::withCount('resources')->get(),
            'category_chart' => $categoryChart,
            'trend_chart' => $trendChart,
        ]);
    })->name('dashboard');

    // API Cuaca
    Route::get('/api/weather', function (Request $request) {
        $apiKey = env('OPENWEATHER_API_KEY');
        return Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'lat' => $request->lat, 'lon' => $request->lon,
            'appid' => $apiKey, 'units' => 'metric', 'lang' => 'id'
        ])->json();
    });

    // Fitur yang boleh dilakukan Staff
    Route::get('/admin/resources', [ResourceController::class, 'index'])->name('admin.resources');
    Route::get('/admin/calendar', [BookingController::class, 'calendar'])->name('admin.calendar');
    Route::post('/admin/bookings', [BookingController::class, 'store'])->name('admin.bookings.store');
});

// ============================================================
// KELOMPOK 2: KHUSUS ADMINISTRATOR (Punya Middleware 'admin')
// ============================================================
Route::middleware(['auth', 'admin'])->group(function () {

    // Management Resource (CRUD)
    Route::get('/admin/resources/create', [ResourceController::class, 'create'])->name('admin.resources.create');
    Route::post('/admin/resources', [ResourceController::class, 'store'])->name('admin.resources.store');
    Route::get('/admin/resources/{resource}/edit', [ResourceController::class, 'edit'])->name('admin.resources.edit');
    Route::patch('/admin/resources/{resource}', [ResourceController::class, 'update'])->name('admin.resources.update');
    Route::delete('/admin/resources/{resource}', [ResourceController::class, 'destroy'])->name('admin.resources.destroy');

    // Soft Deletes
    Route::get('/admin/resources/trashed', [ResourceController::class, 'trashed'])->name('admin.resources.trashed');
    Route::patch('/admin/resources/{id}/restore', [ResourceController::class, 'restore'])->name('admin.resources.restore');
    Route::delete('/admin/resources/{id}/force-delete', [ResourceController::class, 'forceDelete'])->name('admin.resources.force-delete');

    // Approval Workflow (Menyetujui/Menolak Booking)
    Route::get('/admin/bookings', [BookingController::class, 'index'])->name('admin.bookings.index');
    Route::patch('/admin/bookings/{booking}/status', [BookingController::class, 'updateStatus'])->name('admin.bookings.status');

    // PDF Reporting
    Route::get('/admin/reports/bookings/pdf', [ReportController::class, 'downloadBookings'])->name('admin.reports.bookings.pdf');
});

// Profile Management
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
