import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recent_bookings, categories }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-slate-800 dark:text-slate-100">Executive Overview</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

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

// Sub-component untuk Card Statistik agar kode tetap rapi
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
