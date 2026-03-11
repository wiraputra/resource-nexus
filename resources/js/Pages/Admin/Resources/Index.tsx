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

    const [search, setSearch] = useState(filters?.search || '');

    const [bookingForm, setBookingForm] = useState({
        resource_id: null as number | null,
        start_time: '',
        end_time: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.resources'), { search: search }, {
            preserveState: true,
            replace: true
        });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to move "${name}" to the Trash Bin?`)) {
            router.delete(route('admin.resources.destroy', id), {
                preserveScroll: true,
            });
        }
    };

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
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-100">
                        Resource Management
                    </h2>
                    <Link href={route('admin.bookings.index')} className="text-sm font-bold text-blue-600 hover:underline">
                        View All Bookings →
                    </Link>
                </div>
            }
        >
            <Head title="Admin Resources" />

            <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Notifikasi Sukses */}
                    {flash?.message && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl flex items-center gap-3">
                            <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-bold">{flash.message}</span>
                        </div>
                    )}

                    {/* Notifikasi Error Booking */}
                    {errors.start_time && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-3">
                            <span className="text-sm font-bold">⚠️ {errors.start_time}</span>
                        </div>
                    )}

                    {/* Section Header & Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <div className="w-full md:w-auto text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">All Resources</h1>

                                {/* LINK KE TRASH CAN (BARU) */}
                                <Link
                                    href={route('admin.resources.trashed')}
                                    className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-all shadow-sm border border-slate-200 dark:border-slate-700 group"
                                    title="View Trash Can"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </Link>
                            </div>
                            <p className="text-slate-500 text-sm">Find and book your company assets.</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                            <form onSubmit={handleSearch} className="relative w-full md:w-80">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by name..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-white text-sm focus:ring-blue-500 shadow-sm"
                                />
                                <div className="absolute left-3 top-3 text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </form>

                            <Link
                                href={route('admin.resources.create')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 font-bold text-sm w-full md:w-auto text-center"
                            >
                                + Add New
                            </Link>
                        </div>
                    </div>

                    {/* Grid List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resources.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

                                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item.image}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            alt={item.name}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                            No Image Available
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-sm text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-lg uppercase tracking-widest border border-white/20">
                                            {item.category.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                                {item.name}
                                            </h3>
                                            <div className="flex gap-3">
                                                <Link href={route('admin.resources.edit', item.id)} className="text-slate-400 hover:text-blue-600 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </Link>
                                                <button onClick={() => handleDelete(item.id, item.name)} className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                                            {item.description || 'No description provided.'}
                                        </p>
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className={`h-2 w-2 rounded-full ${item.status === 'available' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter italic">{item.status}</span>
                                        </div>
                                    </div>

                                    <form onSubmit={(e) => handleBooking(e, item.id)} className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="datetime-local"
                                                required
                                                className="text-[10px] p-2 rounded-lg border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white w-full focus:ring-blue-500"
                                                onChange={e => setBookingForm({...bookingForm, start_time: e.target.value})}
                                            />
                                            <input
                                                type="datetime-local"
                                                required
                                                className="text-[10px] p-2 rounded-lg border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white w-full focus:ring-blue-500"
                                                onChange={e => setBookingForm({...bookingForm, end_time: e.target.value})}
                                            />
                                        </div>
                                        <button type="submit" className="w-full bg-slate-900 dark:bg-blue-600 text-white text-[11px] font-bold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-md">
                                            Quick Reserve
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>

                    {resources.length === 0 && (
                        <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <p className="text-slate-400 font-bold">No assets found in active list.</p>
                            <Link href={route('admin.resources')} className="text-blue-600 text-xs mt-2 inline-block font-bold uppercase">Reset Search</Link>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
