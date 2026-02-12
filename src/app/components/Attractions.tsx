import { useState } from "react";
import { Mountain, Trees, Compass } from "lucide-react";
import ExpandableCard from "./ExpandableCard";

import sanetti from "../../assets/images/sanetti.png";
import harena from "../../assets/images/harena.png";
import sofumar from "../../assets/images/sofumar.png";
import balemountain from "../../assets/images/balemountain.png";
import { Link } from "react-router-dom";

const AttractionsSection = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const attractions = [
    {
      id: 1,
      name: "Sanetti Plateau",
      description:
        "The highest plateau in Africa, home to the rare Ethiopian wolf and stunning Afro-alpine landscapes.",
      fullDescription:
        "Sanetti Plateau rises above 4,000 meters and offers breathtaking panoramic views across Bale Mountains National Park. Visitors can explore Afro-alpine vegetation, spot Ethiopian wolves, mountain nyala, and experience dramatic landscapes unlike anywhere else in Africa.",
      image: sanetti,
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
      fullDescription:
        "Harenna Forest is a magical cloud forest ecosystem rich with biodiversity. Visitors can hike through mist-covered trails, discover hidden waterfalls, and experience rare wildlife species including endemic birds and monkeys.",
      image: harena,
      distance: "60 km",
      duration: "2 hours",
      category: "Forest & Hiking",
      icon: Trees,
    },
    {
      id: 3,
      name: "Sof Omar Caves",
      description:
        "Africa's longest cave system, offering an unforgettable underground adventure.",
      fullDescription:
        "Stretching over 15 kilometers, Sof Omar Caves are Africa’s longest cave system. Carved by the Weyib River, the caves feature dramatic limestone formations, sacred chambers, and natural tunnels that create an unforgettable underground exploration experience.",
      image: sofumar,
      distance: "120 km",
      duration: "3 hours",
      category: "Adventure",
      icon: Compass,
    },
    {
      id: 4,
      name: "Bale Mountains National Park",
      description:
        "A UNESCO-recognized natural treasure featuring dramatic mountain scenery and wildlife.",
      fullDescription:
        "Bale Mountains National Park is home to one of the largest Afro-alpine habitats in the world. It offers trekking routes, wildlife viewing, alpine lakes, and rare species found nowhere else on Earth. A paradise for nature lovers and adventure seekers.",
      image: balemountain,
      distance: "35 km",
      duration: "1 hour",
      category: "National Park",
      icon: Mountain,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2" />

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

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {attractions.map((attraction) => (
            <ExpandableCard
              key={attraction.id}
              {...attraction}
              isOpen={openId === attraction.id}
              onOpen={() => setOpenId(attraction.id)}
              onClose={() => setOpenId(null)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 lg:p-12 text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Explore Bale?
          </h3>

          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Let us organize guided tours, transportation, and exclusive
            adventure packages tailored for your stay at Nurobe Hotel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Plan My Tour
            </Link>

            <Link
              to="/attractions"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white/20"
            >
              Explore All Destinations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
