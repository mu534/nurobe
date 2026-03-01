import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getRoomById } from "../../api/rooms";
import { createBooking } from "../../api/bookings";
import type { Room } from "../../types/types";
import { BookingForm } from "../components/admin/BookingForm";
import { BookingSummary } from "../components/admin/BookingSummary";
import { BookingConfirmation } from "../components/admin/BookingConfirmation";
import NavBar from "../components/NavBar";

export function BookingPage() {
  const [searchParams] = useSearchParams();
  const roomId = parseInt(searchParams.get("roomId") || "0");
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guestsParam = parseInt(searchParams.get("guests") || "2");

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!roomId) return;
    getRoomById(roomId)
      .then(setRoom)
      .catch(() => setRoom(null))
      .finally(() => setLoading(false));
  }, [roomId]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!room || !checkIn || !checkOut || nights <= 0) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const booking = await createBooking({
        guestName,
        email,
        phone,
        specialRequests,
        roomId: room.id,
        checkIn,
        checkOut,
        guests: guestsParam,
      });

      setConfirmationNumber(booking.confirmationNo);
      setBookingConfirmed(true);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error?.response?.data?.message || "Booking failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 pt-32">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl">Complete Your Booking</h1>
          <p className="text-blue-100 text-sm mt-1">
            You're just one step away from your stay
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

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
