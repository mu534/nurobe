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
  const images = room.image ? room.image.split(",").filter(Boolean) : [];
  const firstImage = images[0];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {/* Image — full visible, no crop, matches client side */}
      <div
        className="relative w-full bg-gray-100"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src={firstImage}
          alt={room.name}
          className="w-full h-full object-contain hover:scale-105 transition duration-500"
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
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg">{room.name}</h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
              {room.type}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xl text-blue-600">${room.price}</div>
            <div className="text-xs text-gray-500">per night</div>
          </div>
        </div>

        {/* Room info badges — same style as client */}
        <div className="flex flex-wrap gap-1 my-3">
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
            {room.bedType}
          </span>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
            {room.size}
          </span>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
            Max {room.maxGuests} guests
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 border-t pt-4">
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
