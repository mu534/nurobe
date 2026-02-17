import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Sidebar } from "../../components/admin/Sidebar";
import { StatsCard } from "../../components/admin/StatsCard";
import { RoomCard } from "../../components/admin/RoomCard";
import type { Room } from "../../../types/types";

import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../../../api/rooms";

export function AdminRooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch rooms from backend
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      console.error("Failed to load rooms:", error);
      alert("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Delete room
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    try {
      await deleteRoom(id);
      setRooms(rooms.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Failed to delete room:", error);
      alert("Failed to delete room");
    }
  };

  // Toggle availability
  const toggleAvailability = async (id: number) => {
    try {
      const room = rooms.find((r) => r.id === id);
      if (!room) return;

      const updatedRoom = await updateRoom({
        ...room,
        available: !room.available,
      });
      setRooms(rooms.map((r) => (r.id === id ? updatedRoom : r)));
    } catch (error) {
      console.error("Failed to toggle availability:", error);
      alert("Failed to update room availability");
    }
  };

  const [newRoom, setNewRoom] = useState<Omit<Room, "id">>({
    name: "",
    type: "",
    price: 0,
    image: "",
    available: true,
    maxGuests: 1,
    size: "",
    bedType: "",
  });

  const handleAddRoom = async () => {
    try {
      const createdRoom = await createRoom(newRoom);
      setRooms([...rooms, createdRoom]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to create room:", error);
      alert("Failed to create room");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar active="Rooms" onLogout={() => navigate("/login")} />

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
          {loading ? (
            <p>Loading rooms...</p>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatsCard
                  value={rooms.length}
                  label="Total Rooms"
                  color="text-blue-600"
                  icon={undefined}
                />
                <StatsCard
                  value={rooms.filter((r) => r.available).length}
                  label="Available"
                  color="text-green-600"
                  icon={undefined}
                />
                <StatsCard
                  value={rooms.filter((r) => !r.available).length}
                  label="Booked"
                  color="text-red-600"
                  icon={undefined}
                />
                <StatsCard
                  value={`${Math.round(
                    (rooms.filter((r) => !r.available).length / rooms.length) *
                      100,
                  )}%`}
                  label="Occupancy Rate"
                  color="text-purple-600"
                  icon={undefined}
                />
              </div>

              {/* Rooms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onToggleAvailability={toggleAvailability}
                    onDelete={handleDelete}
                    onEdit={(id) => alert("Edit modal for room " + id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Room Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <h3 className="text-xl font-semibold">Add New Room</h3>

            {/* Room Name */}
            <input
              type="text"
              placeholder="Room Name"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              className="w-full border p-2 rounded"
            />

            {/* Type */}
            <input
              type="text"
              placeholder="Room Type (e.g., Deluxe)"
              value={newRoom.type}
              onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
              className="w-full border p-2 rounded"
            />

            {/* Capacity */}
            <input
              type="number"
              placeholder="Capacity"
              value={newRoom.maxGuests}
              onChange={(e) =>
                setNewRoom({ ...newRoom, maxGuests: Number(e.target.value) })
              }
              className="w-full border p-2 rounded"
            />

            {/* Price */}
            <input
              type="number"
              placeholder="Price"
              value={newRoom.price}
              onChange={(e) =>
                setNewRoom({ ...newRoom, price: Number(e.target.value) })
              }
              className="w-full border p-2 rounded"
            />

            {/* Size */}
            <input
              type="text"
              placeholder="Size (e.g., 25 m²)"
              value={newRoom.size}
              onChange={(e) => setNewRoom({ ...newRoom, size: e.target.value })}
              className="w-full border p-2 rounded"
            />

            {/* Bed Type */}
            <input
              type="text"
              placeholder="Bed Type (e.g., Queen)"
              value={newRoom.bedType}
              onChange={(e) =>
                setNewRoom({ ...newRoom, bedType: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            {/* Image URL */}
            <input
              type="text"
              placeholder="Image URL"
              value={newRoom.image}
              onChange={(e) =>
                setNewRoom({ ...newRoom, image: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={handleAddRoom}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Add Room
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-300 text-gray-900 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
