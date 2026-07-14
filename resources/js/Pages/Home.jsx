import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Calendar, School, Users, GraduationCap, Check, CalendarDays, ClipboardList, Landmark } from 'lucide-react';

export default function Home() {
    return (
        <PublicLayout>
            <Head title="Visit Parliament of Kenya" />

            {/* ── Hero ── */}
            <section
                className="relative text-white overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(to bottom right, rgba(11, 44, 82, 0.92), rgba(30, 30, 30, 0.95)), url('https://images.unsplash.com/photo-1590083948734-681d1f59c218?w=1600&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '520px',
                }}
            >
                <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-block bg-parliament-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
                            Official Parliament Visits Portal
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                            Experience the Seat of
                            <span className="block text-parliament-green-300">Kenyan Democracy</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-parliament-100 leading-relaxed max-w-2xl">
                            Bring your school or institution for an educational tour of the Parliament of Kenya.
                            Walk the halls where laws are made and history is written.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/book"
                                className="inline-flex items-center justify-center bg-parliament-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-parliament-green-500 transition-colors shadow-lg hover:shadow-xl"
                            >
                                Book a Visit Now →
                            </Link>
                            <Link
                                href="/schedule"
                                className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                            >
                                View Schedule
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Wave divider */}
                <div className="h-16 bg-gray-50 relative z-10" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
            </section>

            {/* ── Stats Bar ── */}
            <section className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '5', label: 'Visiting Days / Week', Icon: Calendar },
                            { value: '4–5', label: 'Schools per Slot', Icon: School },
                            { value: '50', label: 'Max Visitors / Group', Icon: Users },
                            { value: 'Free', label: 'No Cost to Visit', Icon: GraduationCap },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <stat.Icon className="w-8 h-8 mx-auto mb-2 text-parliament-700" />
                                <div className="text-2xl font-bold text-parliament-700">{stat.value}</div>
                                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── About ── */}
            <section className="py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                About the Visits Programme
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    The Parliament of Kenya welcomes schools, colleges, universities, and other
                                    educational institutions to tour the Parliament Buildings in Nairobi. Our guided
                                    visits give students and educators a firsthand look at how Kenya's legislative
                                    branch operates.
                                </p>
                                <p>
                                    During your visit, you will tour the historic Parliament Chambers, learn about
                                    the law-making process, and understand the role of Members of Parliament in
                                    shaping the nation. It's an invaluable civic education experience.
                                </p>
                                <p>
                                    Visits are <strong>free of charge</strong> and scheduled during parliamentary
                                    sitting days and select non-sitting days to accommodate as many groups as possible.
                                </p>
                            </div>
                        </div>
                        <div className="bg-parliament-50 rounded-2xl p-8 border border-parliament-200">
                            <h3 className="text-xl font-bold text-parliament-800 mb-6 flex items-center gap-2">
                                <Landmark className="w-6 h-6" /> What You'll See
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    'The National Assembly Chamber',
                                    'The Senate Chamber',
                                    'Historical exhibits & portraits',
                                    'The Parliamentary Library',
                                    'Guided tour with expert staff',
                                    'Q&A session (when available)',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-parliament-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── How It Works ── */}
            <section className="bg-gray-100 py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            How to Book Your Visit
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Three simple steps to bring your institution to Parliament
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '1',
                                Icon: CalendarDays,
                                title: 'Pick a Date',
                                desc: 'Choose any weekday (Mon–Fri) up to 90 days in advance. Check available time slots for your preferred day.',
                            },
                            {
                                step: '2',
                                Icon: ClipboardList,
                                title: 'Fill the Form',
                                desc: 'Tell us about your institution, how many visitors to expect, and the reason for your visit.',
                            },
                            {
                                step: '3',
                                Icon: Landmark,
                                title: 'Visit Parliament',
                                desc: 'Receive your confirmation code by email. Arrive on your scheduled date and enjoy the tour!',
                            },
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow relative"
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-parliament-700 text-white flex items-center justify-center font-bold text-lg">
                                    {item.step}
                                </div>
                                <item.Icon className="w-12 h-12 mx-auto mb-4 mt-2 text-parliament-700" />
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Weekly Schedule Glance ── */}
            <section className="py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Visit Schedule at a Glance
                        </h2>
                        <p className="text-gray-600">Available time slots for each day of the week</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { day: 'Monday', type: 'Non-Sitting', slots: '8:00 AM – 5:30 PM', cap: '5 per slot', color: 'border-blue-400 bg-blue-50' },
                            { day: 'Tuesday', type: 'Sitting Day', slots: '8:00 – 11:00 AM', cap: '4 per slot', color: 'border-green-500 bg-green-50' },
                            { day: 'Wednesday', type: 'Sitting Day', slots: '8:00 AM – 5:30 PM', cap: '4 per slot', color: 'border-green-500 bg-green-50' },
                            { day: 'Thursday', type: 'Sitting Day', slots: '2:30 – 5:30 PM', cap: '4 per slot', color: 'border-green-500 bg-green-50' },
                            { day: 'Friday', type: 'Non-Sitting', slots: '8:00 AM – 5:30 PM', cap: '5 per slot', color: 'border-blue-400 bg-blue-50' },
                        ].map((d) => (
                            <div
                                key={d.day}
                                className={`rounded-xl border-2 ${d.color} p-5 text-center`}
                            >
                                <div className="text-sm font-bold text-gray-800 mb-1">{d.day}</div>
                                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${
                                    d.type === 'Sitting Day'
                                        ? 'bg-green-200 text-green-800'
                                        : 'bg-blue-200 text-blue-800'
                                }`}>
                                    {d.type}
                                </span>
                                <div className="text-sm font-semibold text-gray-700 mb-1">{d.slots}</div>
                                <div className="text-xs text-gray-500">{d.cap}</div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-400">Weekends: Parliament is closed</p>
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            href="/schedule"
                            className="inline-flex items-center text-parliament-700 font-medium hover:underline"
                        >
                            View Full Schedule & Details →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="bg-gradient-to-r from-parliament-800 to-parliament-950 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Bring Your Institution?
                    </h2>
                    <p className="text-parliament-200 text-lg mb-8 max-w-xl mx-auto">
                        Book your visit today. It's free, educational, and an experience your students will never forget.
                    </p>
                    <Link
                        href="/book"
                        className="inline-flex items-center bg-parliament-green-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-parliament-green-500 transition-colors shadow-lg"
                    >
                        Book a Visit Now →
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
