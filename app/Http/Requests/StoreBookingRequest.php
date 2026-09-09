<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use App\Models\TimeSlot;
use Carbon\Carbon;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'time_slot_id' => ['required', 'exists:time_slots,id'],
            'institution_name' => ['required', 'string', 'max:255'],
            'institution_category' => ['required', Rule::in([
                'Primary',
                'Junior Secondary',
                'Senior Secondary',
                'Colleges',
                'TVETs',
                'Universities',
                'Others',
            ])],
            'contact_person' => ['required', 'string', 'max:255'],
            'contact_email' => ['required', 'email', 'max:255'],
            'contact_phone' => ['required', 'string', 'max:50'],
            'reason_for_visit' => ['required', 'string', 'max:2000'],
            'learner_count' => ['required', 'integer', 'min:1', 'max:50'],
            'accompanying_persons' => ['required', 'integer', 'min:0', 'max:50'],
            'has_disability' => ['required', 'boolean'],
            'disability_nature' => ['nullable', 'required_if:has_disability,1,true', 'string', 'max:500'],
            'county' => ['required', 'string', 'max:100'],
            'constituency' => ['required', 'string', 'max:150'],
            'consent_accepted' => ['accepted'],
            'documents' => ['nullable', 'array', 'max:3'],
            'documents.*' => ['file', 'mimes:pdf,doc,docx,jpg,jpeg,png', 'max:5120'],
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                $learners = (int) $this->input('learner_count', 0);
                $accompanying = (int) $this->input('accompanying_persons', 0);

                if (($learners + $accompanying) > 50) {
                    $validator->errors()->add(
                        'learner_count',
                        'The total group size, including accompanying persons, may not exceed 50.'
                    );
                }


                $slotId = $this->input('time_slot_id');
                if ($slotId) {
                    $slot = TimeSlot::find($slotId);
                    if ($slot && Carbon::parse($slot->date)->lt(now()->startOfDay()->addDays(7))) {
                        $validator->errors()->add(
                            'time_slot_id',
                            'Bookings must be made at least 7 days in advance of the requested visit date.'
                        );
                    }
                }
            },
        ];
    }

    public function messages(): array
    {
        return [
            'institution_category.required' => 'Please select a registration category.',
            'learner_count.required' => 'Please enter the number of learners.',
            'learner_count.max' => 'The maximum group size is 50 people.',
            'accompanying_persons.required' => 'Please enter the number of accompanying persons.',
            'disability_nature.required_if' => 'Please provide the nature of the disability.',
            'county.required' => 'Please select a county.',
            'constituency.required' => 'Please select a constituency.',
            'consent_accepted.accepted' => 'You must provide consent before proceeding with the booking.',
            'documents.max' => 'You can upload a maximum of 3 documents.',
            'documents.*.max' => 'Each document must not exceed 5MB.',
            'documents.*.mimes' => 'Documents must be PDF, Word, or image files.',
        ];
    }
}
