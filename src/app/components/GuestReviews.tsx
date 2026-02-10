// src/app/components/GuestReviews.tsx
import React from "react";
import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  avatar: string; // image path or URL
  rating: number; // out of 5
  comment: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Amanuel T.",
    avatar: "/images/guest1.jpg",
    rating: 5,
    comment:
      "Amazing experience! The hotel was clean, staff were super friendly, and the view was breathtaking.",
  },
  {
    id: 2,
    name: "Sara K.",
    avatar: "/images/guest2.jpg",
    rating: 4,
    comment:
      "Loved the hospitality. Rooms were spacious and comfortable. Definitely coming back!",
  },
  {
    id: 3,
    name: "Michael D.",
    avatar: "/images/guest3.jpg",
    rating: 5,
    comment:
      "Perfect location and service. Everything exceeded my expectations. Highly recommend!",
  },
];

export const GuestReviews: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          What Our Guests Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {review.name}
              </h3>
              <div className="flex justify-center my-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
