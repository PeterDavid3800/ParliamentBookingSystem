import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const scheduleData = [
    { day: 'Monday', type: 'Non-Sitting Day', duration: '30 minutes', times: '9:00 AM – 5:00 PM' },
    { day: 'Tuesday', type: 'Sitting Day', duration: '20 minutes', times: '9:00 AM – 5:00 PM' },
    { day: 'Wednesday', type: 'Sitting Day', duration: '20 minutes', times: '9:00 AM – 5:00 PM' },
    { day: 'Thursday', type: 'Sitting Day', duration: '20 minutes', times: '9:00 AM – 5:00 PM' },
    { day: 'Friday', type: 'Non-Sitting Day', duration: '30 minutes', times: '9:00 AM – 5:00 PM' },
];

export default function Schedule() {
    return (
        <PublicLayout>
            <Head title="Visit Schedule — Parliament of Kenya" />
            <section className="bg-gradient-to-r from-parliament-900 to-parliament-700 text-white py-14">
                <div className="max-w-6xl mx-auto px-4"><h1 className="text-3xl md:text-4xl font-bold">Visit Schedule</h1><p className="text-green-100 mt-3 text-lg">Visits are available Monday to Friday, 9:00 AM to 5:00 PM.</p></div>
            </section>
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-5 gap-5 mb-10">
                    {scheduleData.map((day) => (
                        <div key={day.day} className="bg-white rounded-xl border-2 border-green-200 overflow-hidden shadow-sm">
                            <div className="bg-green-50 p-5 text-center border-b border-green-100"><div className="font-bold text-lg text-gray-900">{day.day}</div><span className="inline-block mt-2 text-xs font-semibold bg-parliament-100 text-parliament-800 px-3 py-1 rounded-full">{day.type}</span></div>
                            <div className="p-5 text-center"><div className="text-sm text-gray-500">Visiting hours</div><div className="font-bold text-gray-800 mt-1">{day.times}</div><div className="mt-4 bg-parliament-700 text-white rounded-lg py-2 px-3 text-sm font-semibold">{day.duration} per slot</div></div>
                        </div>
                    ))}
                </div>
                <div className="bg-white border border-green-100 rounded-xl p-7 shadow-sm mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Notes</h2>
                    <p className="text-gray-600 leading-relaxed">Tuesday, Wednesday and Thursday are sitting days and use 20-minute visit slots. Monday and Friday use 30-minute visit slots. Weekends are not available for bookings. Available times are shown live when you select a date.</p>
                </div>
                <div className="text-center"><Link href="/book" className="inline-flex bg-parliament-700 text-white px-9 py-4 rounded-lg font-bold hover:bg-parliament-800">Book a Visit Now →</Link></div>
            </div>
        </PublicLayout>
    );
}
