import { MapPin, Clock, Car, Mountain, Trees, Compass } from "lucide-react";

export const AttractionsSection = () => {
  const attractions = [
    {
      id: 1,
      name: "Sanetti Plateau",
      description:
        "The highest plateau in Africa, home to the rare Ethiopian wolf and stunning Afro-alpine landscapes.",
      image: "/images/sanetti-plateau.jpg",
      distance: "45 km",
      duration: "1.5 hours",
      category: "Nature & Wildlife",
      icon: Mountain,
    },
    {
      id: 2,
      name: "Harenna Forest",
      description:
        "One of Ethiopia's last remaining cloud forests, featuring pristine waterfalls and diverse wildlife.",
      image: "/images/harenna-forest.jpg",
      distance: "60 km",
      duration: "2 hours",
      category: "Forest & Hiking",
      icon: Trees,
    },
    {
      id: 3,
      name: "Sof Omar Caves",
      description:
        "Africa's longest cave system, offering an unforgettable underground adventure through natural chambers.",
      image: "/images/sof-omar.jpg",
      distance: "120 km",
      duration: "3 hours",
      category: "Adventure",
      icon: Compass,
    },
    {
      id: 4,
      name: "Bale Mountains National Park",
      description:
        "A UNESCO World Heritage site featuring dramatic mountain scenery and unique wildlife.",
      image: "/images/bale-mountains.jpg",
      distance: "35 km",
      duration: "1 hour",
      category: "National Park",
      icon: Mountain,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Compass className="w-4 h-4" />
            Explore the Region
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Nearby Attractions
          </h2>
          <p className="text-lg text-gray-600">
            Discover breathtaking natural wonders and cultural treasures
            surrounding Nurobe Hotel
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2">
                    <attraction.icon className="w-3.5 h-3.5" />
                    {attraction.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {attraction.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {attraction.description}
                </p>

                <div className="flex items-center gap-6 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      {attraction.distance}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Car className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      {attraction.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Full Day</span>
                  </div>
                </div>

                <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors flex items-center gap-2 group/btn">
                  Learn More
                  <svg
                    className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
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
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 lg:p-12 text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Explore?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our concierge team can help arrange tours and transportation to all
            nearby attractions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Concierge
            </a>

            <a
              href="/attractions"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white/20"
            >
              View All Attractions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
