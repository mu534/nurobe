import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  Calendar,
  DollarSign,
  LogOut,
  Search,
  Filter,
  Home,
} from "lucide-react";
import { bookings as initialBookings } from "../../data/hotelData";

export function AdminBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (
    id: number,
    newStatus: (typeof bookings)[0]["status"],
  ) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
  };

  const handleCancel = (id: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      handleStatusChange(id, "cancelled");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl">Nurobe Admin</h1>
        </div>
        <nav className="px-3">
          <Link
            to="/admin"
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 mb-1"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/admin/rooms"
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 mb-1"
          >
            <BedDouble className="w-5 h-5" />
            Rooms
          </Link>
          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 px-3 py-3 rounded-lg bg-blue-600 mb-1"
          >
            <Calendar className="w-5 h-5" />
            Bookings
          </Link>
          <Link
            to="/admin/payments"
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 mb-1"
          >
            <DollarSign className="w-5 h-5" />
            Payments
          </Link>
          <div className="border-t border-gray-700 my-4"></div>
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 mb-1"
          >
            <Home className="w-5 h-5" />
            View Website
          </Link>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-8 py-6">
            <h2 className="text-2xl text-gray-900">Booking Management</h2>
            <p className="text-gray-600">View and manage all reservations</p>
          </div>
        </header>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl text-blue-600 mb-1">
                {bookings.length}
              </div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl text-yellow-600 mb-1">
                {bookings.filter((b) => b.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl text-green-600 mb-1">
                {bookings.filter((b) => b.status === "confirmed").length}
              </div>
              <div className="text-sm text-gray-600">Confirmed</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl text-blue-600 mb-1">
                {bookings.filter((b) => b.status === "checked-in").length}
              </div>
              <div className="text-sm text-gray-600">Checked In</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl text-gray-600 mb-1">
                {bookings.filter((b) => b.status === "completed").length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by guest name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked-in">Checked In</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                      ID
                    </th>
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
                      Check-out
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                      Guests
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">#{booking.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <div>{booking.guestName}</div>
                          <div className="text-xs text-gray-500">
                            {booking.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{booking.roomName}</td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">{booking.guests}</td>
                      <td className="px-6 py-4">${booking.totalPrice}</td>
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
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {booking.status === "pending" && (
                            <button
                              onClick={() =>
                                handleStatusChange(booking.id, "confirmed")
                              }
                              className="px-3 py-1 bg-green-50 text-green-700 rounded text-xs hover:bg-green-100"
                            >
                              Approve
                            </button>
                          )}
                          {booking.status === "confirmed" && (
                            <button
                              onClick={() =>
                                handleStatusChange(booking.id, "checked-in")
                              }
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100"
                            >
                              Check-in
                            </button>
                          )}
                          {booking.status === "checked-in" && (
                            <button
                              onClick={() =>
                                handleStatusChange(booking.id, "completed")
                              }
                              className="px-3 py-1 bg-gray-50 text-gray-700 rounded text-xs hover:bg-gray-100"
                            >
                              Complete
                            </button>
                          )}
                          {(booking.status === "pending" ||
                            booking.status === "confirmed") && (
                            <button
                              onClick={() => handleCancel(booking.id)}
                              className="px-3 py-1 bg-red-50 text-red-700 rounded text-xs hover:bg-red-100"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No bookings found matching your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
