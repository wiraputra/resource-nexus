import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ stats, recent_bookings, categories }: any) {
    const { auth }: any = usePage().props;
    const [weather, setWeather] = useState<any>(null);
    const [loadingWeather, setLoadingWeather] = useState(true);

    // Fungsi untuk mendapatkan salam berdasarkan waktu
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    setWeather(data);
                } catch (error) {
                    console.error("Weather error:", error);
                } finally {
                    setLoadingWeather(false);
                }
            }, () => setLoadingWeather(false));
        } else {
            setLoadingWeather(false);
        }
    }, []);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-black tracking-tight uppercase opacity-50">Admin Console</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-10">

                    {/* HEADER SECTION */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                                {getGreeting()}, {auth.user.name.split(' ')[0]}!
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                                Your resource network is performing optimally today.
                            </p>
                        </div>

                        {/* WEATHER WIDGET */}
                        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl border border-white dark:border-slate-800 p-5 rounded-[2.5rem] flex items-center gap-6 shadow-2xl shadow-blue-500/5 min-w-[300px]">
                            {loadingWeather ? (
                                <div className="flex items-center gap-3 px-4 py-2 w-full justify-center">
                                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Updating Environment...</span>
                                </div>
                            ) : weather?.main ? (
                                <>
                                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-2xl shadow-lg">
                                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} className="h-12 w-12 filter brightness-110" alt="weather" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">
                                            {Math.round(weather.main.temp)}°C
                                        </p>
                                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mt-1 truncate max-w-[150px]">
                                            {weather.name} • {weather.weather[0].description}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <span className="text-[10px] font-black text-slate-400 uppercase p-4">Location Services Disabled</span>
                            )}
                        </div>
                    </div>

                    {/* STAT CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Inventory" value={stats.total_resources} color="blue" icon="📦" />
                        <StatCard title="Ready to Use" value={stats.available_now} color="emerald" icon="⚡" />
                        <StatCard title="In Use" value={stats.active_bookings} color="amber" icon="🔥" />
                        <StatCard title="Platform Users" value={stats.total_users} color="purple" icon="💎" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* RECENT ACTIVITY */}
                        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">Recent Operations</h3>
                                <Link href={route('admin.bookings.index')} className="text-xs font-black text-blue-600 uppercase tracking-widest hover:text-blue-400 transition-colors">
                                    History Log →
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {recent_bookings.length > 0 ? recent_bookings.map((booking: any) => (
                                    <div key={booking.id} className="group flex items-center justify-between p-5 rounded-3xl bg-slate-50 dark:bg-slate-950/50 border border-transparent hover:border-blue-500/30 transition-all duration-300">
                                        <div className="flex items-center gap-5">
                                            <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-xl font-black text-blue-600 group-hover:scale-110 transition-transform">
                                                {booking.resource.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 dark:text-white">{booking.resource.name}</p>
                                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                                                    Reserved by <span className="text-blue-500">{booking.user.name}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                                            <p className="text-xs font-black dark:text-slate-200">
                                                {new Date(booking.end_time).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-center py-10 text-slate-400 font-bold text-sm italic">No recent bookings recorded.</p>
                                )}
                            </div>
                        </div>

                        {/* INVENTORY MIX */}
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8">Stock Distribution</h3>
                            <div className="space-y-8">
                                {categories.map((cat: any) => (
                                    <div key={cat.id} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{cat.name}</span>
                                            <span className="text-sm font-black text-slate-900 dark:text-white">{cat.resources_count}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                style={{ width: `${stats.total_resources > 0 ? (cat.resources_count / stats.total_resources) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12">
                                <Link
                                    href={route('admin.resources.create')}
                                    className="w-full block text-center bg-slate-950 dark:bg-blue-600 text-white py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 hover:opacity-90 active:scale-95 transition-all"
                                >
                                    Add New Resource
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, value, color, icon }: any) {
    const themes: any = {
        blue: "from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200/50 dark:border-blue-500/20 text-blue-600",
        emerald: "from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 border-emerald-200/50 dark:border-emerald-500/20 text-emerald-600",
        amber: "from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 border-amber-200/50 dark:border-amber-500/20 text-amber-600",
        purple: "from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border-purple-200/50 dark:border-purple-500/20 text-purple-600",
    };

    return (
        <div className={`p-8 rounded-[2.5rem] border bg-gradient-to-br shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300 ${themes[color]}`}>
            <div className="flex justify-between items-start">
                <div className="h-12 w-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                    {icon}
                </div>
                <span className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{value}</span>
            </div>
            <p className="mt-6 font-black text-[10px] uppercase tracking-[0.2em] opacity-60 leading-none">{title}</p>
        </div>
    );
}
