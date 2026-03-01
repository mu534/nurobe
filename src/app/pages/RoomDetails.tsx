import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Wifi,
  Tv,
  Wind,
  Bath,
  ConciergeBell,
  UtensilsCrossed,
  Coffee,
  Armchair,
  Users,
  Maximize,
  BedDouble,
} from "lucide-react";
import { getRoomById } from "../../api/rooms";
import type { Room } from "../../types/types";
import { getRoomImages, getRoomAmenities } from "../../types/types";
import NavBar from "../components/NavBar";

function generateDescription(room: Room): string {
  return `${room.name} features a ${room.bedType.toLowerCase()} in a ${room.size} space, accommodating up to ${room.maxGuests} guests. Enjoy a comfortable and memorable stay with modern amenities and a peaceful atmosphere.`;
}

const AMENITY_ICONS: Record<string, React.ElementType> = {
  WiFi: Wifi,
  TV: Tv,
  "Air Conditioning": Wind,
  "Private Bathroom": Bath,
  "Room Service": ConciergeBell,
  "Breakfast Included": UtensilsCrossed,
  "Coffee Maker": Coffee,
  Balcony: Armchair,
};

export function RoomDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  useEffect(() => {
    getRoomById(Number(id))
      .then(setRoom)
      .catch((err) => console.error("Failed to load room:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading room...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Room not found</h1>
          <Link to="/rooms" className="text-blue-600 hover:underline">
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const gallery = getRoomImages(room);
  const amenities = getRoomAmenities(room);

  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1,
    );
  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1,
    );

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }
    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    if (nights <= 0) {
      alert("Check-out date must be after check-in date");
      return;
    }
    navigate(
      `/booking?roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`,
    );
  };

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8 pt-32">
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Rooms
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg overflow-hidden shadow mb-6">
              <div
                className="relative w-full bg-gray-100"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={gallery[currentImageIndex]}
                  alt={`${room.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition ${idx === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="p-4 grid grid-cols-2 gap-3">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative rounded overflow-hidden bg-gray-100 ${idx === currentImageIndex ? "ring-2 ring-blue-600" : ""}`}
                      style={{ aspectRatio: "16/9" }}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Details */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl mb-2">{room.name}</h1>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize">
                    {room.type}
                  </span>
                </div>
                {room.available ? (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Available
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    Booked
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Up to {room.maxGuests} guests</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Maximize className="w-5 h-5" />
                  <span className="text-sm">{room.size}</span>
                </div>
                <div className="col-span-2 text-gray-600 text-sm flex items-center gap-2">
                  <BedDouble className="w-5 h-5" />
                  {room.bedType}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {generateDescription(room)}
                </p>
              </div>

              {/* Amenities — from API */}
              {amenities.length > 0 && (
                <div>
                  <h2 className="text-xl mb-4">Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {amenities.map((amenity, idx) => {
                      const Icon = AMENITY_ICONS[amenity] || Wifi;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <Icon className="w-5 h-5 text-blue-600" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl text-blue-600">${room.price}</span>
                  <span className="text-gray-500">per night</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from(
                      { length: room.maxGuests },
                      (_, i) => i + 1,
                    ).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {checkIn && checkOut && nights > 0 && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">
                      ${room.price} × {nights} nights
                    </span>
                    <span className="text-gray-900">
                      ${room.price * nights}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span>Total</span>
                    <span className="text-lg">${room.price * nights}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleReserve}
                disabled={!room.available}
                className={`w-full py-4 rounded-lg text-white transition ${
                  room.available
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {room.available ? "Reserve Now" : "Not Available"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
