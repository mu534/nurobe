import {
  Utensils,
  Clock,
  Star,
  Coffee,
  Wine,
  UtensilsCrossed,
} from "lucide-react";

export const DiningSection = () => {
  const restaurants = [
    {
      id: 1,
      name: "The Bale Restaurant",
      description:
        "Experience fine dining with a stunning view of the Bale Mountains. Our signature restaurant offers a fusion of traditional Ethiopian cuisine and international flavors.",
      image: "/images/bale-restaurant.jpg",
      cuisine: "Ethiopian & International",
      hours: "7:00 AM - 11:00 PM",
      icon: UtensilsCrossed,
      specialties: [
        "Traditional Ethiopian Platter",
        "Mountain Trout",
        "Organic Salads",
        "Premium Steaks",
      ],
      atmosphere: "Fine Dining",
    },
    {
      id: 2,
      name: "Café Nurobe",
      description:
        "Start your day with freshly brewed Ethiopian coffee and homemade pastries. A cozy spot perfect for casual meetings or relaxing with a book.",
      image: "/images/cafe-nurobe.jpg",
      cuisine: "Café & Bakery",
      hours: "6:00 AM - 8:00 PM",
      icon: Coffee,
      specialties: [
        "Ethiopian Coffee Ceremony",
        "Fresh Pastries",
        "Sandwiches & Salads",
        "Smoothies & Juices",
      ],
      atmosphere: "Casual & Cozy",
    },
    {
      id: 3,
      name: "Rooftop Terrace Bar",
      description:
        "Unwind with handcrafted cocktails and panoramic sunset views. Our rooftop bar offers an extensive selection of wines, spirits, and local beers.",
      image: "/images/rooftop-bar.jpg",
      cuisine: "Bar & Lounge",
      hours: "5:00 PM - 12:00 AM",
      icon: Wine,
      specialties: [
        "Signature Cocktails",
        "Ethiopian Wine Selection",
        "Craft Beers",
        "Light Bites & Tapas",
      ],
      atmosphere: "Elegant & Relaxed",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Utensils className="w-4 h-4" />
            Culinary Excellence
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Dining & Bars
          </h2>
          <p className="text-lg text-gray-600">
            Savor exceptional flavors in three distinctive venues, each offering
            its own unique ambiance and culinary experience
          </p>
        </div>

        {/* Restaurants Grid */}
        <div className="space-y-12">
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className={`group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
                index % 2 === 0
                  ? "lg:grid lg:grid-cols-2"
                  : "lg:grid lg:grid-cols-2"
              }`}
            >
              {/* Image */}
              <div
                className={`relative h-80 lg:h-auto overflow-hidden ${
                  index % 2 === 0 ? "" : "lg:order-2"
                }`}
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2">
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

                <button className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors w-fit group/btn">
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

        {/* Room Service CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 lg:p-12 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                24/7 Room Service Available
              </h3>
              <p className="text-amber-100">
                Enjoy our delicious menu from the comfort of your room, anytime
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
