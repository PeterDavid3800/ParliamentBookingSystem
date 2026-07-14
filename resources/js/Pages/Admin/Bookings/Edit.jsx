import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save } from 'lucide-react';

export default function BookingsEdit({ booking }) {
    const { data, setData, put, processing, errors } = useForm({
        institution_name: booking.institution_name,
        contact_person: booking.contact_person,
        contact_email: booking.contact_email,
        contact_phone: booking.contact_phone,
        reason_for_visit: booking.reason_for_visit,
        visitor_count: booking.visitor_count,
        status: booking.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/bookings/${booking.id}`);
    };

    return (
        <AdminLayout title={`Edit Booking — ${booking.confirmation_code}`}>
            <Head title={`Edit Booking ${booking.confirmation_code}`} />

            <div className="max-w-2xl">
                {/* Breadcrumb */}
                <Link
                    href={`/admin/bookings/${booking.id}`}
                    className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-flex items-center gap-1.5 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Booking
                </Link>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900">Edit Booking</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Updating booking <span className="font-mono text-parliament-700 font-medium">{booking.confirmation_code}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Section: Institution */}
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Institution Information</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Institution Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.institution_name}
                                        onChange={(e) => setData('institution_name', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none transition-shadow"
                                        required
                                    />
                                    {errors.institution_name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.institution_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Contact Person
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact_person}
                                        onChange={(e) => setData('contact_person', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none transition-shadow"
                                        required
                                    />
                                    {errors.contact_person && (
                                        <p className="text-red-500 text-xs mt-1">{errors.contact_person}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section: Contact */}
                        <div className="pt-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Contact Details</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none transition-shadow"
                                        required
                                    />
                                    {errors.contact_email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.contact_email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none transition-shadow"
                                        required
                                    />
                                    {errors.contact_phone && (
                                        <p className="text-red-500 text-xs mt-1">{errors.contact_phone}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section: Visit Details */}
                        <div className="pt-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Visit Details</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Number of Visitors
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={data.visitor_count}
                                        onChange={(e) => setData('visitor_count', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none transition-shadow"
                                        required
                                    />
                                    {errors.visitor_count && (
                                        <p className="text-red-500 text-xs mt-1">{errors.visitor_count}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Status
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none bg-white"
                                    >
                                        <option value="confirmed">Confirmed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section: Reason */}
                        <div className="pt-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Additional Information</p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Reason for Visit
                                </label>
                                <textarea
                                    value={data.reason_for_visit}
                                    onChange={(e) => setData('reason_for_visit', e.target.value)}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none resize-none transition-shadow"
                                    required
                                />
                                {errors.reason_for_visit && (
                                    <p className="text-red-500 text-xs mt-1">{errors.reason_for_visit}</p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 bg-parliament-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-parliament-800 disabled:opacity-50 transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                            <Link
                                href={`/admin/bookings/${booking.id}`}
                                className="text-gray-500 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-gray-700 transition-colors"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
