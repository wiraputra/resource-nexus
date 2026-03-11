<!DOCTYPE html>
<html>
<head>
    <title>Booking Report</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
        .header h1 { margin: 0; color: #1e3a8a; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #f8fafc; color: #475569; padding: 10px; border: 1px solid #e2e8f0; text-align: left; }
        td { padding: 10px; border: 1px solid #e2e8f0; }
        .status { font-weight: bold; text-transform: uppercase; font-size: 10px; }
        .footer { margin-top: 30px; text-align: right; font-size: 10px; color: #94a3b8; }
    </style>
</head>
<body>
    <div class="header">
        <h1>ResourceNexus Report</h1>
        <p>Laporan Peminjaman Aset - Tanggal Cetak: {{ $date }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Aset / Resource</th>
                <th>Peminjam (User)</th>
                <th>Waktu Mulai</th>
                <th>Waktu Selesai</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($bookings as $key => $booking)
            <tr>
                <td>{{ $key + 1 }}</td>
                <td><strong>{{ $booking->resource->name }}</strong></td>
                <td>{{ $booking->user->name }}</td>
                <td>{{ \Carbon\Carbon::parse($booking->start_time)->format('d/m/Y H:i') }}</td>
                <td>{{ \Carbon\Carbon::parse($booking->end_time)->format('d/m/Y H:i') }}</td>
                <td class="status">{{ $booking->status }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Dokumen ini dibuat secara otomatis oleh sistem ResourceNexus pada {{ date('H:i:s') }}
    </div>
</body>
</html>
