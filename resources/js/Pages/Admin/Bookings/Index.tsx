import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Check, X, FileText } from 'lucide-react'; // Pastikan lucide-react terinstall

interface Booking {
    id: number;
    start_time: string;
    end_time: string;
    status: 'pending' | 'approved' | 'rejected';
    user: { name: string };
    resource: {
        name: string;
        category?: { name: string };
    };
}

export default function Index({ bookings = [] }: { bookings: Booking[] }) {
    const { flash }: any = usePage().props;

    // Fungsi untuk memperbarui status booking (Approve/Reject)
    const handleStatusUpdate = (id: number, status: string) => {
        const action = status === 'approved' ? 'Approve' : 'Reject';
        if (confirm(`Are you sure you want to ${action} this booking request?`)) {
            router.patch(route('admin.bookings.status', id), { status }, {
                preserveScroll: true,
            });
        }
    };

    // Helper untuk warna label status
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
            case 'rejected': return 'bg-red-500/10 text-red-600 border-red-200';
            default: return 'bg-amber-500/10 text-amber-600 border-amber-200 animate-pulse';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 uppercase opacity-60">
                    Booking Governance
                </h2>
            }
        >
            <Head title="Admin Bookings" />

            <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">

                    {/* Notifikasi Sukses */}
                    {flash?.message && (
                        <div className="p-4 bg-blue-600 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 animate-in fade-in zoom-in">
                            ✨ {flash.message}
                        </div>
                    )}

                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-none">Booking Inventory</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">Review and manage all asset reservation requests.</p>
                        </div>

                        <a
                            href={route('admin.reports.bookings.pdf')}
                            className="flex items-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl hover:opacity-90 active:scale-95"
                        >
                            <FileText className="h-4 w-4" />
                            Generate Report (PDF)
                        </a>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-slate-950/50">
                                    <tr>
                                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Resource & Category</th>
                                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Requested By</th>
                                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timeframe</th>
                                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {bookings.length > 0 ? (
                                        bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group">
                                                <td className="p-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-slate-900 dark:text-white text-base">{booking.resource?.name || 'Asset Deleted'}</span>
                                                        <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">
                                                            {booking.resource?.category?.name || 'No Category'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <span className="text-sm text-slate-600 dark:text-slate-400 font-black italic underline decoration-slate-200 underline-offset-4">{booking.user?.name}</span>
                                                </td>
                                                <td className="p-6">
                                                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold space-y-1 font-mono">
                                                        <p><span className="text-blue-500 font-black opacity-50">START:</span> {new Date(booking.start_time).toLocaleString('id-ID')}</p>
                                                        <p><span className="text-emerald-500 font-black opacity-50">END:</span> {new Date(booking.end_time).toLocaleString('id-ID')}</p>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-center">
                                                    <span className={`px-4 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusStyle(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="p-6 text-right">
                                                    {booking.status === 'pending' ? (
                                                        <div className="flex gap-2 justify-end">
                                                            <button
                                                                onClick={() => handleStatusUpdate(booking.id, 'approved')}
                                                                className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-90"
                                                                title="Approve Booking"
                                                            >
                                                                <Check className="h-4 w-4" strokeWidth={3} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                                                                className="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg shadow-red-500/20 transition-all active:scale-90"
                                                                title="Reject Booking"
                                                            >
                                                                <X className="h-4 w-4" strokeWidth={3} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase italic">Archived</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="p-24 text-center text-slate-400 font-black uppercase tracking-[0.3em] text-xs">
                                                No active booking requests.
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
