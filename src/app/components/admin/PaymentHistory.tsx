import type { Booking } from "../../../types/types";

interface PaymentHistoryProps {
  bookings: Booking[];
}

export function PaymentHistory({ bookings }: PaymentHistoryProps) {
  // Show all bookings as payment records, sorted by createdAt desc
  const records = [...bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-lg">Payment History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Confirmation",
                "Guest",
                "Room",
                "Amount",
                "Date",
                "Status",
                "Payment",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs text-gray-500 uppercase whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {records.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No payment records yet
                </td>
              </tr>
            ) : (
              records.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-xs font-mono text-blue-700">
                    {booking.confirmationNo}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{booking.guestName}</div>
                    <div className="text-xs text-gray-400">{booking.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {booking.room?.name ?? `Room #${booking.roomId}`}
                  </td>
                  <td className="px-6 py-4 text-green-600 font-medium">
                    ${booking.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        booking.status === "completed"
                          ? "bg-gray-100 text-gray-700"
                          : booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "checked-in"
                              ? "bg-blue-100 text-blue-800"
                              : booking.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        booking.paymentStatus === "paid"
                          ? "bg-green-100 text-green-800"
                          : booking.paymentStatus === "refunded"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
