import React from "react";
import nurobe from "../../assets/images/nurobe.png";
import { Star, Clock, Building } from "lucide-react";
import { Link } from "react-router-dom";

export const HotelDescription: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Nurobe Hotel
                </span>
              </h2>
              <p className="text-xl text-gray-600 font-light">
                Where Every Moment Becomes a Cherished Memory
              </p>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Nestled in the heart of Bale Robe, Nurobe Hotel combines{" "}
                <span className="font-semibold text-gray-900">
                  luxury, comfort, and local charm
                </span>{" "}
                to create an unforgettable stay. Our hotel is designed for
                travelers seeking both relaxation and adventure, offering
                spacious rooms, breathtaking views, and exceptional service.
              </p>
              <p>
                From our meticulously designed suites to our world-class
                amenities and services, every detail has been thoughtfully
                curated to create an unforgettable stay. Experience the perfect
                blend of comfort, adventure, and cultural immersion.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">50+</p>
                  <p className="text-sm text-gray-600">Luxury Rooms</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-600">Concierge</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.9</p>
                  <p className="text-sm text-gray-600">Guest Rating</p>
                </div>
              </div>
            </div>

            <button className="group mt-8 inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all hover:gap-3 shadow-lg hover:shadow-xl">
              <Link to="/rooms">Explore Our Rooms</Link>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-200 to-emerald-200 rounded-3xl blur-3xl opacity-20 -z-10"></div>
            <img
              src={nurobe}
              alt="Nurobe Hotel"
              className="rounded-3xl shadow-2xl object-cover w-full aspect-[5/5] hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
