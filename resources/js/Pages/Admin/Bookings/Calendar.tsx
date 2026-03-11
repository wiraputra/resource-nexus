import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar({ events }: { events: any[] }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold dark:text-white text-slate-800">Visual Schedule</h2>}
        >
            <Head title="Booking Calendar" />

            <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Resource Timeline</h1>
                            <p className="text-slate-500 text-sm">Visual overview of all asset reservations.</p>
                        </div>
                        <Link
                            href={route('admin.bookings.index')}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-4 py-2 rounded-xl text-sm font-bold shadow-sm"
                        >
                            View as List
                        </Link>
                    </div>

                    {/* Container Kalender dengan Desain Modern */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-slate-100 dark:border-slate-800">
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            events={events}
                            height="700px"
                            eventDisplay="block"
                            eventClassNames="rounded-lg border-none px-2 py-1 text-[10px] font-bold shadow-sm"
                            // Custom styling untuk dark mode lewat CSS injection atau class
                            themeSystem="standard"
                        />
                    </div>

                    <div className="mt-8 flex gap-6 text-xs font-bold uppercase tracking-widest text-slate-400 justify-center">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div> Approved
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-amber-500"></div> Pending
                        </div>
                    </div>

                </div>
            </div>

            {/* Custom Styling agar FullCalendar cantik di Dark Mode */}
            <style dangerouslySetInnerHTML={{ __html: `
                .fc .fc-toolbar-title { font-size: 1.25rem; font-weight: 800; color: #1e293b; }
                .dark .fc .fc-toolbar-title { color: #f8fafc; }
                .fc .fc-button-primary { background: #3b82f6; border: none; border-radius: 0.75rem; font-weight: 700; text-transform: uppercase; font-size: 10px; padding: 8px 16px; }
                .fc .fc-col-header-cell { padding: 12px 0; background: #f8fafc; font-size: 11px; color: #64748b; }
                .dark .fc .fc-col-header-cell { background: #0f172a; color: #94a3b8; border-color: #1e293b; }
                .dark .fc td, .dark .fc th { border-color: #1e293b !important; }
                .fc-event-title { white-space: normal !important; }
            `}} />
        </AuthenticatedLayout>
    );
}
