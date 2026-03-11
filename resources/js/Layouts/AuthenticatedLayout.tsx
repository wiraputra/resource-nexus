import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ThemeToggle from '@/Components/ThemeToggle';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">

            {/* Navbar: Menggunakan Glassmorphism (Efek Blur) di Dark Mode */}
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-colors duration-500 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-blue-600" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                <NavLink href={route('admin.resources')} active={route().current('admin.resources*')}>
                                    Resources
                                </NavLink>
                                <NavLink href={route('admin.bookings.index')} active={route().current('admin.bookings.index')}>
                                    Bookings
                                </NavLink>
                                <NavLink href={route('admin.calendar')} active={route().current('admin.calendar')}>
                                    Calendar
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center gap-4">
                            {/* Tombol Toggle Tema */}
                            <ThemeToggle />

                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-xl border border-transparent bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none shadow-sm"
                                            >
                                                {user.name}
                                                <svg className="-me-0.5 ms-2 h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile Settings</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Toggle & Hamburger */}
                        <div className="-me-2 flex items-center sm:hidden gap-2">
                            <ThemeToggle />
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.resources')} active={route().current('admin.resources*')}>Resources</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.bookings.index')} active={route().current('admin.bookings.index')}>Bookings</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.calendar')} active={route().current('admin.calendar')}>Calendar</ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {/* Page Header: Teks akan otomatis putih di Dark Mode */}
            {header && (
                <header className="bg-white border-b border-slate-100 transition-colors duration-500 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="text-slate-900 dark:text-white font-black">
                            {header}
                        </div>
                    </div>
                </header>
            )}

            <main className="transition-colors duration-500">
                {children}
            </main>
        </div>
    );
}
