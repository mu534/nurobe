import React from "react";
import nurobe from "../../assets/images/nurobe.png";
import { Star, Clock, Building } from "lucide-react";

export const HotelDescription: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:flex md:items-center md:gap-12">
        {/* Text side */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Nurobe Hotel
          </h2>
          <p className="text-gray-700 mb-4 italic">
            Where Every Moment Becomes a Cherished Memory
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Nestled in the heart of Bale Robe, Nurobe Hotel combines **luxury,
            comfort, and local charm** to create an unforgettable stay. Our
            hotel is designed for travelers seeking both relaxation and
            adventure, offering spacious rooms, breathtaking views, and
            exceptional service.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            From our meticulously designed suites to our world-class amenities
            and services, every detail has been thoughtfully curated to create
            an unforgettable stay. Experience the perfect blend of comfort,
            adventure, and cultural immersion.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2 text-gray-800 font-semibold">
              <Building className="text-green-600" />
              50+ Luxury Rooms
            </div>
            <div className="flex items-center gap-2 text-gray-800 font-semibold">
              <Clock className="text-green-600" />
              24/7 Concierge Service
            </div>
            <div className="flex items-center gap-2 text-gray-800 font-semibold">
              <Star className="text-yellow-400" />
              4.9★ Guest Rating
            </div>
          </div>

          <button className="mt-8 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
            Explore Our Rooms
          </button>
        </div>

        {/* Image side */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={nurobe}
            alt="All Seasons Hotel"
            className="rounded-2xl shadow-xl object-cover w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};
