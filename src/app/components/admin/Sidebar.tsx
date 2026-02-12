import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  Calendar,
  DollarSign,
  LogOut,
  Home,
} from "lucide-react";

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl">Nurobe Admin</h1>
      </div>
      <nav className="px-3">
        <Link
          to="/admin"
          className="flex items-center gap-3 px-3 py-3 rounded-lg bg-blue-600 mb-1"
        >
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Link>
        <Link
          to="/admin/rooms"
          className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 mb-1"
        >
          <BedDouble className="w-5 h-5" /> Rooms
        </Link>
        <Link
          to="/admin/bookings"
          className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 mb-1"
        >
          <Calendar className="w-5 h-5" /> Bookings
        </Link>
        <Link
          to="/admin/payments"
          className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 mb-1"
        >
          <DollarSign className="w-5 h-5" /> Payments
        </Link>
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
