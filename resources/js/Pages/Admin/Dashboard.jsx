import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ClipboardList, CheckCircle, Calendar, CalendarDays, ArrowRight } from 'lucide-react';

export default function AdminDashboard({ stats }) {
    const cards = [
        {
            label: 'Total Bookings',
            value: stats.total_bookings,
            Icon: ClipboardList,
            color: 'bg-blue-500',
        },
        {
            label: 'Confirmed',
            value: stats.confirmed_bookings,
            Icon: CheckCircle,
            color: 'bg-green-500',
        },
        {
            label: "Today's Visits",
            value: stats.today_bookings,
            Icon: Calendar,
            color: 'bg-purple-500',
        },
        {
            label: 'Upcoming',
            value: stats.upcoming_bookings,
            Icon: CalendarDays,
            color: 'bg-orange-500',
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white rounded-xl shadow-sm p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{card.label}</p>
                                <p className="text-3xl font-bold text-gray-800 mt-1">
                                    {card.value}
                                </p>
                            </div>
                            <div
                                className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                            >
                                <card.Icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-800">Recent Bookings</h2>
                    <Link
                        href="/admin/bookings"
                        className="text-parliament-700 text-sm font-medium hover:underline flex items-center gap-1"
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-3">Code</th>
                                <th className="px-6 py-3">Institution</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Visitors</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stats.recent_bookings?.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 text-sm font-mono text-parliament-700">
                                        {b.confirmation_code}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-800">
                                        {b.institution_name}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-600">
                                        {new Date(b.date + 'T00:00:00').toLocaleDateString(
                                            'en-KE',
                                            { month: 'short', day: 'numeric', year: 'numeric' }
                                        )}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-600">
                                        {b.time_range}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-600">
                                        {b.visitor_count}
                                    </td>
                                    <td className="px-6 py-3">
                                        <span
                                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                b.status === 'confirmed'
                                                    ? 'bg-green-100 text-parliament-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {b.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {(!stats.recent_bookings ||
                                stats.recent_bookings.length === 0) && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center text-gray-400 text-sm"
                                    >
                                        No bookings yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
