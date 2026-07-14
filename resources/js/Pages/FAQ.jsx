import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: 'How much does a visit cost?',
        a: 'Visits to the Parliament of Kenya are completely free. There is no charge for educational institutions or any approved visiting group.',
    },
    {
        q: 'What is the maximum group size?',
        a: 'The maximum number of visitors per booking is 50 people. If you have a larger group, you will need to make multiple bookings across different time slots or days.',
    },
    {
        q: 'What should we bring on the day of the visit?',
        a: 'All visitors must carry valid identification — a National ID card or Passport. Students may use their school ID. Bring a printed or digital copy of your confirmation email with the booking code.',
    },
    {
        q: 'Is there a dress code?',
        a: 'Yes. Visitors are expected to dress decently and respectfully. Avoid shorts, ripped jeans, sleeveless tops, and open shoes. This is a formal government building.',
    },
    {
        q: 'Can we cancel or reschedule?',
        a: 'If you need to cancel or reschedule, please contact the Parliament Visits Office as soon as possible at visits@parliament.go.ke or call +254 20 222 1291. We will do our best to accommodate changes.',
    },
    {
        q: 'Are there security checks?',
        a: 'Yes. All visitors must pass through security screening upon entry. Large bags, weapons, and certain electronic devices are not permitted. Security personnel will guide you through the process.',
    },
    {
        q: 'Is photography allowed inside Parliament?',
        a: 'Photography is allowed in designated areas. However, flash photography and video recording may be restricted in certain chambers. Your guide will advise you on the day.',
    },
    {
        q: 'How early should we arrive?',
        a: 'Please arrive at least 15 minutes before your scheduled time. This allows enough time for security screening and registration. Late arrivals may be denied entry.',
    },
    {
        q: 'Can we visit on weekends?',
        a: 'No. The Parliament of Kenya is closed on Saturdays, Sundays, and public holidays. Visits can only be scheduled on weekdays (Monday through Friday).',
    },
    {
        q: 'Is there parking for buses?',
        a: 'Yes, there is parking available for buses and other vehicles near the Parliament Buildings. Your guide will direct you to the designated parking area upon arrival.',
    },
    {
        q: 'How long does the tour last?',
        a: 'A typical guided tour lasts between 1 to 2 hours depending on the group size and the areas accessible on the day. This includes the chambers, library, and exhibits.',
    },
    {
        q: 'Can we interact with Members of Parliament?',
        a: 'While we cannot guarantee access to MPs, there are sometimes opportunities for Q&A sessions with parliamentary staff or, when available, a Member of Parliament. This depends on the parliamentary schedule.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <PublicLayout>
            <Head title="FAQ — Parliament of Kenya" />

            {/* ── Page Header ── */}
            <section className="bg-gradient-to-r from-parliament-800 to-parliament-900 text-white py-14">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-parliament-200 mt-3 text-lg">
                        Everything you need to know about visiting Parliament
                    </p>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* ── Accordion ── */}
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                        >
                            <button
                                onClick={() => toggle(i)}
                                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-800 pr-4">
                                    {faq.q}
                                </span>
                                <span
                                    className={`flex-shrink-0 transition-transform duration-300 ${
                                        openIndex === i
                                            ? 'rotate-180 text-parliament-700'
                                            : 'text-gray-400'
                                    }`}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'
                                }`}
                            >
                                <p className="px-6 text-gray-600 leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Still Have Questions ── */}
                <div className="mt-12 bg-parliament-50 rounded-xl border border-parliament-200 p-8 text-center">
                    <h2 className="text-xl font-bold text-parliament-800 mb-3">
                        Still Have Questions?
                    </h2>
                    <p className="text-parliament-700 mb-6">
                        We're here to help. Reach out and we'll get back to you as soon as possible.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center bg-parliament-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-parliament-800 transition-colors"
                    >
                        Contact Us →
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
