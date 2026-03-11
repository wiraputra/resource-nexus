import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ categories }: { categories: any[] }) {
    // Tambahkan field 'image' dan 'status' ke dalam useForm
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        description: '',
        status: 'available',
        image: null as File | null, // Field untuk menampung file gambar
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Inertia otomatis mendeteksi jika ada file dan mengirimkan sebagai FormData
        post(route('admin.resources.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold dark:text-white text-slate-800">Add New Resource</h2>}
        >
            <Head title="Create Resource" />
            <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">

                        {/* Nama Resource */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Resource Name</label>
                            <input
                                type="text" value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full rounded-xl border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-blue-500"
                                placeholder="e.g. Ruang Rapat C atau Toyota Avanza"
                            />
                            {errors.name && <div className="text-red-500 text-xs mt-1 font-medium">{errors.name}</div>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Kategori */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Category</label>
                                <select
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>
                                {errors.category_id && <div className="text-red-500 text-xs mt-1 font-medium">{errors.category_id}</div>}
                            </div>

                            {/* Status Awal */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Initial Status</label>
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
                        </div>

                        {/* Upload Gambar (BARU) */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Resource Photo</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-800 hover:bg-slate-100 dark:border-slate-700 transition-all">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                                            {data.image ? <span className="font-bold text-blue-600">File selected: {data.image.name}</span> : <span>Click to upload image</span>}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 tracking-tighter uppercase font-bold">PNG, JPG or JPEG (Max 2MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                                    />
                                </label>
                            </div>
                            {errors.image && <div className="text-red-500 text-xs mt-1 font-medium">{errors.image}</div>}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full rounded-xl border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white h-32"
                                placeholder="Jelaskan detail aset di sini..."
                            />
                            {errors.description && <div className="text-red-500 text-xs mt-1 font-medium">{errors.description}</div>}
                        </div>

                        {/* Aksi */}
                        <div className="flex items-center justify-end gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <Link href={route('admin.resources')} className="text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors">Cancel</Link>
                            <button
                                type="submit" disabled={processing}
                                className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50"
                            >
                                {processing ? 'Uploading...' : 'Create Resource'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
