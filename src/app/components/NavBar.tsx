import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/rooms", label: "Rooms" },
    { to: "/amenities", label: "Amenities" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Top bar - optional contact info */}
          <div className="hidden lg:flex items-center justify-end gap-6 py-2 text-white/80 text-sm border-b border-white/10">
            <a
              href="tel:+251912345678"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              +251 91 234 5678
            </a>

            <a
              href="mailto:info@nurobehotel.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@nurobehotel.com
            </a>
          </div>

          {/* Main navbar */}
          <div className="flex justify-between items-center py-4 lg:py-6">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center gap-2 text-white text-2xl lg:text-3xl font-bold tracking-tight"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="hidden sm:inline">Nurobe Hotel</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white font-medium hover:text-blue-400 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-white font-medium hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/rooms"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="container mx-auto px-4 pb-6 flex flex-col gap-4 bg-black/40 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-white font-medium hover:text-blue-400 transition-colors py-2 border-b border-white/10"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-white font-medium hover:text-blue-400 transition-colors py-2 border-b border-white/10"
            >
              Login
            </Link>
            <Link
              to="/rooms"
              onClick={() => setIsMenuOpen(false)}
              className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold text-center hover:from-blue-600 hover:to-emerald-700 transition-all"
            >
              Book Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
