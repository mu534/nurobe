import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect } from "react";
import { MapPin, Clock, Car, type LucideIcon } from "lucide-react";

interface ExpandableCardProps {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  image: string;
  distance: string;
  duration: string;
  category: string;
  icon: LucideIcon;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ExpandableCard = ({
  name,
  description,
  fullDescription,
  image,
  distance,
  duration,
  category,
  icon: Icon,
  isOpen,
  onOpen,
  onClose,
}: ExpandableCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll into view when opened
  useEffect(() => {
    if (isOpen && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Card */}
      <motion.div
        ref={cardRef}
        layout
        className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2">
              <Icon className="w-3.5 h-3.5" />
              {category}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white">{name}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">{description}</p>

          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm">{distance}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Car className="w-4 h-4 text-blue-600" />
              <span className="text-sm">{duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Full Day</span>
            </div>
          </div>

          <button
            onClick={onOpen}
            className="text-blue-600 font-semibold text-sm hover:text-blue-700"
          >
            Learn More →
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              layout
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-64 object-cover"
              />

              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4">{name}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {fullDescription}
                </p>

                <button
                  onClick={onClose}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExpandableCard;
