import { Head, useForm } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { CircleCheck, ShieldCheck } from 'lucide-react';
import { counties, kenyaLocations } from '@/Data/kenyaLocations';
import { visitTermsSections } from '@/Data/visitTerms';

const categories = [
    'Primary',
    'Junior Secondary',
    'Senior Secondary',
    'Colleges',
    'TVETs',
    'Universities',
    'Others',
];

export default function BookingForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        time_slot_id: '',
        institution_name: '',
        institution_category: '',
        contact_person: '',
        contact_email: '',
        contact_phone: '',
        reason_for_visit: '',
        learner_count: '',
        accompanying_persons: '0',
        has_disability: false,
        disability_nature: '',
        county: '',
        constituency: '',
        consent_accepted: false,
        documents: [],
    });

    const [showTermsModal, setShowTermsModal] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [slots, setSlots] = useState([]);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [slotsError, setSlotsError] = useState('');

    const minDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const isWeekend = (dateStr) => {
        const d = new Date(dateStr + 'T00:00:00');
        return d.getDay() === 0 || d.getDay() === 6;
    };

    const fetchSlots = useCallback(async (date) => {
        if (!date || isWeekend(date)) {
            setSlots([]);
            setSlotsError('Visits are available Monday to Friday, from 9:00 AM to 5:00 PM.');
            return;
        }

        setSlotsLoading(true);
        setSlotsError('');

        try {
            const res = await fetch(`/api/time-slots?date=${date}`);
            const json = await res.json();
            setSlots(json.slots || []);
            if (json.message && (!json.slots || json.slots.length === 0)) {
                setSlotsError(json.message);
            }
        } catch {
            setSlotsError('Failed to load available time slots. Please try again.');
        } finally {
            setSlotsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (selectedDate) fetchSlots(selectedDate);
    }, [selectedDate, fetchSlots]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setData('time_slot_id', '');
        setSlots([]);
    };

    const handleCountyChange = (e) => {
        setData({ ...data, county: e.target.value, constituency: '' });
    };

    const handleDisabilityChange = (e) => {
        const hasDisability = e.target.value === 'yes';
        setData({ ...data, has_disability: hasDisability, disability_nature: hasDisability ? data.disability_nature : '' });
    };

    const submitBooking = () => {
        const options = {
            onError: () => {
                setShowTermsModal(false);
                setStep(2);
            },
        };
        if (data.documents?.length) options.forceFormData = true;
        post('/bookings', options);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setData('consent_accepted', false);
        setShowTermsModal(true);
    };

    const confirmTermsAndSubmit = () => {
        if (!data.consent_accepted || processing) return;
        submitBooking();
    };

    const closeTermsModal = () => {
        if (processing) return;
        setData('consent_accepted', false);
        setShowTermsModal(false);
    };

    const nextStep = () => {
        if (step === 1 && !data.time_slot_id) return;
        setStep((current) => Math.min(3, current + 1));
    };

    const prevStep = () => setStep((current) => Math.max(1, current - 1));

    const formatDate = (dateStr) => new Date(dateStr + 'T00:00:00').toLocaleDateString('en-KE', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <PublicLayout>
            <Head title="Book a Visit — Parliament of Kenya" />
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-center mb-10">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${s <= step ? 'bg-parliament-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {s < step ? '✓' : s}
                            </div>
                            {s < 3 && <div className={`w-16 h-1 mx-2 ${s < step ? 'bg-parliament-700' : 'bg-gray-200'}`} />}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Select Date & Time</h2>
                            <p className="text-sm text-gray-500 mb-6">Bookings must be made at least 7 days in advance. Visits run Monday–Friday, 9:00 AM–5:00 PM. Tuesday–Thursday use 20-minute slots; Monday and Friday use 30-minute slots.</p>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Visit Date *</label>
                            <input type="date" value={selectedDate} onChange={handleDateChange} min={minDate} max={maxDate} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 outline-none" required />

                            {selectedDate && (
                                <div className="mt-6">
                                    <p className="text-sm font-medium text-gray-700 mb-3">Available slots for <strong>{formatDate(selectedDate)}</strong></p>
                                    {slotsLoading && <p className="text-gray-500 text-sm">Loading slots...</p>}
                                    {slotsError && !slotsLoading && <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 text-sm">{slotsError}</div>}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {slots.map((slot) => (
                                            <label key={slot.id} className={`border-2 rounded-lg p-3 cursor-pointer text-center transition-all ${data.time_slot_id === String(slot.id) ? 'border-parliament-700 bg-parliament-50' : 'border-gray-200 hover:border-parliament-300'}`}>
                                                <input type="radio" className="sr-only" name="time_slot_id" value={slot.id} checked={data.time_slot_id === String(slot.id)} onChange={(e) => setData('time_slot_id', e.target.value)} />
                                                <span className="font-semibold text-sm text-gray-800">{slot.time_range}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.time_slot_id && <p className="text-red-500 text-sm mt-2">{errors.time_slot_id}</p>}
                                </div>
                            )}
                            <div className="mt-8 flex justify-end">
                                <button type="button" onClick={nextStep} disabled={!data.time_slot_id} className="bg-parliament-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-parliament-800 disabled:opacity-50">Continue →</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Institution & Group Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Field label="Institution Name *" error={errors.institution_name}>
                                    <input type="text" value={data.institution_name} onChange={(e) => setData('institution_name', e.target.value)} className="input" required />
                                </Field>
                                <Field label="Registration Category *" error={errors.institution_category}>
                                    <select value={data.institution_category} onChange={(e) => setData('institution_category', e.target.value)} className="input bg-white" required>
                                        <option value="">Select category</option>
                                        {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                                    </select>
                                </Field>
                                <Field label="County *" error={errors.county}>
                                    <select value={data.county} onChange={handleCountyChange} className="input bg-white" required>
                                        <option value="">Select county</option>
                                        {counties.map((county) => <option key={county} value={county}>{county}</option>)}
                                    </select>
                                </Field>
                                <Field label="Constituency *" error={errors.constituency}>
                                    <select value={data.constituency} onChange={(e) => setData('constituency', e.target.value)} className="input bg-white" required disabled={!data.county}>
                                        <option value="">{data.county ? 'Select constituency' : 'Select county first'}</option>
                                        {(kenyaLocations[data.county] || []).map((constituency) => <option key={constituency} value={constituency}>{constituency}</option>)}
                                    </select>
                                </Field>
                                <Field label="Number of Learners *" error={errors.learner_count}>
                                    <input type="number" min="1" max="50" value={data.learner_count} onChange={(e) => setData('learner_count', e.target.value)} className="input" required />
                                </Field>
                                <Field label="Number of Accompanying Persons *" error={errors.accompanying_persons}>
                                    <input type="number" min="0" max="50" value={data.accompanying_persons} onChange={(e) => setData('accompanying_persons', e.target.value)} className="input" required />
                                </Field>
                                <Field label="Any learner/person with a disability? *" error={errors.has_disability}>
                                    <select value={data.has_disability ? 'yes' : 'no'} onChange={handleDisabilityChange} className="input bg-white" required>
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </Field>
                                {data.has_disability && (
                                    <Field label="Nature of Disability *" error={errors.disability_nature}>
                                        <input type="text" value={data.disability_nature} onChange={(e) => setData('disability_nature', e.target.value)} className="input" placeholder="Please specify accessibility needs" required />
                                    </Field>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-4">Total group size, including accompanying persons, must not exceed 50.</p>
                            <div className="mt-8 flex justify-between">
                                <button type="button" onClick={prevStep} className="text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100">← Back</button>
                                <button type="button" onClick={nextStep} className="bg-parliament-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-parliament-800">Continue →</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Contact & Visit Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Field label="Contact Person *" error={errors.contact_person}>
                                    <input type="text" value={data.contact_person} onChange={(e) => setData('contact_person', e.target.value)} className="input" required />
                                </Field>
                                <Field label="Email Address *" error={errors.contact_email}>
                                    <input type="email" value={data.contact_email} onChange={(e) => setData('contact_email', e.target.value)} className="input" required />
                                </Field>
                                <Field label="Phone Number *" error={errors.contact_phone}>
                                    <input type="text" value={data.contact_phone} onChange={(e) => setData('contact_phone', e.target.value)} className="input" placeholder="e.g. +254 712 345 678" required />
                                </Field>
                                <Field label="Supporting Documents" error={errors.documents}>
                                    <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(e) => setData('documents', Array.from(e.target.files))} className="input" />
                                </Field>
                            </div>
                            <div className="mt-5">
                                <Field label="Reason for Visit *" error={errors.reason_for_visit}>
                                    <textarea value={data.reason_for_visit} onChange={(e) => setData('reason_for_visit', e.target.value)} rows={4} className="input resize-none" required />
                                </Field>
                            </div>

                            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 text-sm text-gray-700">
                                <div className="flex gap-3">
                                    <CircleCheck className="w-5 h-5 text-parliament-700 flex-shrink-0 mt-0.5" />
                                    <div>
                                        Before the booking is submitted, you will be asked to review and accept the National Assembly school visit terms and conditions.
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button type="button" onClick={prevStep} className="text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100">← Back</button>
                                <button type="submit" disabled={processing} className="bg-parliament-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-parliament-800 disabled:opacity-50">
                                    {processing ? 'Submitting...' : 'Submit Booking'}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {showTermsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="terms-modal-title">
                    <div className="w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-parliament-800 to-parliament-700 text-white px-6 py-5 flex items-start gap-3">
                            <ShieldCheck className="w-7 h-7 flex-shrink-0 mt-0.5" />
                            <div>
                                <h2 id="terms-modal-title" className="text-xl md:text-2xl font-bold">Important Rules & Terms of Visit</h2>
                                <p className="text-green-50 text-sm mt-1">Please read these terms before completing your booking.</p>
                            </div>
                        </div>

                        <div className="overflow-y-auto px-6 py-5 space-y-6 text-sm text-gray-700">
                            {visitTermsSections.map((section) => (
                                <section key={section.title}>
                                    <h3 className="text-base font-bold text-gray-900 mb-3">{section.title}</h3>
                                    <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                                        {section.items.map((item) => <li key={item}>{item}</li>)}
                                    </ol>
                                </section>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 bg-gray-50 px-6 py-5">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.consent_accepted}
                                    onChange={(e) => setData('consent_accepted', e.target.checked)}
                                    className="mt-1 w-5 h-5 accent-green-700"
                                />
                                <span className="text-sm text-gray-800">
                                    I confirm that I have read, understood and agree to the terms and conditions above, including the photography and video recording provisions.
                                </span>
                            </label>
                            {errors.consent_accepted && <p className="text-red-500 text-sm mt-2">{errors.consent_accepted}</p>}

                            <div className="mt-5 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                                <button type="button" onClick={closeTermsModal} disabled={processing} className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 disabled:opacity-50">
                                    Cancel
                                </button>
                                <button type="button" onClick={confirmTermsAndSubmit} disabled={!data.consent_accepted || processing} className="px-6 py-3 rounded-lg bg-parliament-700 text-white font-semibold hover:bg-parliament-800 disabled:opacity-40 disabled:cursor-not-allowed">
                                    {processing ? 'Submitting...' : 'I Agree & Complete Booking'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {children}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
