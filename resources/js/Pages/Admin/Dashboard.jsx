import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ClipboardList, CheckCircle, Calendar, CalendarDays, ArrowRight, TrendingUp } from 'lucide-react';

export default function AdminDashboard({ stats }) {
    const cards = [
        {
            label: 'Total Bookings',
            value: stats.total_bookings,
            Icon: ClipboardList,
            accent: 'border-l-parliament-600',
            iconBg: 'bg-parliament-50',
            iconColor: 'text-parliament-600',
        },
        {
            label: 'Confirmed',
            value: stats.confirmed_bookings,
            Icon: CheckCircle,
            accent: 'border-l-parliament-green-500',
            iconBg: 'bg-parliament-green-50',
            iconColor: 'text-parliament-green-600',
        },
        {
            label: "Today's Visits",
            value: stats.today_bookings,
            Icon: Calendar,
            accent: 'border-l-blue-500',
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            label: 'Upcoming',
            value: stats.upcoming_bookings,
            Icon: CalendarDays,
            accent: 'border-l-amber-500',
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600',
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            {/* Welcome Banner */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        Good day! 👋
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Here's what's happening with visits today.
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-parliament-green-500 animate-pulse" />
                    System operational
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${card.accent} p-5 hover:shadow-md transition-shadow`}
                    >
                        <div className="flex items-center justify-between">
                            <div className={`${card.iconBg} w-10 h-10 rounded-lg flex items-center justify-center`}>
                                <card.Icon className={`w-5 h-5 ${card.iconColor}`} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mt-3">
                            {card.value}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide font-medium">
                            {card.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-gray-900">Recent Bookings</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Latest visit requests across all institutions</p>
                    </div>
                    <Link
                        href="/admin/bookings"
                        className="text-parliament-600 text-sm font-medium hover:text-parliament-700 flex items-center gap-1 transition-colors"
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                                <th className="px-6 py-3.5">Confirmation Code</th>
                                <th className="px-6 py-3.5">Institution</th>
                                <th className="px-6 py-3.5">Date</th>
                                <th className="px-6 py-3.5">Time</th>
                                <th className="px-6 py-3.5">Visitors</th>
                                <th className="px-6 py-3.5">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {stats.recent_bookings?.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-3.5 text-sm font-mono font-medium text-parliament-700">
                                        {b.confirmation_code}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm font-medium text-gray-800">
                                        {b.institution_name}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-gray-500">
                                        {new Date(b.date + 'T00:00:00').toLocaleDateString(
                                            'en-KE',
                                            { month: 'short', day: 'numeric', year: 'numeric' }
                                        )}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-gray-500">
                                        {b.time_range}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-gray-500">
                                        {b.visitor_count}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span
                                            className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${
                                                b.status === 'confirmed'
                                                    ? 'bg-parliament-green-50 text-parliament-green-700 border border-parliament-green-200'
                                                    : 'bg-red-50 text-red-700 border border-red-200'
                                            }`}
                                        >
                                            {b.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {(!stats.recent_bookings || stats.recent_bookings.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="text-gray-300 mb-2">
                                            <ClipboardList className="w-10 h-10 mx-auto" />
                                        </div>
                                        <p className="text-gray-400 text-sm">No bookings yet.</p>
                                        <p className="text-gray-400 text-xs mt-1">New bookings will appear here.</p>
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
