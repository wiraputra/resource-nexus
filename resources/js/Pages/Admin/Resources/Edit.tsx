import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

export default function Edit({ resource, categories }: any) {
    // Inisialisasi form dengan data lama dari database
    const { data, setData, patch, processing, errors } = useForm({
        name: resource.name,
        category_id: resource.category_id,
        description: resource.description || '',
        status: resource.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mengirim request ke route update
        patch(route('admin.resources.update', resource.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold dark:text-white">Edit Resource: {resource.name}</h2>}>
            <Head title="Edit Resource" />
            <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Resource Name</label>
                            <input
                                type="text" value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full rounded-xl border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Category</label>
                            <select
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                                className="w-full rounded-xl border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            >
                                {categories.map((cat: any) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full rounded-xl border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                rows={4}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Status</label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full rounded-xl border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            >
                                <option value="available">Available</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="busy">Busy</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <Link href={route('admin.resources')} className="px-4 py-2 text-sm font-bold text-slate-500">Cancel</Link>
                            <button
                                type="submit" disabled={processing}
                                className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                            >
                                {processing ? 'Updating...' : 'Update Resource'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
