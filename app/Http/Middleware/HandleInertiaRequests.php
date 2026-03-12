<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
{
    return [
        ...parent::share($request),

        // Data Autentikasi
        'auth' => [
            'user' => $request->user() ? [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'last_name' => $request->user()->last_name, // Tambahkan ini agar bisa dipanggil di Profile/Dashboard
                'email' => $request->user()->email,
                'role' => $request->user()->role, // SANGAT PENTING untuk proteksi Menu di React
                'avatar' => $request->user()->avatar,
            ] : null,
        ],

        // Data Notifikasi (Flash Message)
        'flash' => [
            'message' => fn () => $request->session()->get('message'),
            'error'   => fn () => $request->session()->get('error'), // Tambahkan catch error juga
        ],

        // Ziggy (Opsional: Memastikan fungsi route() selalu sinkron di JS)
        'ziggy' => fn () => [
            ...(new \Tighten\Ziggy\Ziggy)->toArray(),
            'location' => $request->url(),
        ],
    ];
}
}
