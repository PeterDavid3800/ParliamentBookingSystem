import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, FileText, Mail, Phone, Users, Calendar, Clock, Pencil, XCircle } from 'lucide-react';

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
                {/* Breadcrumb & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <Link
                        href="/admin/bookings"
                        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1.5 transition-colors w-fit"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Bookings
                    </Link>
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/bookings/${booking.id}/edit`}
                            className="inline-flex items-center gap-1.5 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            <Pencil className="w-3.5 h-3.5" /> Edit
                        </Link>
                        {booking.status === 'confirmed' && (
                            <button
                                onClick={handleCancel}
                                disabled={processing}
                                className="inline-flex items-center gap-1.5 bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 disabled:opacity-50 transition-colors"
                            >
                                <XCircle className="w-3.5 h-3.5" /> Cancel
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Booking Details</p>
                            <h2 className="text-xl font-bold text-gray-900">
                                {booking.institution_name}
                            </h2>
                            <p className="text-parliament-700 font-mono text-base font-medium mt-1">
                                {booking.confirmation_code}
                            </p>
                        </div>
                        <span
                            className={`inline-flex items-center text-sm font-medium px-4 py-2 rounded-full border w-fit ${
                                booking.status === 'confirmed'
                                    ? 'bg-parliament-green-50 text-parliament-green-700 border-parliament-green-200'
                                    : 'bg-red-50 text-red-700 border-red-200'
                            }`}
                        >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                    </div>

                    {/* Detail Fields */}
                    <div className="px-8 py-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                            <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Date</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(booking.date + 'T00:00:00').toLocaleDateString('en-KE', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Time Slot</p>
                                    <p className="text-sm font-medium text-gray-900">{booking.time_range}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Users className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Contact Person</p>
                                    <p className="text-sm font-medium text-gray-900">{booking.contact_person}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Users className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Group Size</p>
                                    <p className="text-sm font-medium text-gray-900">{booking.visitor_count} visitors</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Email</p>
                                    <p className="text-sm font-medium text-gray-900">{booking.contact_email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Phone</p>
                                    <p className="text-sm font-medium text-gray-900">{booking.contact_phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Reason for Visit</p>
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg p-4">
                                {booking.reason_for_visit}
                            </p>
                        </div>

                        {/* Documents */}
                        {booking.documents && booking.documents.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                                    Supporting Documents ({booking.documents.length})
                                </p>
                                <div className="space-y-2">
                                    {booking.documents.map((doc) => (
                                        <a
                                            key={doc.id}
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-parliament-300 hover:bg-parliament-50/50 transition-colors group"
                                        >
                                            <FileText className="w-5 h-5 text-gray-400 group-hover:text-parliament-600 transition-colors" />
                                            <span className="text-sm text-gray-700 group-hover:text-parliament-700 font-medium">
                                                {doc.original_name}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <span>
                            Created {new Date(booking.created_at).toLocaleDateString('en-KE', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </span>
                        <span>ID: {booking.id}</span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
