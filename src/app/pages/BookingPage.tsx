import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { rooms } from "../data/hotelData";

export function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const roomId = parseInt(searchParams.get("roomId") || "0");
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guestsParam = searchParams.get("guests") || "2";

  const room = rooms.find((r) => r.id === roomId);

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
  const tax = subtotal * 0.1; // 10% tax
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
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
              <span className="text-sm text-gray-600">Confirmation Number</span>
              <div className="text-lg">
                NRB-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </div>
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-600">Guest Name</span>
              <div>{guestName}</div>
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-600">Room</span>
              <div>{room.name}</div>
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
            </div>
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow p-6"
              >
                <h2 className="text-xl mb-6">Guest Information</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      placeholder="Enter your full name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+251 912 345 678"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={4}
                      placeholder="Any special requests or requirements..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-xl mb-4">Payment Information</h2>
                  <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    Payment will be collected at the hotel. No credit card
                    required for booking.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </button>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                <h2 className="text-xl mb-4">Booking Summary</h2>

                <div className="mb-4">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="mb-1">{room.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {room.type}
                  </p>
                </div>

                <div className="space-y-3 mb-4 pb-4 border-b text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in</span>
                    <span>{new Date(checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out</span>
                    <span>{new Date(checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests</span>
                    <span>{guestsParam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nights</span>
                    <span>{nights}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      ${room.price} × {nights} nights
                    </span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg">Total</span>
                  <span className="text-2xl text-blue-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
