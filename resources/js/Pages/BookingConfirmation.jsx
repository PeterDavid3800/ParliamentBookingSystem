import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { CircleCheck, Info, Mail } from 'lucide-react';

export default function BookingConfirmation({ booking }) {
    return (
        <PublicLayout>
            <Head title={`Booking Confirmed — ${booking.confirmation_code}`} />

            <div className="max-w-lg mx-auto mt-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Success Banner */}
                    <div className="bg-parliament-700 text-white p-8 text-center">
                        <CircleCheck className="w-16 h-16 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
                        <p className="text-parliament-100 mt-2">
                            Your visit to the Parliament of Kenya has been scheduled.
                        </p>
                    </div>

                    {/* Confirmation Code */}
                    <div className="px-8 py-6 border-b border-gray-100">
                        <p className="text-sm text-gray-500 mb-2">Confirmation Code</p>
                        <p className="text-3xl font-mono font-bold text-parliament-800 tracking-wider">
                            {booking.confirmation_code}
                        </p>
                    </div>

                    {/* Details */}
                    <div className="px-8 py-6 space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                Booking Details
                            </h2>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Institution</span>
                                    <span className="font-medium text-gray-800">
                                        {booking.institution_name}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Contact Person</span>
                                    <span className="font-medium text-gray-800">
                                        {booking.contact_person}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Date</span>
                                    <span className="font-medium text-gray-800">
                                        {new Date(booking.date + 'T00:00:00').toLocaleDateString(
                                            'en-KE',
                                            {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            }
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Time</span>
                                    <span className="font-medium text-gray-800">
                                        {booking.time_range}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Visitors</span>
                                    <span className="font-medium text-gray-800">
                                        {booking.visitor_count}
                                    </span>
                                </div>
                                {booking.documents?.length > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Documents</span>
                                        <span className="font-medium text-gray-800">
                                            {booking.documents.length} file(s)
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Email Notice */}
                    <div className="bg-blue-50 border-t border-blue-100 px-8 py-4">
                        <p className="text-blue-800 text-sm flex items-center gap-2">
                            <Mail className="w-4 h-4" /> A confirmation email has been sent to{' '}
                            <strong>{booking.contact_email}</strong>
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex gap-4">
                            <Link
                                href="/"
                                className="flex-1 text-center bg-parliament-700 text-white px-4 py-3 rounded-lg font-medium hover:bg-parliament-800 transition-colors"
                            >
                                Book Another Visit
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Important Notes */}
                <div className="mt-6 bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" /> Important Reminders
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Arrive 15 minutes before your scheduled time.</li>
                        <li>• All visitors must carry valid identification.</li>
                        <li>• Bags and electronics may be subject to screening.</li>
                        <li>• If you need to cancel, please contact us as soon as possible.</li>
                    </ul>
                </div>
            </div>
        </PublicLayout>
    );
}
