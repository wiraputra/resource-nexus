import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

interface Resource {
    id: number;
    name: string;
    description: string;
    status: string;
    category: {
        name: string;
    };
}

export default function Index({ resources }: { resources: Resource[] }) {
    const { flash, errors }: any = usePage().props;

    const [bookingForm, setBookingForm] = useState({
        resource_id: null as number | null,
        start_time: '',
        end_time: '',
    });

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
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

                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Resources</h1>
                            <p className="text-slate-500 text-sm">Manage assets and make quick bookings.</p>
                        </div>

                        <Link
                            href={route('admin.resources.create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 font-bold text-sm"
                        >
                            + Add New Resource
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {resources.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between group">
                                <div>
                                    <div className="mb-4 flex justify-between items-start">
                                        <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-lg uppercase tracking-widest">
                                            {item.category.name}
                                        </span>
                                        <div className="flex gap-3 items-center">
                                            {/* TOMBOL EDIT (BARU) */}
                                            <Link
                                                href={route('admin.resources.edit', item.id)}
                                                className="text-slate-400 hover:text-blue-600 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </Link>

                                            {/* TOMBOL DELETE */}
                                            <button onClick={() => handleDelete(item.id, item.name)} className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm line-clamp-2 italic">
                                        Status: {item.status}
                                    </p>
                                </div>

                                <form onSubmit={(e) => handleBooking(e, item.id)} className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quick Booking</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="datetime-local"
                                            required
                                            className="text-[10px] p-2 rounded-lg border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white w-full"
                                            onChange={e => setBookingForm({...bookingForm, start_time: e.target.value})}
                                        />
                                        <input
                                            type="datetime-local"
                                            required
                                            className="text-[10px] p-2 rounded-lg border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white w-full"
                                            onChange={e => setBookingForm({...bookingForm, end_time: e.target.value})}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-slate-900 dark:bg-blue-600 text-white text-[11px] font-bold py-2 rounded-xl hover:bg-blue-600 transition-colors shadow-md"
                                    >
                                        Book Now
                                    </button>
                                </form>
                            </div>
                        ))}
                    </div>

                    {resources.length === 0 && (
                        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <p className="text-slate-400 font-medium">No resources found.</p>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
