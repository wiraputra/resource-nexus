import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, Eye, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen bg-white transition-colors duration-500 dark:bg-slate-950">
            <Head title="Login to ResourceNexus" />

            {/* --- SISI KIRI: BRANDING & WELCOME MESSAGE --- */}
            <div className="hidden lg:flex w-[42%] bg-[#585A94] p-16 flex-col justify-between text-white relative overflow-hidden">
                {/* Dekorasi Abstract (Glass Effect) */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-1.5 rounded-xl shadow-lg">
                            <ShieldCheck className="w-6 h-6 text-[#585A94]" strokeWidth={2.5} />
                        </div>
                        <h1 className="text-xl font-black tracking-tighter uppercase italic">ResourceNexus</h1>
                    </div>
                </div>

                <div className="relative z-10 max-w-sm space-y-6">
                    <h2 className="text-4xl font-black leading-tight tracking-tighter">
                        Welcome Back to the Control Center.
                    </h2>
                    <p className="text-lg font-medium opacity-80 leading-relaxed">
                        Access your dashboard to manage assets, track reservations, and maintain operational excellence.
                    </p>
                    <div className="flex items-center gap-3 pt-4">
                        <div className="h-0.5 w-12 bg-indigo-300"></div>
                        <p className="text-xs font-black tracking-[0.3em] uppercase opacity-60 text-indigo-100">Portal Authorized Access</p>
                    </div>
                </div>

                <div className="relative z-10 text-[10px] font-bold uppercase tracking-widest opacity-40">
                    &copy; 2025 ResourceNexus Enterprise Systems
                </div>
            </div>

            {/* --- SISI KANAN: FORM LOGIN --- */}
            <div className="w-full lg:w-[58%] flex items-center justify-center p-8 md:p-20 overflow-y-auto">
                <div className="w-full max-w-md space-y-10">

                    {/* Header */}
                    <div className="text-center lg:text-left space-y-2">
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Sign In</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Please enter your credentials to access your account.</p>
                    </div>

                    {status && (
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-bold border border-emerald-100">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-[#585A94] transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full pl-12 pr-4 py-3.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white rounded-2xl focus:ring-4 focus:ring-[#585A94]/10 focus:border-[#585A94] outline-none transition-all font-medium"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1 font-bold italic">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center mb-1 px-1">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Password</label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-[10px] font-black uppercase text-blue-600 hover:text-[#585A94] transition-colors tracking-widest">
                                        Forgot Password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-[#585A94] transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white rounded-2xl focus:ring-4 focus:ring-[#585A94]/10 focus:border-[#585A94] outline-none transition-all font-medium"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <Eye className="absolute right-4 top-3.5 h-5 w-5 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1 font-bold italic">{errors.password}</p>}
                        </div>

                        {/* Remember Me checkbox */}
                        <div className="flex items-center gap-3 p-1">
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded-lg border-slate-300 text-[#585A94] focus:ring-[#585A94] transition-all cursor-pointer"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                id="remember"
                            />
                            <label htmlFor="remember" className="text-sm font-medium text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                                Keep me signed in
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={processing}
                            className="w-full bg-[#585A94] hover:bg-[#4a4c7a] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#585A94]/30 transition-all active:scale-[0.98] disabled:opacity-50 uppercase text-xs tracking-widest flex items-center justify-center gap-2"
                        >
                            {processing ? 'Authenticating...' : 'Sign In Now'}
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        {/* Divider */}
                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Partner Portals</span>
                            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                        </div>

                        {/* Google Social Login */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-800 py-3.5 rounded-2xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-[0.98]"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="h-5 w-5" alt="google" />
                            Sign in with Google
                        </button>

                        {/* Footer Link */}
                        <div className="text-center mt-10">
                            <p className="text-sm text-slate-500 font-medium">
                                New member of the team? <Link href={route('register')} className="text-blue-600 font-black hover:underline underline-offset-4 decoration-2">Create an Account</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
