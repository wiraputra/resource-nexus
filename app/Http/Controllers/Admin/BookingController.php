<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Menampilkan daftar semua riwayat peminjaman.
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
        // Ambil data booking dan ubah formatnya untuk FullCalendar
        $events = Booking::with(['resource', 'user'])
            ->whereIn('status', ['approved', 'pending'])
            ->get()
            ->map(function ($booking) {
                return [
                    'id'    => $booking->id,
                    'title' => ($booking->resource->name ?? 'Deleted') . ' (' . ($booking->user->name ?? 'User') . ')',
                    'start' => $booking->start_time,
                    'end'   => $booking->end_time,
                    // Penentuan warna berdasarkan status
                    'color' => $booking->status === 'approved' ? '#3b82f6' : '#f59e0b',
                ];
            });

        return Inertia::render('Admin/Bookings/Calendar', [
            'events' => $events
        ]);
    }

    /**
     * Memproses permintaan booking baru dan mengecek bentrok jadwal.
     */
    public function store(Request $request): RedirectResponse
    {
        // 1. Validasi Input Dasar
        $request->validate([
            'resource_id' => 'required|exists:resources,id',
            'start_time'  => 'required|date|after:now',
            'end_time'    => 'required|date|after:start_time',
        ]);

        $resourceId = $request->resource_id;
        $start = $request->start_time;
        $end = $request->end_time;

        // 2. LOGIKA INTI: Cek Overlap (Jadwal Bentrok)
        $isConflict = Booking::where('resource_id', $resourceId)
            ->where(function ($query) use ($start, $end) {
                $query->where('start_time', '<', $end)
                      ->where('end_time', '>', $start);
            })
            ->whereIn('status', ['approved', 'pending'])
            ->exists();

        // 3. Jika bentrok, kembalikan dengan pesan error
        if ($isConflict) {
            return back()->withErrors([
                'start_time' => 'Maaf, aset ini sudah dipesan orang lain pada rentang waktu tersebut.'
            ]);
        }

        // 4. Jika aman, simpan data booking
        Booking::create([
            'user_id'     => auth()->id(),
            'resource_id' => $resourceId,
            'start_time'  => $start,
            'end_time'    => $end,
            'status'      => 'approved',
        ]);

        // 5. Kembali ke halaman resources dengan notifikasi sukses
        return redirect()->route('admin.resources')
            ->with('message', 'Booking berhasil dibuat! Jadwal Anda telah tercatat.');
    }
}
