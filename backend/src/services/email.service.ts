import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const HOTEL_EMAIL = process.env.HOTEL_EMAIL || "admin@nurobe.com";
const HOTEL_NAME = "Nurobe Hotel";

// ================= Booking Confirmation to Guest =================
export async function sendBookingConfirmation(data: {
  guestName: string;
  email: string;
  confirmationNo: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  subtotal: number;
  tax: number;
  totalPrice: number;
}) {
  await resend.emails.send({
    from: `${HOTEL_NAME} <bookings@nurobe.com>`,
    to: data.email,
    subject: `Booking Confirmed – ${data.confirmationNo}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <div style="background: linear-gradient(to right, #2563eb, #1d4ed8); padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">${HOTEL_NAME}</h1>
          <p style="color: #bfdbfe; margin: 8px 0 0;">Booking Confirmation</p>
        </div>

        <div style="padding: 32px;">
          <p style="font-size: 16px;">Dear <strong>${data.guestName}</strong>,</p>
          <p style="color: #4b5563;">Your booking has been confirmed. We look forward to welcoming you!</p>

          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
            <p style="margin: 0 0 4px; color: #6b7280; font-size: 12px;">Confirmation Code</p>
            <p style="margin: 0; font-size: 24px; color: #1d4ed8; letter-spacing: 4px;"><strong>${data.confirmationNo}</strong></p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280;">Room</td>
              <td style="padding: 12px 0; text-align: right;"><strong>${data.roomName}</strong></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280;">Check-in</td>
              <td style="padding: 12px 0; text-align: right;">${new Date(data.checkIn).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280;">Check-out</td>
              <td style="padding: 12px 0; text-align: right;">${new Date(data.checkOut).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280;">Nights</td>
              <td style="padding: 12px 0; text-align: right;">${data.nights}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280;">Guests</td>
              <td style="padding: 12px 0; text-align: right;">${data.guests}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280;">Subtotal</td>
              <td style="padding: 12px 0; text-align: right;">$${data.subtotal.toFixed(2)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280;">Tax (10%)</td>
              <td style="padding: 12px 0; text-align: right;">$${data.tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-size: 16px;"><strong>Total</strong></td>
              <td style="padding: 12px 0; text-align: right; font-size: 18px; color: #2563eb;"><strong>$${data.totalPrice.toFixed(2)}</strong></td>
            </tr>
          </table>

          <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 24px; font-size: 13px; color: #6b7280;">
            <p style="margin: 0;">💳 <strong>Payment:</strong> Will be collected at the hotel upon arrival.</p>
          </div>

          <p style="margin-top: 24px; color: #4b5563; font-size: 14px;">
            If you have any questions, please contact us at <a href="mailto:${HOTEL_EMAIL}" style="color: #2563eb;">${HOTEL_EMAIL}</a>.
          </p>
        </div>

        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
          <p style="margin: 0;">${HOTEL_NAME} · All rights reserved</p>
        </div>
      </div>
    `,
  });
}

// ================= Admin Notification =================
export async function sendAdminNotification(data: {
  guestName: string;
  email: string;
  phone: string;
  confirmationNo: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalPrice: number;
  specialRequests: string;
}) {
  await resend.emails.send({
    from: `${HOTEL_NAME} <bookings@nurobe.com>`,
    to: HOTEL_EMAIL,
    subject: `New Booking – ${data.confirmationNo} – ${data.guestName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <div style="background: #1e3a5f; padding: 24px;">
          <h2 style="color: white; margin: 0;">New Booking Received</h2>
          <p style="color: #93c5fd; margin: 4px 0 0; font-size: 14px;">${data.confirmationNo}</p>
        </div>

        <div style="padding: 24px;">
          <h3 style="margin: 0 0 16px; color: #374151;">Guest Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280; width: 40%;">Name</td>
              <td style="padding: 10px 0;"><strong>${data.guestName}</strong></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Phone</td>
              <td style="padding: 10px 0;">${data.phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Room</td>
              <td style="padding: 10px 0;">${data.roomName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Check-in</td>
              <td style="padding: 10px 0;">${new Date(data.checkIn).toLocaleDateString()}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Check-out</td>
              <td style="padding: 10px 0;">${new Date(data.checkOut).toLocaleDateString()}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Nights / Guests</td>
              <td style="padding: 10px 0;">${data.nights} nights · ${data.guests} guests</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Total</td>
              <td style="padding: 10px 0; color: #2563eb;"><strong>$${data.totalPrice.toFixed(2)}</strong></td>
            </tr>
            ${
              data.specialRequests
                ? `
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top;">Special Requests</td>
              <td style="padding: 10px 0; color: #dc2626;">${data.specialRequests}</td>
            </tr>`
                : ""
            }
          </table>
        </div>
      </div>
    `,
  });
}

// ================= Cancellation Email to Guest =================
export async function sendCancellationEmail(data: {
  guestName: string;
  email: string;
  confirmationNo: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
}) {
  await resend.emails.send({
    from: `${HOTEL_NAME} <bookings@nurobe.com>`,
    to: data.email,
    subject: `Booking Cancelled – ${data.confirmationNo}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <div style="background: #dc2626; padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">${HOTEL_NAME}</h1>
          <p style="color: #fecaca; margin: 8px 0 0;">Booking Cancellation</p>
        </div>

        <div style="padding: 32px;">
          <p style="font-size: 16px;">Dear <strong>${data.guestName}</strong>,</p>
          <p style="color: #4b5563;">Your booking has been cancelled. Here are the details of the cancelled reservation:</p>

          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
            <p style="margin: 0 0 4px; color: #6b7280; font-size: 12px;">Cancelled Booking</p>
            <p style="margin: 0; font-size: 20px; color: #dc2626; letter-spacing: 3px;"><strong>${data.confirmationNo}</strong></p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280;">Room</td>
              <td style="padding: 12px 0; text-align: right;">${data.roomName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280;">Check-in</td>
              <td style="padding: 12px 0; text-align: right;">${new Date(data.checkIn).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6b7280;">Check-out</td>
              <td style="padding: 12px 0; text-align: right;">${new Date(data.checkOut).toLocaleDateString()}</td>
            </tr>
          </table>

          <p style="margin-top: 24px; color: #4b5563; font-size: 14px;">
            If you did not request this cancellation or have any questions, please contact us at
            <a href="mailto:${HOTEL_EMAIL}" style="color: #2563eb;">${HOTEL_EMAIL}</a>.
          </p>
        </div>

        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
          <p style="margin: 0;">${HOTEL_NAME} · All rights reserved</p>
        </div>
      </div>
    `,
  });
}
