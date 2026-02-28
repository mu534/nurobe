import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, X } from "lucide-react";
import NavBar from "../components/NavBar";
import { getRooms } from "../../api/rooms";
import type { Room } from "../../types/types";

function generateDescription(room: Room): string {
  return `${room.name} features a ${room.bedType.toLowerCase()} in a ${room.size} space, accommodating up to ${room.maxGuests} guests. A perfect choice for a comfortable and memorable stay.`;
}

export function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400]);
  const [roomType, setRoomType] = useState<string>("all");
  const [availability, setAvailability] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getRooms()
      .then(setRooms)
      .catch((err) => console.error("Failed to load rooms:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const priceMatch =
      room.price >= priceRange[0] && room.price <= priceRange[1];
    const typeMatch = roomType === "all" || room.type === roomType;
    const availabilityMatch =
      availability === "all" ||
      (availability === "available" && room.available) ||
      (availability === "booked" && !room.available);
    return priceMatch && typeMatch && availabilityMatch;
  });

  const roomTypes = ["all", ...Array.from(new Set(rooms.map((r) => r.type)))];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 pt-32">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl mb-2">Our Rooms</h1>
          <p className="text-blue-100">Find your perfect accommodation</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-lg shadow"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>

          <aside
            className={`
            ${showFilters ? "block" : "hidden"} lg:block
            lg:w-64 bg-white rounded-lg shadow p-6 h-fit
            fixed lg:sticky top-4 left-4 right-4 z-20 lg:z-auto
            max-h-[90vh] overflow-y-auto
          `}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-sm text-gray-700">Price Range</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="400"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-sm text-gray-700">Room Type</h3>
              <div className="space-y-2">
                {roomTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="roomType"
                      checked={roomType === type}
                      onChange={() => setRoomType(type)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-sm text-gray-700">Availability</h3>
              <div className="space-y-2">
                {["all", "available", "booked"].map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === status}
                      onChange={() => setAvailability(status)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setPriceRange([0, 400]);
                setRoomType("all");
                setAvailability("all");
              }}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm"
            >
              Reset Filters
            </button>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredRooms.length}{" "}
                {filteredRooms.length === 1 ? "room" : "rooms"} found
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Loading rooms...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRooms.map((room) => {
                  const images = room.image
                    ? room.image.split(",").filter(Boolean)
                    : [];
                  const firstImage = images[0];

                  return (
                    <div
                      key={room.id}
                      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                    >
                      {/* Single image, fully visible like Canva */}
                      <div
                        className="relative w-full bg-gray-100"
                        style={{ aspectRatio: "16/9" }}
                      >
                        <img
                          src={firstImage}
                          alt={room.name}
                          className="w-full h-full object-contain hover:scale-105 transition duration-500"
                        />
                        {!room.available && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                            Booked
                          </div>
                        )}
                        {room.available && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                            Available
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg">{room.name}</h3>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                            {room.type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {generateDescription(room)}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
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
                        <div className="flex items-center justify-between border-t pt-4">
                          <div>
                            <span className="text-2xl text-blue-600">
                              ${room.price}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {" "}
                              / night
                            </span>
                          </div>
                          <Link
                            to={`/room/${room.id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!loading && filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No rooms match your filters
                </p>
                <button
                  onClick={() => {
                    setPriceRange([0, 400]);
                    setRoomType("all");
                    setAvailability("all");
                  }}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
