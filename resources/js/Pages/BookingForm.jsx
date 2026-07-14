import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { CircleCheck } from 'lucide-react';

export default function BookingForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        time_slot_id: '',
        institution_name: '',
        contact_person: '',
        contact_email: '',
        contact_phone: '',
        reason_for_visit: '',
        visitor_count: '',
        documents: [],
    });

    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [slots, setSlots] = useState([]);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [slotsError, setSlotsError] = useState('');
    const [success, setSuccess] = useState(false);

    // Get today's date in YYYY-MM-DD format (Kenya time)
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

    // Prevent weekends from being selectable
    const isWeekend = (dateStr) => {
        const d = new Date(dateStr + 'T00:00:00');
        return d.getDay() === 0 || d.getDay() === 6;
    };

    const fetchSlots = useCallback(async (date) => {
        if (!date || isWeekend(date)) {
            setSlots([]);
            setSlotsError('No visits are available on weekends. Please select a weekday (Monday–Friday).');
            return;
        }

        setSlotsLoading(true);
        setSlotsError('');

        try {
            const res = await fetch(`/api/time-slots?date=${date}`);
            const json = await res.json();
            setSlots(json.slots || []);
            if (json.message && json.slots.length === 0) {
                setSlotsError(json.message);
            }
        } catch {
            setSlotsError('Failed to load available time slots. Please try again.');
        } finally {
            setSlotsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (selectedDate) {
            fetchSlots(selectedDate);
        }
    }, [selectedDate, fetchSlots]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setData('time_slot_id', '');
        setSlots([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                setSuccess(true);
                reset();
            },
            onError: (err) => {
                setStep(2); // Go back to form step to show errors
                console.error('Booking submission errors:', err);
            },
            onFinish: () => {
                // Submission finished (success or error)
            },
        };

        // Only use forceFormData if documents are attached
        if (data.documents && data.documents.length > 0) {
            options.forceFormData = true;
        }

        post('/bookings', options);
    };

    const nextStep = () => {
        if (step === 1 && !data.time_slot_id) return;
        setStep(step + 1);
    };
    const prevStep = () => setStep(step - 1);

    // Format date nicely
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-KE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (success) {
        return (
            <PublicLayout>
                <Head title="Booking Submitted" />
                <div className="max-w-lg mx-auto mt-12 text-center">
                    <CircleCheck className="w-16 h-16 mx-auto mb-6 text-green-500" />
                    <h2 className="text-2xl font-bold text-parliament-800 mb-4">
                        Booking Submitted!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Your visit request has been received. You will receive a confirmation email shortly.
                        You can now close this page or{' '}
                        <button
                            onClick={() => {
                                setSuccess(false);
                                setStep(1);
                                setSelectedDate('');
                            }}
                            className="text-parliament-700 underline font-medium"
                        >
                            book another visit
                        </button>.
                    </p>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Book a Visit — Parliament of Kenya" />

            <div className="max-w-3xl mx-auto">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-10">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                    s <= step
                                        ? 'bg-parliament-700 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                }`}
                            >
                                {s < step ? '✓' : s}
                            </div>
                            {s < 3 && (
                                <div
                                    className={`w-16 h-1 mx-2 ${
                                        s < step ? 'bg-parliament-700' : 'bg-gray-200'
                                    }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Select Date & Time Slot */}
                    {step === 1 && (
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">
                                📅 Select Date & Time
                            </h2>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Visit Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    min={today}
                                    max={maxDate}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Weekdays only (Monday–Friday). Up to 90 days in advance.
                                </p>
                            </div>

                            {selectedDate && (
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-3">
                                        Available time slots for{' '}
                                        <strong>{formatDate(selectedDate)}</strong>:
                                    </p>

                                    {slotsLoading && (
                                        <p className="text-gray-500 text-sm">Loading slots...</p>
                                    )}

                                    {slotsError && !slotsLoading && (
                                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 text-sm">
                                            {slotsError}
                                        </div>
                                    )}

                                    {!slotsLoading && !slotsError && slots.length === 0 && selectedDate && (
                                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 text-sm">
                                            No time slots available for this date.
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        {slots.map((slot) => (
                                            <label
                                                key={slot.id}
                                                className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                                    data.time_slot_id === String(slot.id)
                                                        ? 'border-parliament-600 bg-parliament-50'
                                                        : 'border-gray-200 hover:border-parliament-300'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="time_slot_id"
                                                    value={slot.id}
                                                    checked={data.time_slot_id === String(slot.id)}
                                                    onChange={(e) =>
                                                        setData('time_slot_id', e.target.value)
                                                    }
                                                    className="sr-only"
                                                />
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <span className="font-semibold text-gray-800 text-lg">
                                                            {slot.time_range}
                                                        </span>
                                                    </div>
                                                    <span
                                                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                                                            slot.available_spots <= 2
                                                                ? 'bg-orange-100 text-orange-700'
                                                                : 'bg-green-100 text-green-700'
                                                        }`}
                                                    >
                                                        {slot.available_spots} of {slot.max_bookings} spots left
                                                    </span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex justify-end">
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!data.time_slot_id}
                                    className="bg-parliament-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-parliament-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Continue →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Institution Details */}
                    {step === 2 && (
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">
                                🏫 Institution Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Institution Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.institution_name}
                                        onChange={(e) =>
                                            setData('institution_name', e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                                        required
                                        placeholder="e.g., Nairobi School"
                                    />
                                    {errors.institution_name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.institution_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Person *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact_person}
                                        onChange={(e) =>
                                            setData('contact_person', e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                                        required
                                        placeholder="Full name"
                                    />
                                    {errors.contact_person && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.contact_person}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        value={data.contact_email}
                                        onChange={(e) =>
                                            setData('contact_email', e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                                        required
                                        placeholder="email@example.com"
                                    />
                                    {errors.contact_email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.contact_email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact_phone}
                                        onChange={(e) =>
                                            setData('contact_phone', e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                                        required
                                        placeholder="e.g., +254 712 345 678"
                                    />
                                    {errors.contact_phone && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.contact_phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Number of Visitors *
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={data.visitor_count}
                                        onChange={(e) =>
                                            setData('visitor_count', e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                                        required
                                        placeholder="Max 50"
                                    />
                                    {errors.visitor_count && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.visitor_count}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Reason for Visit *
                                </label>
                                <textarea
                                    value={data.reason_for_visit}
                                    onChange={(e) =>
                                        setData('reason_for_visit', e.target.value)
                                    }
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none resize-none"
                                    required
                                    placeholder="Briefly describe the purpose of the visit..."
                                />
                                {errors.reason_for_visit && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.reason_for_visit}
                                    </p>
                                )}
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="text-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                        className="bg-parliament-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-parliament-800 transition-colors"
                                >
                                    Continue →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Review & Submit */}
                    {step === 3 && (
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">
                                📝 Review & Submit
                            </h2>

                            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date:</span>
                                    <span className="font-medium">
                                        {formatDate(selectedDate)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Time:</span>
                                    <span className="font-medium">
                                        {slots.find((s) => String(s.id) === data.time_slot_id)
                                            ?.time_range || '—'}
                                    </span>
                                </div>
                                <div className="border-t border-gray-200 my-2" />
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Institution:</span>
                                    <span className="font-medium">
                                        {data.institution_name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Contact:</span>
                                    <span className="font-medium">
                                        {data.contact_person}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="font-medium">
                                        {data.contact_email}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Phone:</span>
                                    <span className="font-medium">
                                        {data.contact_phone}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Visitors:</span>
                                    <span className="font-medium">
                                        {data.visitor_count}
                                    </span>
                                </div>
                            </div>

                            {/* Document Upload */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Supporting Documents (optional, max 3)
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        setData('documents', Array.from(e.target.files))
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-parliament-50 file:text-parliament-700 hover:file:bg-parliament-100"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    PDF, Word, or images. Max 5MB each.
                                </p>
                                {errors.documents && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.documents}
                                    </p>
                                )}
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="text-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-parliament-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-parliament-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
                                >
                                    {processing ? 'Submitting...' : 'Submit Booking'}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </PublicLayout>
    );
}
