import React, { useState, useEffect } from 'react'; // Tambahkan useState & useEffect
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recent_bookings, categories }: any) {
    // State untuk mengelola data cuaca
    const [weather, setWeather] = useState<any>(null);
    const [loadingWeather, setLoadingWeather] = useState(true);

    useEffect(() => {
        // Ambil lokasi pengguna via browser
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Panggil route API proxy yang sudah kita buat di web.php
                    const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    setWeather(data);
                } catch (error) {
                    console.error("Gagal mengambil data cuaca", error);
                } finally {
                    setLoadingWeather(false);
                }
            }, () => {
                setLoadingWeather(false); // Handle jika user menolak izin lokasi
            });
        } else {
            setLoadingWeather(false);
        }
    }, []);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-slate-800 dark:text-slate-100">Executive Overview</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

                    {/* HEADER SECTION DENGAN WIDGET CUACA */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Welcome Back!</h1>
                            <p className="text-slate-500">System is running smoothly. Here is your daily summary.</p>
                        </div>

                        {/* WIDGET CUACA MODERN */}
                        <div className="bg-white/40 dark:bg-blue-900/10 backdrop-blur-xl border border-white/20 dark:border-blue-900/30 p-4 rounded-[2.5rem] flex items-center gap-5 shadow-2xl shadow-blue-500/10 min-w-[280px] transition-all hover:scale-[1.02]">
                            {loadingWeather ? (
                                <div className="flex items-center gap-3 px-4 py-2">
                                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-ping"></div>
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Detecting Location...</span>
                                </div>
                            ) : weather?.main ? (
                                <>
                                    <div className="bg-blue-500/10 dark:bg-blue-500/20 p-2 rounded-2xl shadow-inner">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                            className="h-12 w-12 drop-shadow-lg"
                                            alt="weather"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">
                                            {Math.round(weather.main.temp)}°C
                                        </p>
                                        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest leading-none truncate max-w-[150px]">
                                            {weather.name}, {weather.weather[0].description}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Weather unavailable
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 1. Stat Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Assets" value={stats.total_resources} color="blue" icon="📦" />
                        <StatCard title="Available Now" value={stats.available_now} color="emerald" icon="✅" />
                        <StatCard title="Active Bookings" value={stats.active_bookings} color="amber" icon="🕒" />
                        <StatCard title="Total Members" value={stats.total_users} color="purple" icon="👥" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* 2. Recent Activity (2/3 width) */}
                        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Bookings</h3>
                                <Link href={route('admin.bookings.index')} className="text-blue-600 text-sm font-bold hover:underline">View all</Link>
                            </div>
                            <div className="space-y-4">
                                {recent_bookings.map((booking: any) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-blue-200 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-lg">
                                                {booking.resource.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{booking.resource.name}</p>
                                                <p className="text-xs text-slate-500">Reserved by <span className="text-blue-500">{booking.user.name}</span></p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">End Time</p>
                                            <p className="text-xs font-medium dark:text-slate-300">{new Date(booking.end_time).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Category Distribution (1/3 width) */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Inventory Mix</h3>
                            <div className="space-y-6">
                                {categories.map((cat: any) => (
                                    <div key={cat.id}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-medium text-slate-600 dark:text-slate-400">{cat.name}</span>
                                            <span className="font-bold text-slate-900 dark:text-white">{cat.resources_count} items</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                                                style={{ width: `${(cat.resources_count / stats.total_resources) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Action Link */}
                            <div className="mt-10">
                                <Link
                                    href={route('admin.resources.create')}
                                    className="w-full block text-center bg-slate-900 dark:bg-blue-600 text-white py-3 rounded-2xl font-bold shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    + Register New Asset
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Sub-component StatCard
function StatCard({ title, value, color, icon }: any) {
    const colors: any = {
        blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-100",
        emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100",
        amber: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-100",
        purple: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-100",
    };

    return (
        <div className={`p-6 rounded-3xl border shadow-sm transition-all hover:shadow-md ${colors[color]}`}>
            <div className="flex justify-between items-center">
                <span className="text-2xl">{icon}</span>
                <span className="text-3xl font-black">{value}</span>
            </div>
            <p className="mt-4 font-bold text-sm uppercase tracking-wider opacity-80">{title}</p>
        </div>
    );
}
