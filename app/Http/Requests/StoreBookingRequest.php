<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

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
            'contact_person' => ['required', 'string', 'max:255'],
            'contact_email' => ['required', 'email', 'max:255'],
            'contact_phone' => ['required', 'string', 'max:50'],
            'reason_for_visit' => ['required', 'string', 'max:2000'],
            'visitor_count' => ['required', 'integer', 'min:1', 'max:50'],
            'documents' => ['nullable', 'array', 'max:3'],
            'documents.*' => ['file', 'mimes:pdf,doc,docx,jpg,jpeg,png', 'max:5120'],
        ];
    }

    public function messages(): array
    {
        return [
            'visitor_count.max' => 'The maximum number of visitors per booking is 50.',
            'documents.max' => 'You can upload a maximum of 3 documents.',
            'documents.*.max' => 'Each document must not exceed 5MB.',
            'documents.*.mimes' => 'Documents must be PDF, Word, or image files.',
        ];
    }
}
