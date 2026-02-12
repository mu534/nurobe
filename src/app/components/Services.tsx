import {
  Wifi,
  Car,
  Dumbbell,
  Waves,
  Briefcase,
  Headphones,
  Gift,
  Shield,
  Users,
  Sparkles,
  Clock,
} from "lucide-react";

export const ServicesSection = () => {
  const services = [
    {
      id: 1,
      name: "Concierge Services",
      description:
        "Our dedicated concierge team is available 24/7 to assist with tour bookings, transportation, and local recommendations.",
      icon: Headphones,
      color: "blue",
      features: [
        "Tour arrangements",
        "Restaurant reservations",
        "Transportation booking",
        "Local recommendations",
      ],
    },
    {
      id: 2,
      name: "Business Center",
      description:
        "Fully equipped business facilities with high-speed internet, meeting rooms, and professional support services.",
      icon: Briefcase,
      color: "purple",
      features: [
        "Meeting rooms",
        "Video conferencing",
        "Printing & copying",
        "Secretarial services",
      ],
    },
    {
      id: 3,
      name: "Fitness & Wellness",
      description:
        "State-of-the-art gym and wellness center featuring modern equipment, sauna, and professional trainers.",
      icon: Dumbbell,
      color: "green",
      features: [
        "24/7 gym access",
        "Personal trainers",
        "Yoga classes",
        "Sauna & steam room",
      ],
    },
    {
      id: 4,
      name: "Swimming Pool",
      description:
        "Relax in our heated outdoor pool with stunning mountain views, complete with poolside bar service.",
      icon: Waves,
      color: "cyan",
      features: [
        "Heated outdoor pool",
        "Poolside bar",
        "Sun loungers",
        "Mountain views",
      ],
    },
    {
      id: 5,
      name: "Spa & Massage",
      description:
        "Rejuvenate your body and mind with our premium spa treatments and traditional Ethiopian massage therapies.",
      icon: Sparkles,
      color: "pink",
      features: [
        "Traditional massage",
        "Aromatherapy",
        "Facial treatments",
        "Couples packages",
      ],
    },
    {
      id: 6,
      name: "Airport Transfer",
      description:
        "Complimentary airport shuttle service for our guests. Private car service also available upon request.",
      icon: Car,
      color: "amber",
      features: [
        "Free shuttle service",
        "Private car hire",
        "Meet & greet",
        "Luggage assistance",
      ],
    },
    {
      id: 7,
      name: "Event Spaces",
      description:
        "Versatile venues perfect for weddings, conferences, and special events with full catering and AV support.",
      icon: Users,
      color: "indigo",
      features: [
        "Wedding venues",
        "Conference halls",
        "Full catering",
        "AV equipment",
      ],
    },
    {
      id: 8,
      name: "Security & Safety",
      description:
        "Your safety is our priority with 24/7 security, CCTV monitoring, and secure parking facilities.",
      icon: Shield,
      color: "red",
      features: [
        "24/7 security",
        "CCTV monitoring",
        "Secure parking",
        "Safe deposit boxes",
      ],
    },
  ];

  const colorClasses: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-100",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-100",
    },
    cyan: {
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      border: "border-cyan-100",
    },
    pink: {
      bg: "bg-pink-50",
      text: "text-pink-600",
      border: "border-pink-100",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100",
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-100",
    },
    red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-100" },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Gift className="w-4 h-4" />
            Premium Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Hotel Services & Amenities
          </h2>
          <p className="text-lg text-gray-600">
            Experience world-class facilities and personalized services designed
            to make your stay unforgettable
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => {
            const colors = colorClasses[service.color];
            return (
              <div
                key={service.id}
                className={`group bg-white rounded-2xl p-6 shadow-sm border ${colors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className={`w-7 h-7 ${colors.text}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-700 text-sm"
                    >
                      <div
                        className={`w-1.5 h-1.5 ${colors.bg} rounded-full`}
                      ></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Services Banner */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <Wifi className="w-12 h-12 mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Free High-Speed WiFi</h3>
            <p className="text-blue-100">
              Stay connected with complimentary high-speed internet throughout
              the hotel and all rooms
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <Clock className="w-12 h-12 mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">24/7 Guest Support</h3>
            <p className="text-green-100">
              Our team is always available to assist you, day or night, ensuring
              a comfortable stay
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
