import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface BookingConfirmationProps {
  roomName: string;
  guestName: string;
  email: string;
  confirmationNumber: string;
  checkIn: string;
  checkOut: string;
}

export function BookingConfirmation({
  roomName,
  guestName,
  email,
  confirmationNumber,
  checkIn,
  checkOut,
}: BookingConfirmationProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Your reservation has been confirmed. We've sent a confirmation email
          to {email}.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div className="mb-2">
            <span className="text-sm text-gray-600">Confirmation Code</span>
            <div className="text-lg">{confirmationNumber}</div>
          </div>
        </div>
        <div className="mb-2">
          <span className="text-sm text-gray-600">Guest Name</span>
          <div>{guestName}</div>
        </div>
        <div className="mb-2">
          <span className="text-sm text-gray-600">Room</span>
          <div>{roomName}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600">Check-in</span>
            <div>{new Date(checkIn).toLocaleDateString()}</div>
          </div>
          <div>
            <span className="text-sm text-gray-600">Check-out</span>
            <div>{new Date(checkOut).toLocaleDateString()}</div>
          </div>
          <Link
            to="/"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition mb-3"
          >
            Return to Home
          </Link>
          <Link
            to="/rooms"
            className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Browse More Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
