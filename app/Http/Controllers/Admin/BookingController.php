<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth; // Tambahkan ini untuk memperbaiki error 'id'
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Menampilkan daftar semua riwayat peminjaman (Untuk Admin).
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => Booking::with(['user', 'resource.category'])
                ->latest()
                ->get()
        ]);
    }

    /**
     * Menampilkan halaman kalender peminjaman secara visual.
     */
    public function calendar(): Response
    {
        $events = Booking::with(['resource', 'user'])
            // Hanya tampilkan yang disetujui atau masih menunggu
            ->whereIn('status', ['approved', 'pending'])
            ->get()
            ->map(function ($booking) {
                return [
                    'id'    => $booking->id,
                    'title' => ($booking->resource->name ?? 'Deleted') . ' (' . ($booking->user->name ?? 'User') . ')',
                    'start' => $booking->start_time,
                    'end'   => $booking->end_time,
                    // Warna: Biru untuk Approved, Amber untuk Pending
                    'color' => $booking->status === 'approved' ? '#3b82f6' : '#f59e0b',
                ];
            });

        return Inertia::render('Admin/Bookings/Calendar', [
            'events' => $events
        ]);
    }

    /**
     * Memproses permintaan booking baru dengan status awal 'pending'.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'resource_id' => 'required|exists:resources,id',
            'start_time'  => 'required|date|after:now',
            'end_time'    => 'required|date|after:start_time',
        ]);

        $resourceId = $request->resource_id;
        $start = $request->start_time;
        $end = $request->end_time;

        // Cek Overlap (Termasuk mengecek yang masih berstatus pending)
        $isConflict = Booking::where('resource_id', $resourceId)
            ->where(function ($query) use ($start, $end) {
                $query->where('start_time', '<', $end)
                      ->where('end_time', '>', $start);
            })
            ->whereIn('status', ['approved', 'pending'])
            ->exists();

        if ($isConflict) {
            return back()->withErrors([
                'start_time' => 'Maaf, aset ini sudah dipesan atau sedang dalam peninjauan pada jam tersebut.'
            ]);
        }

        // Simpan dengan status PENDING
        Booking::create([
            'user_id'     => Auth::id(), // Sekarang aman karena facade Auth sudah diimport
            'resource_id' => $resourceId,
            'start_time'  => $start,
            'end_time'    => $end,
            'status'      => 'pending',
        ]);

        return redirect()->route('admin.resources')
            ->with('message', 'Booking request sent! Waiting for Admin approval.');
    }

    /**
     * Mengubah status booking (Approve atau Reject).
     * Hanya bisa diakses oleh Admin.
     */
    public function updateStatus(Request $request, Booking $booking): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $booking->update([
            'status' => $validated['status']
        ]);

        $msg = $validated['status'] === 'approved' ? 'Booking Approved!' : 'Booking Rejected.';

        return back()->with('message', $msg);
    }
}
