import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Download } from "lucide-react";
import { Sidebar } from "../../components/admin/Sidebar";
import { RevenueChart } from "../../components/admin/RevenueChart";
import { PaymentMethodsChart } from "../../components/admin/PaymentMethodsChart";
import { PaymentHistory } from "../../components/admin/PaymentHistory";
import { getBookings } from "../../../api/bookings";
import type { Booking } from "../../../types/types";

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-semibold">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}

// ================= Helpers =================

function buildMonthlyRevenue(
  bookings: Booking[],
): { month: string; revenue: number }[] {
  const now = new Date();
  const months: { month: string; revenue: number }[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString("en-US", { month: "short" });
    const revenue = bookings
      .filter((b) => {
        if (b.status === "cancelled") return false;
        const created = new Date(b.createdAt);
        return (
          created.getMonth() === d.getMonth() &&
          created.getFullYear() === d.getFullYear()
        );
      })
      .reduce((sum, b) => sum + b.totalPrice, 0);
    months.push({ month: label, revenue: Math.round(revenue) });
  }

  return months;
}

function buildPaymentMethods(
  bookings: Booking[],
): { name: string; value: number }[] {
  // Since we don't track payment method per booking yet, show by payment status
  const paid = bookings.filter((b) => b.paymentStatus === "paid").length;
  const unpaid = bookings.filter((b) => b.paymentStatus === "unpaid").length;
  const refunded = bookings.filter(
    (b) => b.paymentStatus === "refunded",
  ).length;
  const total = bookings.length || 1;

  return [
    { name: "Paid", value: Math.round((paid / total) * 100) },
    { name: "Unpaid", value: Math.round((unpaid / total) * 100) },
    { name: "Refunded", value: Math.round((refunded / total) * 100) },
  ].filter((d) => d.value > 0);
}

const COLORS = ["#10b981", "#f59e0b", "#8b5cf6"];

// ================= Component =================

export function AdminPayments() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings()
      .then(setBookings)
      .catch((err) => console.error("Failed to load bookings:", err))
      .finally(() => setLoading(false));
  }, []);

  // ====== Derived stats ======
  const activeBookings = bookings.filter((b) => b.status !== "cancelled");

  const totalRevenue = activeBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingAmount = bookings
    .filter((b) => b.paymentStatus === "unpaid" && b.status !== "cancelled")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const paidCount = bookings.filter((b) => b.paymentStatus === "paid").length;

  const avgMonthly = totalRevenue / 6;

  const monthlyRevenue = buildMonthlyRevenue(bookings);
  const paymentMethods = buildPaymentMethods(bookings);

  const handleExport = () => {
    const rows = [
      [
        "Confirmation",
        "Guest",
        "Email",
        "Room",
        "Check-in",
        "Check-out",
        "Nights",
        "Total",
        "Status",
        "Payment",
      ],
      ...bookings.map((b) => [
        b.confirmationNo,
        b.guestName,
        b.email,
        b.room?.name ?? `Room #${b.roomId}`,
        new Date(b.checkIn).toLocaleDateString(),
        new Date(b.checkOut).toLocaleDateString(),
        b.nights,
        b.totalPrice.toFixed(2),
        b.status,
        b.paymentStatus,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar active="Payments" onLogout={() => navigate("/login")} />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Payments & Reports</h2>
            <p className="text-blue-100 text-sm mt-1">
              Financial overview and payment history
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading payment data...</p>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard
                  icon={<DollarSign className="w-6 h-6 text-green-600" />}
                  value={`$${totalRevenue.toFixed(2)}`}
                  label="Total Revenue"
                />
                <StatCard
                  icon={<DollarSign className="w-6 h-6 text-yellow-600" />}
                  value={`$${pendingAmount.toFixed(2)}`}
                  label="Pending Payments"
                />
                <StatCard
                  icon={<DollarSign className="w-6 h-6 text-blue-600" />}
                  value={paidCount}
                  label="Paid Bookings"
                />
                <StatCard
                  icon={<DollarSign className="w-6 h-6 text-purple-600" />}
                  value={`$${avgMonthly.toFixed(0)}`}
                  label="Avg Monthly Revenue"
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <RevenueChart data={monthlyRevenue} />
                <PaymentMethodsChart data={paymentMethods} colors={COLORS} />
              </div>

              {/* Payment History Table */}
              <PaymentHistory bookings={bookings} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
