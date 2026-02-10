import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  Calendar,
  DollarSign,
  LogOut,
  TrendingUp,
  Users,
  Home,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { bookings, rooms } from "../../data/hotelData";

export function AdminDashboard() {
  const navigate = useNavigate();

  // Calculate statistics
  const totalBookings = bookings.length;
  const occupiedRooms = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "checked-in",
  ).length;
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  // Chart data
  const monthlyData = [
    { month: "Jan", bookings: 45, revenue: 3600 },
    { month: "Feb", bookings: 52, revenue: 4200 },
    { month: "Mar", bookings: 48, revenue: 3900 },
    { month: "Apr", bookings: 61, revenue: 4900 },
    { month: "May", bookings: 55, revenue: 4400 },
    { month: "Jun", bookings: 67, revenue: 5400 },
  ];

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
            className="flex items-center gap-3 px-3 py-3 rounded-lg bg-blue-600 mb-1"
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
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 mb-1"
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
            <h2 className="text-2xl text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-600">Welcome back, Admin</p>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  +12%
                </span>
              </div>
              <div className="text-3xl mb-1">{totalBookings}</div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BedDouble className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {Math.round((occupiedRooms / rooms.length) * 100)}%
                </span>
              </div>
              <div className="text-3xl mb-1">{occupiedRooms}</div>
              <div className="text-sm text-gray-600">Occupied Rooms</div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  +8%
                </span>
              </div>
              <div className="text-3xl mb-1">${totalRevenue}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  Pending
                </span>
              </div>
              <div className="text-3xl mb-1">{pendingBookings}</div>
              <div className="text-sm text-gray-600">Pending Bookings</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Bookings Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg">Monthly Bookings</h3>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg">Revenue Trend</h3>
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Bookings */}
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
                  {bookings.slice(0, 5).map((booking) => (
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
        </div>
      </div>
    </div>
  );
}
