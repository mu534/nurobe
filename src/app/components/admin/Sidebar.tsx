import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  Calendar,
  DollarSign,
  LogOut,
  Home,
} from "lucide-react";

export function Sidebar({ active = "payments" }: { active?: string }) {
  const navigate = useNavigate();

  const links = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
    { label: "Rooms", icon: BedDouble, to: "/admin/rooms" },
    { label: "Bookings", icon: Calendar, to: "/admin/bookings" },
    { label: "Payments", icon: DollarSign, to: "/admin/payments" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
      <div className="p-6 text-2xl">Nurobe Admin</div>
      <nav className="px-3">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = active.toLowerCase() === link.label.toLowerCase();
          return (
            <Link
              key={link.label}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
        <div className="border-t border-gray-700 my-4"></div>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 mb-1"
        >
          <Home className="w-5 h-5" /> View Website
        </Link>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 w-full text-left"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </nav>
    </aside>
  );
}
