import { Sidebar } from "../../components/admin/Sidebar";
import { StatsCard } from "../../components/admin/StatsCard";
import { BookingsChart } from "../../components/admin/BookingsChart";
import { RevenueChart } from "../../components/admin/RevenueChart";
import { RecentBookings } from "../../components/admin/RecentBookings";
import { Calendar, BedDouble, DollarSign, Users } from "lucide-react";
import { bookings, rooms } from "../../data/hotelData";

export function AdminDashboard() {
  const totalBookings = bookings.length;
  const occupiedRooms = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "checked-in",
  ).length;
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

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
      <Sidebar />
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
            <StatsCard
              icon={<Calendar className="w-6 h-6 text-blue-600" />}
              value={totalBookings}
              label="Total Bookings"
              badge="+12%"
            />
            <StatsCard
              icon={<BedDouble className="w-6 h-6 text-green-600" />}
              value={occupiedRooms}
              label="Occupied Rooms"
              badge={`${Math.round((occupiedRooms / rooms.length) * 100)}%`}
              badgeColor="bg-blue-100 text-blue-800"
            />
            <StatsCard
              icon={<DollarSign className="w-6 h-6 text-purple-600" />}
              value={`$${totalRevenue}`}
              label="Total Revenue"
              badge="+8%"
            />
            <StatsCard
              icon={<Users className="w-6 h-6 text-orange-600" />}
              value={pendingBookings}
              label="Pending Bookings"
              badge="Pending"
              badgeColor="bg-orange-100 text-orange-800"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <BookingsChart data={monthlyData} />
            <RevenueChart data={monthlyData} />
          </div>

          {/* Recent Bookings */}
          <RecentBookings />
        </div>
      </div>
    </div>
  );
}
