import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Sidebar } from "../../components/admin/Sidebar";
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "../../../api/bookings";
import type { Booking } from "../../../types/types";

export function AdminBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ================= Fetch =================
  useEffect(() => {
    getBookings()
      .then(setBookings)
      .catch((err) => {
        console.error("Failed to load bookings:", err);
        alert("Failed to load bookings");
      })
      .finally(() => setLoading(false));
  }, []);

  // ================= Filter =================
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.confirmationNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ================= Status Change =================
  const handleStatusChange = async (
    id: number,
    newStatus: Booking["status"],
  ) => {
    try {
      const updated = await updateBookingStatus(id, newStatus);
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update booking status");
    }
  };

  // ================= Cancel =================
  const handleCancel = async (id: number) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const updated = await updateBookingStatus(id, "cancelled");
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch (err) {
      console.error("Failed to cancel booking:", err);
      alert("Failed to cancel booking");
    }
  };

  // ================= Delete =================
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Failed to delete booking:", err);
      alert("Failed to delete booking");
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "checked-in":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const paymentColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-orange-100 text-orange-800";
      case "refunded":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar active="Bookings" onLogout={() => navigate("/login")} />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-8">
          <h2 className="text-2xl">Booking Management</h2>
          <p className="text-blue-100 text-sm mt-1">
            View and manage all reservations
          </p>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              {
                label: "Total",
                value: bookings.length,
                color: "text-blue-600",
              },
              {
                label: "Pending",
                value: bookings.filter((b) => b.status === "pending").length,
                color: "text-yellow-600",
              },
              {
                label: "Confirmed",
                value: bookings.filter((b) => b.status === "confirmed").length,
                color: "text-green-600",
              },
              {
                label: "Checked In",
                value: bookings.filter((b) => b.status === "checked-in").length,
                color: "text-blue-500",
              },
              {
                label: "Completed",
                value: bookings.filter((b) => b.status === "completed").length,
                color: "text-gray-600",
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg shadow p-5">
                <div className={`text-2xl font-semibold mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Search + Filter */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email or confirmation no..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Table */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading bookings...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Confirmation",
                        "Guest",
                        "Room",
                        "Check-in",
                        "Check-out",
                        "Nights",
                        "Total",
                        "Payment",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs text-gray-500 uppercase whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-xs text-blue-700 font-mono whitespace-nowrap">
                          {booking.confirmationNo}
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">{booking.guestName}</div>
                          <div className="text-xs text-gray-500">
                            {booking.email}
                          </div>
                          <div className="text-xs text-gray-400">
                            {booking.phone}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {booking.room?.name ?? `Room #${booking.roomId}`}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {new Date(booking.checkIn).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm text-center">
                          {booking.nights}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap text-blue-600">
                          ${booking.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${paymentColor(booking.paymentStatus)}`}
                          >
                            {booking.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${statusColor(booking.status)}`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-1 flex-wrap">
                            {booking.status === "pending" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(booking.id, "confirmed")
                                }
                                className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs hover:bg-green-100"
                              >
                                Approve
                              </button>
                            )}
                            {booking.status === "confirmed" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(booking.id, "checked-in")
                                }
                                className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100"
                              >
                                Check-in
                              </button>
                            )}
                            {booking.status === "checked-in" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(booking.id, "completed")
                                }
                                className="px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs hover:bg-gray-100"
                              >
                                Complete
                              </button>
                            )}
                            {(booking.status === "pending" ||
                              booking.status === "confirmed") && (
                              <button
                                onClick={() => handleCancel(booking.id)}
                                className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs hover:bg-red-100"
                              >
                                Cancel
                              </button>
                            )}
                            {(booking.status === "cancelled" ||
                              booking.status === "completed") && (
                              <button
                                onClick={() => handleDelete(booking.id)}
                                className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs hover:bg-red-100"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredBookings.length === 0 && (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No bookings found matching your filters
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
