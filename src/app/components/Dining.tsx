import { Utensils, Clock, Star, Coffee, UtensilsCrossed } from "lucide-react";
import dining1 from "../../assets/images/dining1.png";
import dining2 from "../../assets/images/dining2.png";

export const DiningSection = () => {
  const restaurants = [
    {
      id: 1,
      name: "The Bale Restaurant",
      description:
        "Enjoy delicious Ethiopian and international cuisine prepared with fresh, locally sourced ingredients in a warm and elegant setting.",
      image: dining1,
      cuisine: "Ethiopian & International",
      hours: "7:00 AM - 10:00 PM",
      icon: UtensilsCrossed,
      specialties: [
        "Traditional Ethiopian Platter",
        "Grilled Mountain Trout",
        "Organic Salads",
        "Chef’s Special Dishes",
      ],
      atmosphere: "Fine Dining",
    },
    {
      id: 2,
      name: "Café Nurobe",
      description:
        "Start your day with freshly brewed Ethiopian coffee and homemade pastries in a relaxed and cozy environment.",
      image: dining2,
      cuisine: "Café & Bakery",
      hours: "6:00 AM - 8:00 PM",
      icon: Coffee,
      specialties: [
        "Ethiopian Coffee Ceremony",
        "Fresh Pastries",
        "Sandwiches",
        "Fresh Juices",
      ],
      atmosphere: "Casual & Cozy",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Utensils className="w-4 h-4" />
            Culinary Experience
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Dining
          </h2>
          <p className="text-lg text-gray-600">
            Discover exceptional flavors and warm hospitality in our carefully
            crafted dining spaces.
          </p>
        </div>

        {/* Restaurants */}
        <div className="space-y-12">
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 lg:grid lg:grid-cols-2"
            >
              {/* Image */}
              <div
                className={`relative h-80 lg:h-auto overflow-hidden ${
                  index % 2 !== 0 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2">
                    <restaurant.icon className="w-3.5 h-3.5" />
                    {restaurant.atmosphere}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {restaurant.name}
                </h3>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Utensils className="w-5 h-5 text-amber-600" />
                    <span className="font-medium text-sm">
                      {restaurant.cuisine}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span className="font-medium text-sm">
                      {restaurant.hours}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {restaurant.description}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                    House Specialties
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {restaurant.specialties.map((specialty, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-sm">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors w-fit group/btn">
                  View Menu
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

        {/* Room Service */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl p-8 lg:p-12 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                Room Service Available
              </h3>
              <p className="text-amber-100">
                Enjoy our delicious meals from the comfort of your room.
              </p>
            </div>

            <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors whitespace-nowrap">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiningSection;
