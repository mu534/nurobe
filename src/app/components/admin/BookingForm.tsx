interface BookingFormProps {
  guestName: string;
  setGuestName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  specialRequests: string;
  setSpecialRequests: (v: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function BookingForm({
  guestName,
  setGuestName,
  email,
  setEmail,
  phone,
  setPhone,
  specialRequests,
  setSpecialRequests,
  isSubmitting,
  onSubmit,
}: BookingFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg shadow p-6">
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
          Payment will be collected at the hotel. No credit card required for
          booking.
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
  );
}
