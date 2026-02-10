import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  Calendar,
  DollarSign,
  LogOut,
  TrendingUp,
  Download,
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { payments, bookings } from "../../data/hotelData";

export function AdminPayments() {
  const navigate = useNavigate();

  // Calculate totals
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = bookings
    .filter((b) => b.paymentStatus === "pending")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const completedPayments = payments.filter(
    (p) => p.status === "Completed",
  ).length;

  // Chart data
  const monthlyRevenue = [
    { month: "Jan", revenue: 3600 },
    { month: "Feb", revenue: 4200 },
    { month: "Mar", revenue: 3900 },
    { month: "Apr", revenue: 4900 },
    { month: "May", revenue: 4400 },
    { month: "Jun", revenue: 5400 },
  ];

  const paymentMethods = [
    { name: "Credit Card", value: 65 },
    { name: "Bank Transfer", value: 25 },
    { name: "Cash", value: 10 },
  ];

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981"];

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
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 mb-1"
          >
            <Calendar className="w-5 h-5" />
            Bookings
          </Link>
          <Link
            to="/admin/payments"
            className="flex items-center gap-3 px-3 py-3 rounded-lg bg-blue-600 mb-1"
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
          <div className="px-8 py-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl text-gray-900">Payments & Reports</h2>
              <p className="text-gray-600">
                Financial overview and payment history
              </p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* Revenue Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl mb-1">${totalRevenue}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="text-3xl mb-1">${pendingPayments}</div>
              <div className="text-sm text-gray-600">Pending Payments</div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl mb-1">{completedPayments}</div>
              <div className="text-sm text-gray-600">Completed Payments</div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl mb-1">
                ${(totalRevenue / 6).toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">Avg Monthly Revenue</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg mb-6">Monthly Revenue</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg mb-6">Payment Methods</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg">Payment History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">#{payment.id}</td>
                      <td className="px-6 py-4 text-sm">
                        BK-{payment.bookingId}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-green-600">
                          ${payment.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">{payment.method}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg mb-4">Financial Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">This Month</div>
                <div className="text-2xl text-blue-600">$5,400</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Last Month</div>
                <div className="text-2xl">$4,400</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Growth</div>
                <div className="text-2xl text-green-600">+22.7%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
