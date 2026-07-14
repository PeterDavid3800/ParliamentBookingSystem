import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Download } from 'lucide-react';

export default function BookingsIndex({ bookings, filters }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        status: filters.status || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get('/admin/bookings', { preserveState: true });
    };

    const handleClear = () => {
        setData({ search: '', status: '', date_from: '', date_to: '' });
        get('/admin/bookings', { preserveState: true });
    };

    return (
        <AdminLayout title="Bookings">
            <Head title="Bookings — Admin" />

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <form
                    onSubmit={handleFilter}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4"
                >
                    <input
                        type="text"
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                        placeholder="Search institution, contact, or code..."
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                    />
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                    >
                        <option value="">All Statuses</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <input
                        type="date"
                        value={data.date_from}
                        onChange={(e) => setData('date_from', e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                        placeholder="From"
                    />
                    <input
                        type="date"
                        value={data.date_to}
                        onChange={(e) => setData('date_to', e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                        placeholder="To"
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-parliament-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-parliament-800 transition-colors"
                        >
                            Filter
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                        >
                            Clear
                        </button>
                        <Link
                            href="/admin/bookings/export"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
                        >
                            <Download className="w-4 h-4" /> CSV
                        </Link>
                    </div>
                </form>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                                <th className="px-6 py-3">Code</th>
                                <th className="px-6 py-3">Institution</th>
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Visitors</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookings.data?.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 text-sm font-mono text-parliament-700">
                                        {b.confirmation_code}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-800 font-medium">
                                        {b.institution_name}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-600">
                                        {b.contact_person}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-600">
                                        {new Date(
                                            b.date + 'T00:00:00'
                                        ).toLocaleDateString('en-KE', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
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
                                    <td className="px-6 py-3">
                                        <Link
                                            href={`/admin/bookings/${b.id}`}
                                            className="text-parliament-700 text-sm font-medium hover:underline"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {(!bookings.data || bookings.data.length === 0) && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-6 py-12 text-center text-gray-400"
                                    >
                                        No bookings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {bookings.links && bookings.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing {bookings.from}–{bookings.to} of{' '}
                            {bookings.total} results
                        </p>
                        <div className="flex gap-1">
                            {bookings.links
                                .filter((l) => l.url)
                                .map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        preserveState
                                        className={`px-3 py-1 rounded text-sm ${
                                            link.active
                                                ? 'bg-parliament-700 text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
