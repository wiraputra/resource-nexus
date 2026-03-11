import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

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

export default function Trashed({ resources }: { resources: Resource[] }) {
    const { flash }: any = usePage().props;

    const handleRestore = (id: number) => {
        // Menggunakan router.patch sesuai dengan web.php
        router.patch(route('admin.resources.restore', id), {}, {
            preserveScroll: true,
        });
    };

    const handlePermanentDelete = (id: number) => {
        if (confirm('⚠️ Warning: This action cannot be undone. The data and its image will be deleted forever. Proceed?')) {
            router.delete(route('admin.resources.force-delete', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold dark:text-white text-slate-800">Trash Bin</h2>}
        >
            <Head title="Trash bin" />

            <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Notifikasi Sukses */}
                    {flash?.message && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-2xl flex items-center gap-3 animate-pulse">
                            <span className="text-sm font-bold">✨ {flash.message}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Deleted Resources</h1>
                            <p className="text-slate-500 text-sm italic">Items here are hidden from the active list but can be recovered.</p>
                        </div>
                        <Link
                            href={route('admin.resources')}
                            className="bg-slate-900 dark:bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg hover:opacity-90 transition-all"
                        >
                            ← Back to Active
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resources.map((item) => (
                            <div key={item.id} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-red-100 dark:border-red-900/20 rounded-3xl overflow-hidden shadow-sm flex flex-col group opacity-90 hover:opacity-100 transition-all duration-300">

                                {/* Image Display (Grayscale untuk efek sampah) */}
                                <div className="relative h-40 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item.image}`}
                                            className="w-full h-full object-cover"
                                            alt={item.name}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-[10px] uppercase">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-2 py-1 bg-red-500 text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-lg">
                                            TRASHED
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-400 dark:text-slate-500 line-through mb-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-[10px] font-bold text-blue-500 uppercase mb-4">
                                            Category: {item.category.name}
                                        </p>
                                    </div>

                                    <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <button
                                            onClick={() => handleRestore(item.id)}
                                            className="flex-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white text-xs font-black py-2.5 rounded-xl transition-all shadow-sm"
                                        >
                                            RESTORE
                                        </button>
                                        <button
                                            onClick={() => handlePermanentDelete(item.id)}
                                            className="flex-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-xs font-black py-2.5 rounded-xl transition-all shadow-sm"
                                        >
                                            WIPE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {resources.length === 0 && (
                        <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <div className="text-4xl mb-4">🗑️</div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Your trash bin is currently empty.</p>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
