import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock, Eye, CheckCircle } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen bg-white transition-colors duration-500 dark:bg-slate-950">
            <Head title="Join ResourceNexus" />

            {/* --- SISI KIRI: BRANDING & TESTIMONIAL --- */}
            <div className="hidden lg:flex w-[42%] bg-[#585A94] p-16 flex-col justify-between text-white relative overflow-hidden">
                {/* Dekorasi Abstract */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-1.5 rounded-lg shadow-lg">
                            <svg className="w-6 h-6 text-[#585A94]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-black tracking-tighter uppercase italic">ResourceNexus</h1>
                    </div>
                </div>

                <div className="relative z-10 max-w-sm">
                    <p className="text-2xl font-medium leading-snug italic mb-4">
                        "ResourceNexus transformed how we manage our company fleet and meeting rooms. Efficiency increased by 40% in just one month."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="h-0.5 w-8 bg-blue-400"></div>
                        <p className="text-sm font-bold tracking-widest uppercase opacity-70">Internal Operations Manager</p>
                    </div>
                </div>
            </div>

            {/* --- SISI KANAN: FORM REGISTER --- */}
            <div className="w-full lg:w-[58%] flex items-center justify-center p-8 md:p-20 overflow-y-auto">
                <div className="w-full max-w-lg space-y-10">

                    {/* Header */}
                    <div className="text-center lg:text-left space-y-2">
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Join ResourceNexus</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Start managing your team's assets and schedules efficiently.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Name Field (Sesuai Laravel default 'name', tapi UI bisa Anda pecah jika mau) */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-[#585A94] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full pl-12 pr-4 py-3.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white rounded-2xl focus:ring-4 focus:ring-[#585A94]/10 focus:border-[#585A94] outline-none transition-all"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1 font-bold italic">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Work Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-[#585A94] transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full pl-12 pr-4 py-3.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white rounded-2xl focus:ring-4 focus:ring-[#585A94]/10 focus:border-[#585A94] outline-none transition-all"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1 font-bold italic">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Password</label>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-[#585A94] transition-colors" />
                                <input
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="w-full pl-12 pr-12 py-3.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white rounded-2xl focus:ring-4 focus:ring-[#585A94]/10 focus:border-[#585A94] outline-none transition-all"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <Eye className="absolute right-4 top-3.5 h-5 w-5 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1 font-bold italic">{errors.password}</p>}
                        </div>

                        {/* Terms checkbox */}
                        <div className="flex items-center gap-3 p-2">
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded-lg border-slate-300 text-[#585A94] focus:ring-[#585A94] transition-all cursor-pointer"
                                checked={data.terms}
                                onChange={(e) => setData('terms', e.target.checked)}
                                id="terms"
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                                I agree to the <span className="font-bold text-slate-900 dark:text-white hover:underline">Terms of Service</span> and <span className="font-bold text-slate-900 dark:text-white hover:underline">Privacy Policy</span>.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={processing}
                            className="w-full bg-[#585A94] hover:bg-[#4a4c7a] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#585A94]/30 transition-all active:scale-[0.98] disabled:opacity-50 uppercase text-xs tracking-widest"
                        >
                            {processing ? 'Generating Account...' : 'Create Account'}
                        </button>

                        {/* Divider */}
                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">Or Secure Access With</span>
                            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                        </div>

                        {/* Google Social Login */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-800 py-3.5 rounded-2xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-[0.98]"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="h-5 w-5" alt="google" />
                            Continue with Google
                        </button>

                        {/* Footer Link */}
                        <div className="text-center mt-8">
                            <p className="text-sm text-slate-500 font-medium">
                                Already have an account? <Link href={route('login')} className="text-blue-600 font-black hover:underline underline-offset-4">Log In Here</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
