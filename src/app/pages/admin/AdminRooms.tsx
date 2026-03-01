import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Sidebar } from "../../components/admin/Sidebar";
import { RoomCard } from "../../components/admin/RoomCard";
import { RoomFormModal } from "../../components/admin/RoomFormModal";
import type { Room } from "../../../types/types";

import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../../../api/rooms";

type RoomPayload = FormData;

function StatCard({
  value,
  label,
  color,
}: {
  value: string | number;
  label: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-1">
      <span className={`text-3xl font-semibold ${color}`}>{value}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}

export function AdminRooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

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

  const toggleAvailability = async (id: number) => {
    try {
      const room = rooms.find((r) => r.id === id);
      if (!room) return;
      const updatedRoom = await updateRoom(
        id,
        { ...room, available: !room.available },
        () => {},
      );
      setRooms((prev) => prev.map((r) => (r.id === id ? updatedRoom : r)));
    } catch (error) {
      console.error("Failed to toggle availability:", error);
      alert("Failed to update room availability");
    }
  };

  const handleAddRoom = async (
    data: RoomPayload,
    onProgress: (progress: number) => void,
  ) => {
    try {
      const createdRoom = await createRoom(data, onProgress);
      setRooms((prev) => [...prev, createdRoom]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to create room:", error);
      alert("Failed to create room");
    }
  };

  const handleUpdateRoom = async (
    data: RoomPayload,
    onProgress: (progress: number) => void,
  ) => {
    if (!editingRoom) return;
    try {
      const updatedRoom = await updateRoom(editingRoom.id, data, onProgress);
      setRooms((prev) =>
        prev.map((r) => (r.id === editingRoom.id ? updatedRoom : r)),
      );
      setEditingRoom(null);
    } catch (error) {
      console.error("Failed to update room:", error);
      alert("Failed to update room");
    }
  };

  const occupancyRate =
    rooms.length === 0
      ? "0%"
      : `${Math.round((rooms.filter((r) => !r.available).length / rooms.length) * 100)}%`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar active="Rooms" onLogout={() => navigate("/login")} />

      <div className="flex-1 overflow-auto">
        {/* Header — matches client page header style */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl">Room Management</h2>
              <p className="text-blue-100 text-sm mt-1">
                Manage hotel rooms and availability
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Room
            </button>
          </div>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading rooms...</p>
            </div>
          ) : (
            <>
              {/* Stats — same card style as client */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard
                  value={rooms.length}
                  label="Total Rooms"
                  color="text-blue-600"
                />
                <StatCard
                  value={rooms.filter((r) => r.available).length}
                  label="Available"
                  color="text-green-600"
                />
                <StatCard
                  value={rooms.filter((r) => !r.available).length}
                  label="Booked"
                  color="text-red-600"
                />
                <StatCard
                  value={occupancyRate}
                  label="Occupancy Rate"
                  color="text-purple-600"
                />
              </div>

              {/* Rooms Grid */}
              {rooms.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No rooms yet</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 text-blue-600 hover:underline"
                  >
                    Add your first room
                  </button>
                </div>
              ) : (
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
              )}
            </>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <RoomFormModal
        key={editingRoom?.id ?? "edit"}
        isOpen={!!editingRoom}
        onClose={() => setEditingRoom(null)}
        onSubmit={handleUpdateRoom}
        initialData={editingRoom ?? undefined}
      />

      {/* Add Modal */}
      <RoomFormModal
        key="add"
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddRoom}
      />
    </div>
  );
}
