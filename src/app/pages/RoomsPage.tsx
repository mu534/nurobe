import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, X } from "lucide-react";
import { rooms } from "../data/hotelData";

export function RoomsPage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400]);
  const [roomType, setRoomType] = useState<string>("all");
  const [availability, setAvailability] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl text-gray-900">
              Nurobe Hotel
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link to="/rooms" className="text-gray-900">
                Rooms
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl mb-2">Our Rooms</h1>
          <p className="text-blue-100">Find your perfect accommodation</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-lg shadow"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>

          {/* Filters Sidebar */}
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

            {/* Price Range */}
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

            {/* Room Type */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm text-gray-700">Room Type</h3>
              <div className="space-y-2">
                {["all", "standard", "deluxe", "suite", "family"].map(
                  (type) => (
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
                  ),
                )}
              </div>
            </div>

            {/* Availability */}
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

            {/* Reset Filters */}
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

          {/* Room Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredRooms.length}{" "}
                {filteredRooms.length === 1 ? "room" : "rooms"} found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
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
                      {room.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                      <div>
                        <span className="text-2xl text-blue-600">
                          ${room.price}
                        </span>
                        <span className="text-gray-500 text-sm"> / night</span>
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
              ))}
            </div>

            {filteredRooms.length === 0 && (
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
