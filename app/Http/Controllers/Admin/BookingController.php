<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse; // Tambahkan ini
use Inertia\Inertia;
use Inertia\Response; // Tambahkan ini

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
        // Logika: (Mulai_A < Selesai_B) DAN (Selesai_A > Mulai_B)
        $isConflict = Booking::where('resource_id', $resourceId)
            ->where(function ($query) use ($start, $end) {
                $query->where('start_time', '<', $end)
                      ->where('end_time', '>', $start);
            })
            ->whereIn('status', ['approved', 'pending']) // Cek hanya yang statusnya aktif
            ->exists();

        // 3. Jika bentrok, kembalikan dengan pesan error di field start_time
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
