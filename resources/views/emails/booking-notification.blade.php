<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #c0392b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 20px; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
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
            <h1>🔔 New Parliament Visit Booking</h1>
        </div>
        <div class="content">
            <p>A new visit has been booked. Details below:</p>

            <div class="details">
                <table>
                    <tr><td>Confirmation Code</td><td><strong>{{ $booking->confirmation_code }}</strong></td></tr>
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

            @if($booking->documents->isNotEmpty())
                <p><strong>Supporting Documents ({{ $booking->documents->count() }}):</strong></p>
                <ul>
                    @foreach($booking->documents as $doc)
                        <li>{{ $doc->original_name }}</li>
                    @endforeach
                </ul>
            @endif

            <p><a href="{{ url('/admin/bookings/' . $booking->id) }}" style="display:inline-block; background:#c0392b; color:white; padding:10px 20px; text-decoration:none; border-radius:4px;">View in Admin Panel</a></p>
        </div>
        <div class="footer">
            <p>Parliament of Kenya | Automated Notification</p>
        </div>
    </div>
</body>
</html>
