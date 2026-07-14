import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Terms() {
    return (
        <PublicLayout>
            <Head title="Terms & Conditions — Parliament of Kenya" />

            {/* ── Page Header ── */}
            <section className="bg-gradient-to-r from-parliament-800 to-parliament-900 text-white py-14">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold">Terms & Conditions</h1>
                    <p className="text-parliament-200 mt-3 text-lg">
                        Guidelines for visiting the Parliament of Kenya
                    </p>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">1. Introduction</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            These Terms and Conditions govern all visits to the Parliament of Kenya Buildings,
                            Nairobi. By submitting a booking request through this portal, you acknowledge that
                            you have read, understood, and agree to be bound by these terms. The Parliament of
                            Kenya reserves the right to amend these terms at any time without prior notice.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">2. Eligibility</h2>
                        <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                Visits are open to <strong>schools, colleges, universities, and registered educational institutions</strong>.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                All visitors must carry <strong>valid identification</strong> — a National ID card, Passport, or student ID.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                The maximum group size per booking is <strong>50 visitors</strong>. Larger groups must make multiple bookings.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                Bookings must be made by an <strong>authorised representative</strong> (teacher, lecturer, or administrator) of the visiting institution.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">3. Booking & Scheduling</h2>
                        <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                Bookings must be made <strong>at least 1 day in advance</strong> and no more than <strong>90 days ahead</strong>.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                Visits are only available on <strong>weekdays (Monday–Friday)</strong>. Weekends and public holidays are excluded.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                Time slots are <strong>first-come, first-served</strong>. Once a slot reaches capacity, it will no longer be available.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                The Parliament of Kenya reserves the right to <strong>cancel or reschedule</strong> any visit at its sole discretion, including for security or parliamentary business reasons.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">4. Confirmation & Communication</h2>
                        <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                Upon successful submission, you will receive a <strong>confirmation email</strong> with a unique booking code.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                The booking code must be <strong>retained and presented</strong> on the day of the visit — either printed or digitally.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                All communication regarding your booking will be sent to the email address provided during registration.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">5. Conduct & Dress Code</h2>
                        <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                The Parliament of Kenya is a <strong>formal government building</strong>. All visitors must dress decently and respectfully.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                The following are <strong>not permitted</strong>: shorts, ripped jeans, sleeveless tops, open shoes, and clothing with offensive messaging.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                Visitors must <strong>follow the instructions</strong> of parliamentary security and tour guides at all times.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                <strong>Disruptive behaviour</strong> will result in immediate removal from the premises without refund or compensation.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">6. Security Screening</h2>
                        <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                All visitors must pass through <strong>security screening</strong> upon entry.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                <strong>Prohibited items</strong> include: weapons, large bags, recording devices (except phones), and any item deemed a security risk by parliamentary staff.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                The Parliament of Kenya is <strong>not liable</strong> for any personal belongings brought onto the premises.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">7. Photography & Recording</h2>
                        <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                Photography is permitted in <strong>designated areas only</strong>.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                <strong>Flash photography and video recording</strong> may be restricted in certain chambers and galleries.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                Any photographs or recordings taken during the visit <strong>may not be used for commercial purposes</strong> without express written permission.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">8. Cancellations & Amendments</h2>
                        <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                To cancel or amend a booking, contact the Parliament Visits Office at <strong>visits@parliament.go.ke</strong> or call <strong>+254 20 222 1291</strong>.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                Cancellations and amendments are subject to <strong>availability and parliamentary schedule</strong>.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-parliament-700 font-bold mt-0.5">•</span>
                                The Parliament of Kenya <strong>does not charge any fees</strong> for cancellations or rescheduling.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">9. Liability</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            The Parliament of Kenya, its staff, and representatives shall not be held liable for
                            any injury, loss, or damage sustained by visitors during the course of the visit,
                            except where such liability cannot be excluded under Kenyan law. The visiting
                            institution assumes responsibility for the conduct and safety of all members of
                            its group.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">10. Data & Privacy</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Personal information collected through this portal is used solely for the purpose
                            of processing and managing your visit booking. We do not share your data with
                            third parties except as required by law. By submitting a booking, you consent
                            to the collection and processing of your data in accordance with the
                            Data Protection Act, 2019 of Kenya.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">11. Governing Law</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            These Terms and Conditions are governed by and construed in accordance with the
                            laws of the Republic of Kenya. Any disputes arising from these terms shall be
                            subject to the exclusive jurisdiction of the Kenyan courts.
                        </p>
                    </div>

                    <div className="pt-2">
                        <p className="text-xs text-gray-400">
                            Last updated: July 2026
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
