import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
// Import Recharts untuk visualisasi data
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area
} from 'recharts';

export default function Dashboard({ stats, recent_bookings, categories, category_chart, trend_chart }: any) {
    // FIX: Ambil data auth secara aman dari props
    const { props } = usePage();
    const auth = props.auth as any;

    const [weather, setWeather] = useState<any>(null);
    const [loadingWeather, setLoadingWeather] = useState(true);

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
            header={<h2 className="text-xl font-black tracking-tight uppercase opacity-50 text-slate-800 dark:text-white">Admin Console</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-10">

                    {/* HEADER SECTION */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">
                                {/* FIX: Gunakan Optional Chaining agar tidak crash */}
                                {getGreeting()}, {auth?.user?.name ? auth.user.name.split(' ')[0] : 'User'}!
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase tracking-widest text-[10px]">
                                Intelligence System Online • Sector 7-G
                            </p>
                        </div>

                        {/* WEATHER WIDGET */}
                        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl border border-white dark:border-slate-800 p-5 rounded-[2.5rem] flex items-center gap-6 shadow-2xl shadow-blue-500/5 min-w-[300px]">
                            {loadingWeather ? (
                                <div className="flex items-center gap-3 px-4 py-2 w-full justify-center">
                                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Scanning Environment...</span>
                                </div>
                            ) : weather?.main ? (
                                <>
                                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-2xl shadow-lg">
                                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} className="h-12 w-12" alt="weather" />
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
                                <span className="text-[10px] font-black text-slate-400 uppercase p-4 italic">Sensors Unavailable</span>
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

                    {/* ANALYTICS CHARTS SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-500/5">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 ml-1">Asset Allocation</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={category_chart}>
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '1.5rem', color: '#fff', fontSize: '12px', padding: '15px' }}
                                            cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                        />
                                        <Bar dataKey="total" fill="#3b82f6" radius={[15, 15, 0, 0]} barSize={45} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/5">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 ml-1">Reservation Trends (7D)</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trend_chart}>
                                        <defs>
                                            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '1.5rem', color: '#fff', fontSize: '12px' }} />
                                        <Area type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorBookings)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* RECENT ACTIVITY */}
                        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">Recent Operations</h3>
                                <Link href={route('admin.bookings.index')} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-400 transition-colors bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                                    History Log →
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {recent_bookings?.length > 0 ? recent_bookings.map((booking: any) => (
                                    <div key={booking.id} className="group flex items-center justify-between p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-950/50 border border-transparent hover:border-blue-500/30 transition-all duration-500">
                                        <div className="flex items-center gap-5">
                                            <div className="h-14 w-14 rounded-[1.25rem] bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-xl font-black text-blue-600 group-hover:scale-110 transition-transform">
                                                {booking.resource?.name ? booking.resource.name[0] : 'R'}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 dark:text-white">{booking.resource?.name || 'Asset'}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                                                    User: <span className="text-blue-500">{booking.user?.name || 'Unknown'}</span>
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
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-10 italic">Inventory Mix</h3>
                            <div className="space-y-8 flex-1">
                                {categories?.map((cat: any) => (
                                    <div key={cat.id} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{cat.name}</span>
                                            <span className="text-sm font-black text-slate-900 dark:text-white">{cat.resources_count}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                                                style={{ width: `${stats.total_resources > 0 ? (cat.resources_count / stats.total_resources) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12">
                                <Link
                                    href={route('admin.resources.create')}
                                    className="w-full block text-center bg-slate-950 dark:bg-blue-600 text-white py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/20 hover:opacity-90 active:scale-95 transition-all"
                                >
                                    Register New
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
        blue: "from-blue-50 to-indigo-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200/50 dark:border-blue-500/20 text-blue-600",
        emerald: "from-emerald-50 to-teal-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 border-emerald-200/50 dark:border-emerald-500/20 text-emerald-600",
        amber: "from-amber-50 to-orange-100/50 dark:from-amber-900/20 dark:to-amber-800/10 border-amber-200/50 dark:border-amber-500/20 text-amber-600",
        purple: "from-purple-50 to-pink-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border-purple-200/50 dark:border-purple-500/20 text-purple-600",
    };

    return (
        <div className={`p-10 rounded-[3rem] border bg-gradient-to-br shadow-sm transition-all hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2 duration-500 ${themes[color]}`}>
            <div className="flex justify-between items-start">
                <div className="h-14 w-14 bg-white dark:bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    {icon}
                </div>
                <span className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">{value}</span>
            </div>
            <p className="mt-8 font-black text-[11px] uppercase tracking-[0.3em] opacity-40 leading-none">{title}</p>
        </div>
    );
}
