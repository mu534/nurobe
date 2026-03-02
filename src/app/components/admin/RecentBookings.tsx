import { Link } from "react-router-dom";
import type { Booking } from "../../../types/types";

interface RecentBookingsProps {
  bookings: Booking[];
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  const recent = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b flex items-center justify-between">
        <h3 className="text-lg">Recent Bookings</h3>
        <Link
          to="/admin/bookings"
          className="text-sm text-blue-600 hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Guest", "Room", "Check-in", "Status", "Amount"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {recent.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  No bookings yet
                </td>
              </tr>
            ) : (
              recent.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm">{booking.guestName}</div>
                    <div className="text-xs text-gray-400">{booking.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {booking.room?.name ?? `Room #${booking.roomId}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "checked-in"
                              ? "bg-blue-100 text-blue-800"
                              : booking.status === "completed"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600">
                    ${booking.totalPrice.toFixed(2)}
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
