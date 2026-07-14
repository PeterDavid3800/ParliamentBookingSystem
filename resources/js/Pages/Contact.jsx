import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Mail, Phone, MapPin, Clock, Landmark } from 'lucide-react';

export default function Contact() {
    return (
        <PublicLayout>
            <Head title="Contact — Parliament of Kenya" />

            {/* ── Page Header ── */}
            <section className="bg-gradient-to-r from-parliament-800 to-parliament-900 text-white py-14">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
                    <p className="text-parliament-200 mt-3 text-lg">
                        Get in touch with the Parliament Visits Office
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* ── Contact Cards ── */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Email */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                <Mail className="w-10 h-10 text-parliament-700 mb-4" />
                                <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                                <p className="text-gray-600 text-sm mb-1">General inquiries & bookings</p>
                                <a
                                    href="mailto:visits@parliament.go.ke"
                                    className="text-parliament-700 font-medium text-sm hover:underline"
                                >
                                    visits@parliament.go.ke
                                </a>
                            </div>

                            {/* Phone */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                <Phone className="w-10 h-10 text-parliament-700 mb-4" />
                                <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
                                <p className="text-gray-600 text-sm mb-1">Call us during office hours</p>
                                <a
                                    href="tel:+254202221291"
                                    className="text-parliament-700 font-medium text-sm hover:underline"
                                >
                                    +254 20 222 1291
                                </a>
                            </div>

                            {/* Location */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                <MapPin className="w-10 h-10 text-parliament-700 mb-4" />
                                <h3 className="font-bold text-gray-800 mb-2">Location</h3>
                                <p className="text-gray-600 text-sm">
                                    Parliament Buildings
                                    <br />
                                    Parliament Road
                                    <br />
                                    Nairobi, Kenya
                                </p>
                            </div>

                            {/* Office Hours */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                <Clock className="w-10 h-10 text-parliament-700 mb-4" />
                                <h3 className="font-bold text-gray-800 mb-2">Office Hours</h3>
                                <div className="text-gray-600 text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span>Monday – Thursday</span>
                                        <span className="font-medium">8:00 AM – 5:30 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Friday</span>
                                        <span className="font-medium">8:00 AM – 5:30 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday – Sunday</span>
                                        <span className="font-medium text-gray-400">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Contact Form ── */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                Send Us a Message
                            </h2>
                            <p className="text-gray-500 text-sm mb-6">
                                Fill out the form below and we'll get back to you within 1–2 business days.
                            </p>

                            <form
                                action="mailto:visits@parliament.go.ke"
                                method="get"
                                encType="text/plain"
                                className="space-y-5"
                            >
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                                            placeholder="Full name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                                            placeholder="email@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Institution / School
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                                        placeholder="Name of your institution (optional)"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        name="body"
                                        rows={5}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none resize-none"
                                        placeholder="Tell us how we can help..."
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-parliament-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-parliament-800 transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* ── Sidebar ── */}
                    <div className="space-y-6">
                        <div className="bg-parliament-50 rounded-xl border border-parliament-200 p-6">
                            <h3 className="font-bold text-parliament-800 mb-3 flex items-center gap-2">
                                <Landmark className="w-5 h-5" /> Quick Links
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="/book" className="text-parliament-700 hover:underline">
                                        → Book a Visit
                                    </a>
                                </li>
                                <li>
                                    <a href="/schedule" className="text-parliament-700 hover:underline">
                                        → View Schedule
                                    </a>
                                </li>
                                <li>
                                    <a href="/faq" className="text-parliament-700 hover:underline">
                                        → Frequently Asked Questions
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
                            <h3 className="font-bold text-yellow-800 mb-3">
                                ⚠️ Important Note
                            </h3>
                            <p className="text-sm text-yellow-700 leading-relaxed">
                                For booking requests, please use the{' '}
                                <a href="/book" className="font-medium underline">
                                    online booking form
                                </a>{' '}
                                for faster processing. The contact form above is for general inquiries only.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
