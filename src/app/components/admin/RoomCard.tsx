import { Edit, Trash2 } from "lucide-react";
import type { Room } from "../../../types/types";

interface RoomCardProps {
  room: Room;
  onToggleAvailability: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export function RoomCard({
  room,
  onToggleAvailability,
  onDelete,
  onEdit,
}: RoomCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative h-48">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs ${
              room.available
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {room.available ? "Available" : "Booked"}
          </span>
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
            onClick={() => onToggleAvailability(room.id)}
            className={`flex-1 py-2 rounded text-sm transition ${
              room.available
                ? "bg-red-50 text-red-700 hover:bg-red-100"
                : "bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            {room.available ? "Mark Booked" : "Mark Available"}
          </button>
          <button
            onClick={() => onEdit(room.id)}
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(room.id)}
            className="px-4 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
