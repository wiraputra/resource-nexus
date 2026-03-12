<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Pastikan user sudah login
        // 2. Cek apakah kolom 'role' di tabel users bernilai 'admin'
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }

        // Jika bukan admin, arahkan ke dashboard dengan pesan error
        return redirect()->route('dashboard')->with('message', 'Akses Ditolak: Halaman ini khusus untuk Administrator.');
    }
}
