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
        {/* Success icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>

        <h1 className="text-2xl mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6 text-sm">
          Your reservation has been confirmed. We've sent a confirmation email
          to <span className="text-blue-600">{email}</span>.
        </p>

        {/* Confirmation code */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <p className="text-xs text-gray-500 mb-1">Confirmation Code</p>
          <p className="text-xl text-blue-700 tracking-widest">
            {confirmationNumber}
          </p>
        </div>

        {/* Details */}
        <div className="text-left space-y-3 mb-6 text-sm">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Guest Name</span>
            <span>{guestName}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Room</span>
            <span>{roomName}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Check-in</span>
            <span>{new Date(checkIn).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Check-out</span>
            <span>{new Date(checkOut).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Return to Home
          </Link>
          <Link
            to="/rooms"
            className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition text-sm"
          >
            Browse More Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
