// src/app/components/GuestReviews.tsx
import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
      stiffness: 100,
    },
  }),
};

export const GuestReviews: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          What Our Guests Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.img
                  src={review.avatar}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {review.name}
              </h3>
              <div className="flex justify-center my-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Star
                      size={18}
                      className={`${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <motion.p
                className="text-gray-600 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {review.comment}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
