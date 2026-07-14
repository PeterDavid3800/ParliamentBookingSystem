<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a5632; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 22px; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .code { background: #1a5632; color: white; padding: 12px 24px; font-size: 20px; font-weight: bold; letter-spacing: 2px; text-align: center; display: inline-block; border-radius: 4px; }
        .details { margin: 20px 0; }
        .details table { width: 100%; border-collapse: collapse; }
        .details td { padding: 8px 12px; border-bottom: 1px solid #eee; }
        .details td:first-child { font-weight: bold; width: 40%; color: #555; }
        .footer { text-align: center; padding: 15px; font-size: 12px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏛️ Visit Parliament of Kenya</h1>
            <p style="margin:5px 0 0; opacity:0.9;">Booking Confirmed</p>
        </div>
        <div class="content">
            <p>Dear {{ $booking->contact_person }},</p>
            <p>Your visit to the Parliament of Kenya has been <strong>confirmed</strong>. Please keep this confirmation for your records.</p>

            <p style="text-align:center; margin: 24px 0;">
                <span class="code">{{ $booking->confirmation_code }}</span>
            </p>

            <div class="details">
                <table>
                    <tr><td>Institution</td><td>{{ $booking->institution_name }}</td></tr>
                    <tr><td>Contact Person</td><td>{{ $booking->contact_person }}</td></tr>
                    <tr><td>Email</td><td>{{ $booking->contact_email }}</td></tr>
                    <tr><td>Phone</td><td>{{ $booking->contact_phone }}</td></tr>
                    <tr><td>Date</td><td>{{ $booking->timeSlot->date->format('l, jS F Y') }}</td></tr>
                    <tr><td>Time</td><td>{{ $booking->timeSlot->time_range }}</td></tr>
                    <tr><td>Number of Visitors</td><td>{{ $booking->visitor_count }}</td></tr>
                    <tr><td>Reason for Visit</td><td>{{ $booking->reason_for_visit }}</td></tr>
                </table>
            </div>

            <p><strong>Important Notes:</strong></p>
            <ul>
                <li>Please arrive 15 minutes before your scheduled time.</li>
                <li>All visitors must carry valid identification (National ID or Passport).</li>
                <li>Large bags and electronic devices may be subject to security screening.</li>
            </ul>

            <p>If you have any questions, please contact us at {{ config('app.parliament_admin_email', 'visits@parliament.go.ke') }}.</p>

            <p>We look forward to welcoming you!</p>
            <p>— Parliament of Kenya Visits Office</p>
        </div>
        <div class="footer">
            <p>Parliament of Kenya | Parliament Buildings, Nairobi</p>
            <p>This is an automated message. Please do not reply directly to this email.</p>
        </div>
    </div>
</body>
</html>
