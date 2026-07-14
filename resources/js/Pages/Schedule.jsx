import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const scheduleData = [
    {
        day: 'Monday',
        type: 'Non-Sitting Day',
        typeColor: 'bg-blue-100 text-blue-800',
        borderColor: 'border-blue-400',
        bgColor: 'bg-blue-50/50',
        slots: [
            { time: '8:00 AM – 12:45 PM', label: 'Morning Slot', capacity: 5 },
            { time: '12:45 PM – 5:30 PM', label: 'Afternoon Slot', capacity: 5 },
        ],
        note: 'Extended hours. Up to 5 schools per slot.',
    },
    {
        day: 'Tuesday',
        type: 'Sitting Day',
        typeColor: 'bg-green-100 text-green-800',
        borderColor: 'border-green-500',
        bgColor: 'bg-green-50/50',
        slots: [
            { time: '8:00 AM – 11:00 AM', label: 'Morning Only', capacity: 4 },
        ],
        note: 'Parliament is in session. Morning visits only.',
    },
    {
        day: 'Wednesday',
        type: 'Sitting Day',
        typeColor: 'bg-green-100 text-green-800',
        borderColor: 'border-green-500',
        bgColor: 'bg-green-50/50',
        slots: [
            { time: '8:00 AM – 12:45 PM', label: 'Morning Slot', capacity: 4 },
            { time: '12:45 PM – 5:30 PM', label: 'Afternoon Slot', capacity: 4 },
        ],
        note: 'Full day available. Up to 4 schools per slot.',
    },
    {
        day: 'Thursday',
        type: 'Sitting Day',
        typeColor: 'bg-green-100 text-green-800',
        borderColor: 'border-green-500',
        bgColor: 'bg-green-50/50',
        slots: [
            { time: '2:30 PM – 5:30 PM', label: 'Afternoon Only', capacity: 4 },
        ],
        note: 'Parliament is in session. Afternoon visits only.',
    },
    {
        day: 'Friday',
        type: 'Non-Sitting Day',
        typeColor: 'bg-blue-100 text-blue-800',
        borderColor: 'border-blue-400',
        bgColor: 'bg-blue-50/50',
        slots: [
            { time: '8:00 AM – 12:45 PM', label: 'Morning Slot', capacity: 5 },
            { time: '12:45 PM – 5:30 PM', label: 'Afternoon Slot', capacity: 5 },
        ],
        note: 'Extended hours. Up to 5 schools per slot.',
    },
];

export default function Schedule() {
    return (
        <PublicLayout>
            <Head title="Visit Schedule — Parliament of Kenya" />

            {/* ── Page Header ── */}
            <section className="bg-gradient-to-r from-parliament-800 to-parliament-900 text-white py-14">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold">Visit Schedule</h1>
                    <p className="text-parliament-200 mt-3 text-lg">
                        When you can visit the Parliament of Kenya
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* ── Intro ── */}
                <div className="max-w-3xl mb-12">
                    <p className="text-gray-600 leading-relaxed">
                        The Parliament of Kenya welcomes visitors on weekdays, Monday through Friday.
                        Time slots vary depending on whether Parliament is in session (Tuesday, Wednesday,
                        Thursday) or on non-sitting days (Monday, Friday). The Parliament is
                        <strong> closed on weekends and public holidays</strong>.
                    </p>
                </div>

                {/* ── Weekly Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
                    {scheduleData.map((day) => (
                        <div
                            key={day.day}
                            className={`rounded-xl border-2 ${day.borderColor} ${day.bgColor} overflow-hidden`}
                        >
                            {/* Day Header */}
                            <div className="p-5 text-center border-b border-gray-200/50">
                                <div className="text-lg font-bold text-gray-900">
                                    {day.day}
                                </div>
                                <span
                                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mt-2 ${day.typeColor}`}
                                >
                                    {day.type}
                                </span>
                            </div>

                            {/* Slots */}
                            <div className="p-4 space-y-3">
                                {day.slots.map((slot) => (
                                    <div
                                        key={slot.label}
                                        className="bg-white rounded-lg p-4 text-center shadow-sm"
                                    >
                                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                                            {slot.label}
                                        </div>
                                        <div className="text-sm font-bold text-gray-800 mb-1">
                                            {slot.time}
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            Max {slot.capacity} schools
                                        </span>
                                    </div>
                                ))}

                                {day.slots.length === 1 && (
                                    <div className="bg-white/50 rounded-lg p-4 text-center border border-dashed border-gray-300">
                                        <div className="text-sm text-gray-400">
                                            No afternoon visits
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Note */}
                            <div className="px-4 pb-4">
                                <p className="text-xs text-gray-500 italic text-center">
                                    {day.note}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Weekend Notice ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
                    <div className="lg:col-start-1"></div>
                    <div className="lg:col-span-3">
                        <div className="bg-gray-200 rounded-xl p-6 text-center border-2 border-dashed border-gray-400">
                            <div className="text-lg font-bold text-gray-500 mb-2">
                                Saturday & Sunday
                            </div>
                            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gray-400 text-white mb-3">
                                Closed
                            </span>
                            <p className="text-sm text-gray-500">
                                The Parliament of Kenya is closed on weekends.
                                No visits can be scheduled.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Capacity Rules ── */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        📊 Capacity & Booking Rules
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                            <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                                🟢 Sitting Days (Tue–Thu)
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>• Maximum <strong>4 schools per time slot</strong></li>
                                <li>• Parliament is in session — limited access</li>
                                <li>• Tuesday: morning only</li>
                                <li>• Thursday: afternoon only</li>
                                <li>• Wednesday: full day available</li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                            <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                                🔵 Non-Sitting Days (Mon & Fri)
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>• Maximum <strong>5 schools per time slot</strong></li>
                                <li>• Extended full-day hours</li>
                                <li>• Both morning and afternoon slots available</li>
                                <li>• More flexibility for larger groups</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ── Booking Rules ── */}
                <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        📌 Important Rules
                    </h2>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            Bookings must be made <strong>at least 1 day in advance</strong> and up to <strong>90 days ahead</strong>.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            Each group can bring a <strong>maximum of 50 visitors</strong> per booking.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            Slots are first-come, first-served. Once a slot reaches capacity, it is no longer available.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            You will receive a <strong>confirmation email</strong> with a unique booking code. Keep this for your records.
                        </li>
                    </ul>
                </div>

                {/* ── CTA ── */}
                <div className="text-center">
                    <Link
                        href="/book"
                        className="inline-flex items-center bg-parliament-700 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-parliament-800 transition-colors shadow-lg"
                    >
                        Book a Visit Now →
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
