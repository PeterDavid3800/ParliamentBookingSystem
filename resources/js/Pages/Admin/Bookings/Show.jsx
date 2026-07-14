import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, FileText } from 'lucide-react';

export default function BookingsShow({ booking }) {
    const { delete: destroy, processing } = useForm();

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            destroy(`/admin/bookings/${booking.id}`);
        }
    };

    return (
        <AdminLayout title={`Booking — ${booking.confirmation_code}`}>
            <Head title={`Booking ${booking.confirmation_code}`} />

            <div className="max-w-3xl">
                {/* Header Actions */}
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/admin/bookings"
                        className="text-gray-600 text-sm hover:underline flex items-center gap-1"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Bookings
                    </Link>
                    <div className="flex gap-3">
                        <Link
                            href={`/admin/bookings/${booking.id}/edit`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            Edit
                        </Link>
                        {booking.status === 'confirmed' && (
                            <button
                                onClick={handleCancel}
                                disabled={processing}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                                Cancel Booking
                            </button>
                        )}
                    </div>
                </div>

                {/* Booking Detail Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {booking.institution_name}
                            </h2>
                            <p className="text-parliament-700 font-mono text-lg mt-1">
                                {booking.confirmation_code}
                            </p>
                        </div>
                        <span
                            className={`text-sm font-medium px-4 py-2 rounded-full ${
                                booking.status === 'confirmed'
                                    ? 'bg-green-100 text-parliament-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                        </span>
                    </div>

                    <div className="px-8 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-gray-500">
                                    Date
                                </span>
                                <p className="font-medium text-gray-800">
                                    {new Date(
                                        booking.date + 'T00:00:00'
                                    ).toLocaleDateString('en-KE', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">
                                    Time Slot
                                </span>
                                <p className="font-medium text-gray-800">
                                    {booking.time_range}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">
                                    Contact Person
                                </span>
                                <p className="font-medium text-gray-800">
                                    {booking.contact_person}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">
                                    Visitors
                                </span>
                                <p className="font-medium text-gray-800">
                                    {booking.visitor_count}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">
                                    Email
                                </span>
                                <p className="font-medium text-gray-800">
                                    {booking.contact_email}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">
                                    Phone
                                </span>
                                <p className="font-medium text-gray-800">
                                    {booking.contact_phone}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <span className="text-sm text-gray-500">
                                Reason for Visit
                            </span>
                            <p className="mt-1 text-gray-800 whitespace-pre-wrap">
                                {booking.reason_for_visit}
                            </p>
                        </div>

                        {/* Documents */}
                        {booking.documents && booking.documents.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <span className="text-sm text-gray-500 mb-2 block">
                                    Supporting Documents
                                </span>
                                <ul className="space-y-2">
                                    {booking.documents.map((doc) => (
                                        <li key={doc.id}>
                                            <a
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-parliament-700 hover:underline text-sm"
                                            >
                                                <FileText className="w-4 h-4" /> {doc.original_name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-sm text-gray-500">
                        Created:{' '}
                        {new Date(booking.created_at).toLocaleString('en-KE')}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
