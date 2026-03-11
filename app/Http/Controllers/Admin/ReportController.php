<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Barryvdh\DomPDF\Facade\Pdf; // Import library PDF
use Illuminate\Http\Response;

class ReportController extends Controller
{
    /**
     * Mengunduh laporan seluruh booking dalam format PDF.
     */
    public function downloadBookings()
    {
        // Ambil data booking beserta relasinya
        $bookings = Booking::with(['user', 'resource'])->latest()->get();

        // Data yang akan dikirim ke view Blade
        $data = [
            'title' => 'ResourceNexus - Booking Report',
            'date' => date('d F Y'),
            'bookings' => $bookings
        ];

        // Generate PDF menggunakan view Blade (kita akan buat view-nya di langkah 3)
        $pdf = Pdf::loadView('pdf.bookings', $data);

        // Download file dengan nama spesifik
        return $pdf->download('booking-report-' . date('Y-m-d') . '.pdf');
    }
}
