// src/app/components/GuestReviews.tsx
import React from "react";
import { Star, Quote } from "lucide-react";

import tola from "../../assets/images/tola.png";
import mechael from "../../assets/images/mechael.png";
import john from "../../assets/images/john.png";

interface Review {
  id: number;
  name: string;
  avatar: string;
  location?: string;
  rating: number;
  comment: string;
  date?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Tola Girma.",
    avatar: tola,
    location: "Addis Ababa, Ethiopia",
    rating: 5,
    comment:
      "Amazing experience! The hotel was clean, staff were super friendly, and the view was breathtaking.",
    date: "January 2026",
  },
  {
    id: 2,
    name: "John A.",
    avatar: john,
    location: "Cape Town, South Africa, ",
    rating: 4,
    comment:
      "Loved the hospitality. Rooms were spacious and comfortable. Definitely coming back!",
    date: "December 2025",
  },
  {
    id: 3,
    name: "Michael D.",
    avatar: mechael,
    location: "London, UK",
    rating: 5,
    comment:
      "Perfect location and service. Everything exceeded my expectations. Highly recommend!",
    date: "November 2025",
  },
];

export const GuestReviews: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-green-600 text-green-600" />
            Trusted by Travelers
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it — hear from travelers who've
            experienced Nurobe Hotel firsthand.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-green-600 opacity-20 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 transition-colors ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 leading-relaxed mb-6">
                "{review.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-green-100 group-hover:ring-green-200 transition-all"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  {review.location && (
                    <p className="text-sm text-gray-500">{review.location}</p>
                  )}
                  {review.date && (
                    <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-2 bg-white px-8 py-6 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <span className="text-4xl font-bold text-gray-900">4.9</span>
              <span className="text-gray-500">/5</span>
            </div>
            <p className="text-sm text-gray-600">
              Based on 500+ verified guest reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
