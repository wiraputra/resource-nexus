import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Booking {
    id: number;
    start_time: string;
    end_time: string;
    status: string;
    user: { name: string };
    resource: {
        name: string;
        category?: { name: string };
    };
}

export default function Index({ bookings = [] }: { bookings: Booking[] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-100">
                    Booking Schedules
                </h2>
            }
        >
            <Head title="Admin Bookings" />

            <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Booking History</h1>
                        <p className="text-slate-500 text-sm">Monitor who is using what and when.</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Resource</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">User</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Time Range</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {bookings.length > 0 ? (
                                        bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900 dark:text-white">{booking.resource?.name || 'Deleted Resource'}</span>
                                                        <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">
                                                            {booking.resource?.category?.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{booking.user?.name || 'Unknown User'}</span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
                                                        <p><span className="text-blue-500 font-bold">START:</span> {new Date(booking.start_time).toLocaleString('id-ID')}</p>
                                                        <p><span className="text-emerald-500 font-bold">END:</span> {new Date(booking.end_time).toLocaleString('id-ID')}</p>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase">
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="p-20 text-center text-slate-400 italic">
                                                No bookings found in the schedule.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
