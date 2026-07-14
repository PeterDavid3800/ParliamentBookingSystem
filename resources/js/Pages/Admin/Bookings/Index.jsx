import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Download, Search, Filter, X, FileDown } from 'lucide-react';

export default function BookingsIndex({ bookings, filters }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        status: filters.status || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    const hasActiveFilters = data.search || data.status || data.date_from || data.date_to;

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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
                <form onSubmit={handleFilter}>
                    <div className="flex flex-col lg:flex-row gap-3">
                        {/* Search */}
                        <div className="relative flex-1 min-w-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                placeholder="Search institution, contact, or code..."
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none transition-shadow"
                            />
                        </div>

                        {/* Status */}
                        <div className="relative w-full lg:w-44">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none appearance-none bg-white"
                            >
                                <option value="">All Statuses</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Date From */}
                        <input
                            type="date"
                            value={data.date_from}
                            onChange={(e) => setData('date_from', e.target.value)}
                            className="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                        />

                        {/* Date To */}
                        <input
                            type="date"
                            value={data.date_to}
                            onChange={(e) => setData('date_to', e.target.value)}
                            className="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                        />

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-parliament-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-parliament-800 transition-colors flex-shrink-0"
                            >
                                Apply Filters
                            </button>
                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="text-gray-500 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-gray-700 transition-colors flex items-center gap-1.5 flex-shrink-0"
                                >
                                    <X className="w-3.5 h-3.5" /> Clear
                                </button>
                            )}
                            <Link
                                href="/admin/bookings/export"
                                className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-1.5 flex-shrink-0"
                            >
                                <FileDown className="w-4 h-4" /> Export
                            </Link>
                        </div>
                    </div>
                </form>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                                <th className="px-6 py-3.5">Code</th>
                                <th className="px-6 py-3.5">Institution</th>
                                <th className="px-6 py-3.5">Contact</th>
                                <th className="px-6 py-3.5">Date</th>
                                <th className="px-6 py-3.5">Time</th>
                                <th className="px-6 py-3.5">Visitors</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {bookings.data?.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-3.5 text-sm font-mono font-medium text-parliament-700">
                                        {b.confirmation_code}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm font-medium text-gray-900">
                                        {b.institution_name}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-gray-500">
                                        {b.contact_person}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-gray-500">
                                        {new Date(b.date + 'T00:00:00').toLocaleDateString('en-KE', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-gray-500">
                                        {b.time_range}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-gray-500">
                                        {b.visitor_count}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span
                                            className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full border ${
                                                b.status === 'confirmed'
                                                    ? 'bg-parliament-green-50 text-parliament-green-700 border-parliament-green-200'
                                                    : 'bg-red-50 text-red-700 border-red-200'
                                            }`}
                                        >
                                            {b.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 text-right">
                                        <Link
                                            href={`/admin/bookings/${b.id}`}
                                            className="text-parliament-600 text-sm font-medium hover:text-parliament-700 transition-colors"
                                        >
                                            View →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {(!bookings.data || bookings.data.length === 0) && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-14 text-center">
                                        <div className="text-gray-200 mb-3">
                                            <Search className="w-10 h-10 mx-auto" />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium">No bookings found</p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {hasActiveFilters
                                                ? 'Try adjusting your filters.'
                                                : 'New bookings will appear here.'}
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {bookings.links && bookings.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs text-gray-400">
                            Showing <span className="font-medium text-gray-600">{bookings.from}</span>–<span className="font-medium text-gray-600">{bookings.to}</span> of{' '}
                            <span className="font-medium text-gray-600">{bookings.total}</span> results
                        </p>
                        <div className="flex gap-1">
                            {bookings.links
                                .filter((l) => l.url)
                                .map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        preserveState
                                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                            link.active
                                                ? 'bg-parliament-700 text-white shadow-sm'
                                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
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
