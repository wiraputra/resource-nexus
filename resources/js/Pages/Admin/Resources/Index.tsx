import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

interface Resource {
    id: number;
    name: string;
    description: string;
    status: string;
    image?: string;
    category: {
        name: string;
    };
}

export default function Index({ resources }: { resources: Resource[] }) {
    const { flash, errors, filters }: any = usePage().props;

    // State untuk input pencarian
    const [search, setSearch] = useState(filters?.search || '');

    // State untuk form booking cepat
    const [bookingForm, setBookingForm] = useState({
        resource_id: null as number | null,
        start_time: '',
        end_time: '',
    });

    // Fungsi Pencarian
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.resources'), { search: search }, {
            preserveState: true,
            replace: true
        });
    };

    // Fungsi Hapus dengan konfirmasi modern
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to move "${name}" to the Trash Bin?`)) {
            router.delete(route('admin.resources.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    // Fungsi Booking Cepat
    const handleBooking = (e: React.FormEvent, resourceId: number) => {
        e.preventDefault();
        router.post(route('admin.bookings.store'), {
            resource_id: resourceId,
            start_time: bookingForm.start_time,
            end_time: bookingForm.end_time,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setBookingForm({ resource_id: null, start_time: '', end_time: '' });
                alert("Booking Berhasil!");
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-black tracking-tight">Resource Management</h2>
                    <Link href={route('admin.bookings.index')} className="text-sm font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
                        View All Bookings
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                </div>
            }
        >
            <Head title="Resources" />

            <div className="py-12 min-h-screen transition-colors duration-500">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

                    {/* Alert Notifications */}
                    <div className="space-y-4">
                        {flash?.message && (
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-bold">{flash.message}</span>
                            </div>
                        )}
                        {errors.start_time && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3 animate-in shake">
                                <span className="text-sm font-bold">⚠️ {errors.start_time}</span>
                            </div>
                        )}
                    </div>

                    {/* Control Bar: Search & Add */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="space-y-1 text-center lg:text-left">
                                <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-none">Asset Library</h1>
                                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Manage & Monitor</p>
                            </div>
                            <Link
                                href={route('admin.resources.trashed')}
                                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-all hover:scale-110"
                                title="Trash Bin"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                            <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search asset name..."
                                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </form>

                            <Link
                                href={route('admin.resources.create')}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                            >
                                + Add New Asset
                            </Link>
                        </div>
                    </div>

                    {/* Asset Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resources.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col group transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">

                                {/* Image Section */}
                                <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item.image}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            alt={item.name}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">No Media</span>
                                        </div>
                                    )}
                                    <div className="absolute top-6 left-6">
                                        <span className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-xl text-blue-600 dark:text-blue-400 text-[10px] font-black rounded-xl uppercase tracking-widest border border-white/20">
                                            {item.category.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
                                                {item.name}
                                            </h3>
                                            <div className="flex gap-2">
                                                <Link href={route('admin.resources.edit', item.id)} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 transition-all shadow-inner">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </Link>
                                                <button onClick={() => handleDelete(item.id, item.name)} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-all shadow-inner cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium">
                                            {item.description || 'Dedicated assets for company operational needs.'}
                                        </p>
                                        <div className="flex items-center gap-2 pt-2">
                                            <div className={`h-2 w-2 rounded-full ${item.status === 'available' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-amber-500'}`}></div>
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.status}</span>
                                        </div>
                                    </div>

                                    {/* Quick Booking Form */}
                                    <form onSubmit={(e) => handleBooking(e, item.id)} className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Quick Reservation</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Start</label>
                                                <input
                                                    type="datetime-local"
                                                    required
                                                    className="text-[10px] p-2.5 rounded-xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white w-full focus:ring-blue-500"
                                                    onChange={e => setBookingForm({...bookingForm, start_time: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">End</label>
                                                <input
                                                    type="datetime-local"
                                                    required
                                                    className="text-[10px] p-2.5 rounded-xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white w-full focus:ring-blue-500"
                                                    onChange={e => setBookingForm({...bookingForm, end_time: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full bg-slate-900 dark:bg-blue-600 text-white text-xs font-black py-3 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-blue-500/10 active:scale-[0.98]">
                                            CONFIRM BOOKING
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {resources.length === 0 && (
                        <div className="text-center py-40 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <div className="bg-slate-50 dark:bg-slate-800 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No assets found</h3>
                            <p className="text-slate-400 text-sm mt-2 mb-8">Try adjusting your search keywords or clear filters.</p>
                            <Link href={route('admin.resources')} className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all">
                                Clear All Filters
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
