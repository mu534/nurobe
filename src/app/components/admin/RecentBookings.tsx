import { bookings as mockBookings } from "../../data/hotelData";

export function RecentBookings() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-lg">Recent Bookings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Guest
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Check-in
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mockBookings.slice(0, 5).map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{booking.guestName}</td>
                <td className="px-6 py-4">{booking.roomName}</td>
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
                          : booking.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4">${booking.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
