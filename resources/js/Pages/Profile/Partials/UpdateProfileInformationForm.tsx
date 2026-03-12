import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { User, Phone, MapPin, Pencil, Camera } from 'lucide-react';
import React, { useRef } from 'react';

// 1. Definisikan tipe data Form agar TypeScript mengenali field baru Anda
interface FormData {
    name: string;
    last_name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    avatar: File | null;
}

export default function UpdateProfileInformation({ mustVerifyEmail, status }: any) {
    // Ambil data user dan cast sebagai 'any' atau buat interface User jika ingin lebih ketat
    const user = usePage().props.auth.user as any;
    const fileInput = useRef<HTMLInputElement>(null);

    // 2. Gunakan interface FormData pada useForm
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<FormData>({
        name: user.name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        summary: user.summary || '',
        avatar: null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Jika ada upload file, biasanya disarankan menggunakan POST dengan spoofing _method: 'PATCH'
        // namun untuk teks saja, PATCH sudah cukup.
        patch(route('profile.update'), {
            preserveScroll: true
        });
    };

    return (
        <section className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-500">
            <header className="text-center mb-12">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">Personal Information</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                    Update your administrative profile to maintain system integrity.
                </p>
            </header>

            {/* AVATAR SECTION */}
            <div className="flex flex-col items-center mb-12">
                <div className="relative group cursor-pointer" onClick={() => fileInput.current?.click()}>
                    <div className="h-36 w-36 rounded-full bg-slate-50 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center overflow-hidden transition-all group-hover:brightness-90">
                        {user.avatar ? (
                            <img src={`/storage/${user.avatar}`} className="h-full w-full object-cover" alt="Admin" />
                        ) : (
                            <User className="h-20 w-20 text-slate-300" />
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="text-white h-8 w-8" />
                        </div>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-[#585A94] p-2.5 rounded-full text-white shadow-lg border-4 border-white dark:border-slate-950">
                        <Pencil className="h-4 w-4" strokeWidth={3} />
                    </div>
                    <input
                        type="file"
                        ref={fileInput}
                        className="hidden"
                        onChange={(e) => setData('avatar', e.target.files ? e.target.files[0] : null)}
                    />
                </div>
                <p className="text-[10px] font-black text-slate-400 mt-5 uppercase tracking-[0.2em]">Upload profile photo</p>
            </div>

            <form onSubmit={submit} className="space-y-8">
                {/* FIRST & LAST NAME GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-[#585A94] transition-colors" />
                            <input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#585A94]/10 focus:border-[#585A94] outline-none transition-all dark:text-white font-medium"
                                placeholder="First Name"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-[#585A94] transition-colors" />
                            <input
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#585A94]/10 focus:border-[#585A94] outline-none transition-all dark:text-white font-medium"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                </div>

                {/* PHONE NUMBER */}
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                    <div className="flex gap-3">
                        <select className="w-32 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-black uppercase px-4 focus:border-[#585A94] outline-none dark:text-slate-300">
                            <option>+1 (US)</option>
                            <option>+62 (ID)</option>
                        </select>
                        <div className="relative flex-1 group">
                            <Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-[#585A94] transition-colors" />
                            <input
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#585A94]/10 focus:border-[#585A94] outline-none transition-all dark:text-white font-medium"
                                placeholder="e.g. 555-0123"
                            />
                        </div>
                    </div>
                </div>

                {/* LOCATION */}
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Location</label>
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-[#585A94] transition-colors" />
                        <input
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#585A94]/10 focus:border-[#585A94] outline-none transition-all dark:text-white font-medium"
                            placeholder="e.g. San Francisco, CA"
                        />
                    </div>
                </div>

                {/* PROFESSIONAL SUMMARY */}
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Professional Summary</label>
                    <textarea
                        value={data.summary}
                        onChange={(e) => setData('summary', e.target.value)}
                        rows={4}
                        className="w-full p-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-[#585A94]/10 focus:border-[#585A94] outline-none transition-all dark:text-white font-medium resize-none"
                        placeholder="Tell us about your career goals..."
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-center gap-6 pt-6">
                    <button
                        disabled={processing}
                        className="bg-[#585A94] hover:bg-[#4a4c7a] text-white px-12 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#585A94]/30 transition-all active:scale-95 disabled:opacity-50"
                    >
                        Save Profile
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-600 font-black uppercase tracking-widest">Saved!</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
