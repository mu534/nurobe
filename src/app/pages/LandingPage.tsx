import { useState } from "react";
import { Link } from "react-router-dom";
import nurobe from "../../assets/images/nurobe.png";

import { Search, MapPin, Users, Calendar } from "lucide-react";
import { rooms } from "../data/hotelData";
import { GuestReviews } from "../components/GuestReviews";
import { HotelDescription } from "../components/HotelDescription";
import NavBar from "../components/NavBar";

export function LandingPage() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to rooms page with search params
    window.location.href = `/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;
  };

  const featuredRooms = rooms.filter((room) => room.available).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <img
          src={nurobe}
          alt="Nurobe Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl mb-4">
              Welcome to Nurobe Hotel
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Experience Ethiopian Hospitality in Bale Robe
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-10 mb-20">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-lg shadow-2xl p-4 md:p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </form>
      </section>
      <section>
        <HotelDescription />
      </section>

      {/* Featured Rooms */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Featured Rooms</h2>
          <p className="text-gray-600">
            Discover our most popular accommodations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <Link
              key={room.id}
              to={`/room/${room.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2">{room.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl text-blue-600">
                      ${room.price}
                    </span>
                    <span className="text-gray-500 text-sm"> / night</span>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/rooms"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            View All Rooms
          </Link>
        </div>
      </section>

      <GuestReviews />

      {/* About Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6">
                Your Home in Bale Robe
              </h2>
              <p className="text-gray-600 mb-4">
                Nurobe Hotel offers the perfect blend of modern comfort and
                Ethiopian hospitality. Located in the heart of Bale Robe, we
                provide easy access to local attractions while offering a
                peaceful retreat.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you're here for business or leisure, our dedicated staff
                ensures your stay is memorable. Experience authentic Ethiopian
                culture combined with world-class amenities.
              </p>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Bale Robe, Ethiopia</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Rooms</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl text-blue-600 mb-2">4.8</div>
                <div className="text-gray-600">Guest Rating</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Service</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Years</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl mb-4">Nurobe Hotel</h3>
              <p className="text-gray-400 text-sm">
                Experience the finest hospitality in Bale Robe, Ethiopia.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link to="/rooms" className="hover:text-white">
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-white">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Bale Robe, Ethiopia</li>
                <li>+251 123 456 789</li>
                <li>info@nurobehotel.com</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Hours</h4>
              <p className="text-gray-400 text-sm">
                24/7 Reception & Service
                <br />
                Check-in: 2:00 PM
                <br />
                Check-out: 12:00 PM
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Nurobe Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default LandingPage;
