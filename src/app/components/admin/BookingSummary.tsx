import type { Room } from "../../../types/types";

interface BookingSummaryProps {
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  subtotal: number;
  tax: number;
  total: number;
}

export function BookingSummary({
  room,
  checkIn,
  checkOut,
  guests,
  nights,
  subtotal,
  tax,
  total,
}: BookingSummaryProps) {
  const firstImage = room.image ? room.image.split(",")[0] : "";

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-6">
      <h2 className="text-xl mb-4">Booking Summary</h2>

      {/* Room image + name */}
      <div className="mb-4">
        <div
          className="w-full bg-gray-100 rounded-lg mb-3 overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <img
            src={firstImage}
            alt={room.name}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="mb-1">{room.name}</h3>
        <p className="text-sm text-gray-600 capitalize">{room.type}</p>
      </div>

      {/* Stay details */}
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
          <span>{guests}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Nights</span>
          <span>{nights}</span>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="space-y-2 mb-4 pb-4 border-b text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">
            ${room.price} × {nights} nights
          </span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-lg">Total</span>
        <span className="text-2xl text-blue-600">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
