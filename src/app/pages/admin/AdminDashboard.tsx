import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, BedDouble, DollarSign, Users } from "lucide-react";
import { Sidebar } from "../../components/admin/Sidebar";
import { StatsCard } from "../../components/admin/StatsCard";
import { BookingsChart } from "../../components/admin/BookingsChart";
import { RevenueChart } from "../../components/admin/RevenueChart";
import { RecentBookings } from "../../components/admin/RecentBookings";
import { getBookings } from "../../../api/bookings";
import { getRooms } from "../../../api/rooms";
import type { Booking, Room } from "../../../types/types";

// ================= Helpers =================

function buildMonthlyData(
  bookings: Booking[],
): { month: string; bookings: number; revenue: number }[] {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const label = d.toLocaleString("en-US", { month: "short" });
    const monthBookings = bookings.filter((b) => {
      if (b.status === "cancelled") return false;
      const created = new Date(b.createdAt);
      return (
        created.getMonth() === d.getMonth() &&
        created.getFullYear() === d.getFullYear()
      );
    });
    return {
      month: label,
      bookings: monthBookings.length,
      revenue: Math.round(
        monthBookings.reduce((sum, b) => sum + b.totalPrice, 0),
      ),
    };
  });
}

// ================= Component =================

export function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getBookings(), getRooms()])
      .then(([b, r]) => {
        setBookings(b);
        setRooms(r);
      })
      .catch((err) => console.error("Failed to load dashboard data:", err))
      .finally(() => setLoading(false));
  }, []);

  // ====== Derived stats ======
  const totalBookings = bookings.length;

  const occupiedRooms = rooms.filter((r) => !r.available).length;
  const totalRooms = rooms.length;
  const occupancyRate =
    totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const totalRevenue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  const monthlyData = buildMonthlyData(bookings);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar active="Dashboard" onLogout={() => navigate("/login")} />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-8">
          <h2 className="text-2xl">Dashboard Overview</h2>
          <p className="text-blue-100 text-sm mt-1">Welcome back, Admin</p>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading dashboard...</p>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                  icon={<Calendar className="w-6 h-6 text-blue-600" />}
                  value={totalBookings}
                  label="Total Bookings"
                  badge={`${
                    bookings.filter((b) => {
                      const d = new Date(b.createdAt);
                      const now = new Date();
                      return (
                        d.getMonth() === now.getMonth() &&
                        d.getFullYear() === now.getFullYear()
                      );
                    }).length
                  } this month`}
                  badgeColor="bg-blue-100 text-blue-800"
                  bgColor="bg-blue-100"
                />
                <StatsCard
                  icon={<BedDouble className="w-6 h-6 text-green-600" />}
                  value={occupiedRooms}
                  label="Occupied Rooms"
                  badge={`${occupancyRate}% occupancy`}
                  badgeColor="bg-green-100 text-green-800"
                  bgColor="bg-green-100"
                />
                <StatsCard
                  icon={<DollarSign className="w-6 h-6 text-purple-600" />}
                  value={`$${totalRevenue.toFixed(0)}`}
                  label="Total Revenue"
                  badge={`$${Math.round(totalRevenue / (monthlyData.filter((m) => m.revenue > 0).length || 1))} avg/mo`}
                  badgeColor="bg-purple-100 text-purple-800"
                  bgColor="bg-purple-100"
                />
                <StatsCard
                  icon={<Users className="w-6 h-6 text-orange-600" />}
                  value={pendingBookings}
                  label="Pending Bookings"
                  badge="Needs action"
                  badgeColor="bg-orange-100 text-orange-800"
                  bgColor="bg-orange-100"
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <BookingsChart data={monthlyData} />
                <RevenueChart data={monthlyData} />
              </div>

              {/* Recent Bookings */}
              <RecentBookings bookings={bookings} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
