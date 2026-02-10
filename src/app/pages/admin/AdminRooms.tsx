import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  Calendar,
  DollarSign,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Home,
} from "lucide-react";
import { rooms as initialRooms } from "../../data/hotelData";

export function AdminRooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(initialRooms);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((r) => r.id !== id));
    }
  };

  const toggleAvailability = (id: number) => {
    setRooms(
      rooms.map((r) => (r.id === id ? { ...r, available: !r.available } : r)),
    );
  };

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
            className="flex items-center gap-3 px-3 py-3 rounded-lg bg-blue-600 mb-1"
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
          <div className="px-8 py-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl text-gray-900">Room Management</h2>
              <p className="text-gray-600">
                Manage hotel rooms and availability
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Room
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl text-blue-600 mb-1">{rooms.length}</div>
              <div className="text-sm text-gray-600">Total Rooms</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl text-green-600 mb-1">
                {rooms.filter((r) => r.available).length}
              </div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl text-red-600 mb-1">
                {rooms.filter((r) => !r.available).length}
              </div>
              <div className="text-sm text-gray-600">Booked</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl text-purple-600 mb-1">
                {Math.round(
                  (rooms.filter((r) => !r.available).length / rooms.length) *
                    100,
                )}
                %
              </div>
              <div className="text-sm text-gray-600">Occupancy Rate</div>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    {room.available ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                        Available
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                        Booked
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg mb-1">{room.name}</h3>
                      <span className="text-sm text-gray-500 capitalize">
                        {room.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl text-blue-600">${room.price}</div>
                      <div className="text-xs text-gray-500">per night</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <div className="flex justify-between mb-1">
                      <span>Max Guests:</span>
                      <span>{room.maxGuests}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Size:</span>
                      <span>{room.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bed Type:</span>
                      <span className="text-xs">{room.bedType}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAvailability(room.id)}
                      className={`flex-1 py-2 rounded text-sm transition ${
                        room.available
                          ? "bg-red-50 text-red-700 hover:bg-red-100"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      {room.available ? "Mark Booked" : "Mark Available"}
                    </button>
                    <button
                      onClick={() =>
                        alert("Edit functionality would open a modal")
                      }
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="px-4 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Room Modal (Simple Placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl mb-4">Add New Room</h3>
            <p className="text-gray-600 mb-4">
              This would open a form to add a new room with all details.
            </p>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
