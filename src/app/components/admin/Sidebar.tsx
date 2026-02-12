// Sidebar.tsx
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  Calendar,
  DollarSign,
  LogOut,
  Home,
} from "lucide-react";

interface SidebarProps {
  active?: string;
  onLogout: () => void;
}

export function Sidebar({ active, onLogout }: SidebarProps) {
  const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/rooms", label: "Rooms", icon: BedDouble },
    { to: "/admin/bookings", label: "Bookings", icon: Calendar },
    { to: "/admin/payments", label: "Payments", icon: DollarSign },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl">Nurobe Admin</h1>
      </div>
      <nav className="px-3">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 ${
              active === label ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
        <div className="border-t border-gray-700 my-4"></div>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 mb-1"
        >
          <Home className="w-5 h-5" />
          View Website
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
