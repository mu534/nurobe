import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Sidebar } from "../../components/admin/Sidebar";
import { StatsCard } from "../../components/admin/StatsCard";
import { RoomCard } from "../../components/admin/RoomCard";
import { RoomFormModal } from "../../components/admin/RoomFormModal";
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
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Fetch rooms
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

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      await deleteRoom(id);
      setRooms((prev) => prev.filter((r) => r.id !== id));
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

      setRooms((prev) => prev.map((r) => (r.id === id ? updatedRoom : r)));
    } catch (error) {
      console.error("Failed to toggle availability:", error);
      alert("Failed to update room availability");
    }
  };

  // Add room
  const handleAddRoom = async (data: Omit<Room, "id">) => {
    try {
      const createdRoom = await createRoom(data);
      setRooms((prev) => [...prev, createdRoom]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to create room:", error);
      alert("Failed to create room");
    }
  };

  // Update room
  const handleUpdateRoom = async (data: Omit<Room, "id">) => {
    if (!editingRoom) return;

    try {
      const updatedRoom = await updateRoom({
        ...editingRoom,
        ...data,
      });

      setRooms((prev) =>
        prev.map((r) => (r.id === editingRoom.id ? updatedRoom : r)),
      );

      setEditingRoom(null);
    } catch (error) {
      console.error("Failed to update room:", error);
      alert("Failed to update room");
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
                  value={
                    rooms.length === 0
                      ? "0%"
                      : `${Math.round(
                          (rooms.filter((r) => !r.available).length /
                            rooms.length) *
                            100,
                        )}%`
                  }
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
                    onEdit={(id) => {
                      const roomToEdit = rooms.find((r) => r.id === id);
                      if (roomToEdit) setEditingRoom(roomToEdit);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Room Modal */}
      <RoomFormModal
        key={editingRoom?.id ?? "add"}
        isOpen={!!editingRoom}
        onClose={() => setEditingRoom(null)}
        onSubmit={handleUpdateRoom}
        initialData={editingRoom ?? undefined}
      />

      <RoomFormModal
        key="add-room"
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddRoom}
      />
    </div>
  );
}
