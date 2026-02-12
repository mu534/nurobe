// BookingPage.tsx
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { rooms } from "../data/hotelData";
import { BookingForm } from "../components/admin/BookingForm";
import { BookingSummary } from "../components/admin/BookingSummary";
import { BookingConfirmation } from "../components/admin/BookingConfirmation";

export function BookingPage() {
  const [searchParams] = useSearchParams();
  const roomId = parseInt(searchParams.get("roomId") || "0");
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guestsParam = parseInt(searchParams.get("guests") || "2");

  const room = rooms.find((r) => r.id === roomId);

  const [confirmationNumber] = useState(
    () => `NRB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
  );
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;
  const subtotal = room ? room.price * nights : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (!room || !checkIn || !checkOut) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Invalid booking request</h1>
          <Link to="/rooms" className="text-blue-600 hover:underline">
            Browse Rooms
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
    return (
      <BookingConfirmation
        roomName={room.name}
        guestName={guestName}
        email={email}
        confirmationNumber={confirmationNumber}
        checkIn={checkIn}
        checkOut={checkOut}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="text-2xl text-gray-900">
            Nurobe Hotel
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl mb-2">Complete Your Booking</h1>
          <p className="text-gray-600 mb-8">
            You're just one step away from your stay
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BookingForm
                guestName={guestName}
                setGuestName={setGuestName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                specialRequests={specialRequests}
                setSpecialRequests={setSpecialRequests}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
              />
            </div>
            <div className="lg:col-span-1">
              <BookingSummary
                room={room}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guestsParam}
                nights={nights}
                subtotal={subtotal}
                tax={tax}
                total={total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
