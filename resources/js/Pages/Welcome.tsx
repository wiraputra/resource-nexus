import { Head, Link } from '@inertiajs/react';
import { ShieldCheck, Zap, BarChart3, Calendar, ArrowRight, Box } from 'lucide-react';

export default function Welcome({ auth }: any) {
    return (
        <div className="min-h-screen bg-slate-50 transition-colors duration-500 dark:bg-slate-950 selection:bg-indigo-500 selection:text-white">
            <Head title="Welcome to ResourceNexus" />

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-all duration-500">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#585A94] p-1.5 rounded-xl shadow-lg shadow-indigo-500/20">
                            <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">
                            ResourceNexus
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-[#585A94] hover:bg-[#4a4c7a] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-[#585A94] dark:hover:text-white transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-[#585A94] hover:bg-[#4a4c7a] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <main className="pt-40 pb-20 px-6">
                <div className="max-w-5xl mx-auto text-center space-y-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full">
                        <Zap className="w-4 h-4 text-[#585A94] dark:text-indigo-400" fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#585A94] dark:text-indigo-400">
                            Next-Gen Resource Management
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] italic">
                        Master Your Assets.<br />
                        <span className="text-[#585A94] not-italic underline decoration-indigo-500/30">Optimize Workflow.</span>
                    </h1>

                    {/* Description */}
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        The definitive enterprise ecosystem to monitor, book, and analyze your company's high-value resources with military-grade precision.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="w-full sm:w-auto bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-2xl"
                            >
                                Open Dashboard <ArrowRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="w-full sm:w-auto bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-2xl"
                            >
                                Get Started Now <ArrowRight className="w-4 h-4" />
                            </Link>
                        )}

                        <a
                            href="#features"
                            className="w-full sm:w-auto px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                        >
                            Explore Features
                        </a>
                    </div>
                </div>

                {/* --- FEATURE PREVIEW CARDS --- */}
                <div id="features" className="max-w-7xl mx-auto mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Calendar className="w-7 h-7" />}
                        title="Collision Prevention"
                        desc="Advanced overlap logic ensures that fleet and rooms are never double-booked, maintaining operational flow."
                    />
                    <FeatureCard
                        icon={<BarChart3 className="w-7 h-7" />}
                        title="Visual Intelligence"
                        desc="Real-time analytics and heatmaps to understand your asset utilization and predict future demands."
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="w-7 h-7" />}
                        title="Strict Governance"
                        desc="Granular role-based access control and soft-deletion protection for your most critical enterprise data."
                    />
                </div>
            </main>

            {/* --- FOOTER --- */}
            <footer className="py-20 border-t border-slate-200 dark:border-slate-900 text-center bg-white dark:bg-slate-950 transition-colors duration-500">
                <div className="flex items-center justify-center gap-2 mb-6 opacity-30">
                    <Box className="w-5 h-5" />
                    <span className="font-black tracking-tighter uppercase italic">ResourceNexus</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-700">
                    &copy; 2025 ResourceNexus Enterprise Solutions &bull; All Rights Reserved
                </p>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 text-[#585A94] dark:text-indigo-400 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                {icon}
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                {title}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {desc}
            </p>
        </div>
    );
}
