import { Sidebar } from "../../components/admin/Sidebar";
import { Header } from "../../components/admin/Header";
import { StatsCard } from "../../components/admin/StatsCard";
import { RevenueChart } from "../../components/admin/RevenueChart";
import { PaymentMethodsChart } from "../../components/admin/PaymentMethodsChart";
import { PaymentHistory } from "../../components/admin/PaymentHistory";
import { payments, bookings } from "../../data/hotelData";
import { DollarSign, Download } from "lucide-react";

export function AdminPayments() {
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = bookings
    .filter((b) => b.paymentStatus === "pending")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const completedPayments = payments.filter(
    (p) => p.status === "Completed",
  ).length;

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
      <Sidebar active="payments" />
      <div className="flex-1 overflow-auto">
        <Header
          title="Payments & Reports"
          subtitle="Financial overview and payment history"
          action={
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Download className="w-5 h-5" /> Export Report
            </button>
          }
        />

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={<DollarSign className="w-6 h-6 text-green-600" />}
              value={`$${totalRevenue}`}
              label="Total Revenue"
            />
            <StatsCard
              icon={<DollarSign className="w-6 h-6 text-yellow-600" />}
              value={`$${pendingPayments}`}
              label="Pending Payments"
            />
            <StatsCard
              icon={<DollarSign className="w-6 h-6 text-blue-600" />}
              value={completedPayments}
              label="Completed Payments"
            />
            <StatsCard
              icon={<DollarSign className="w-6 h-6 text-purple-600" />}
              value={`$${(totalRevenue / 6).toFixed(0)}`}
              label="Avg Monthly Revenue"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RevenueChart data={monthlyRevenue} />
            <PaymentMethodsChart data={paymentMethods} colors={COLORS} />
          </div>

          <PaymentHistory />
        </div>
      </div>
    </div>
  );
}
