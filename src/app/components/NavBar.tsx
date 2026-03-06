import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logo.jpg";
// ================= Avatar Component =================
function UserAvatar({
  name,
  avatar,
  size = "sm",
}: {
  name: string;
  avatar?: string | null;
  size?: "sm" | "lg";
}) {
  const dimension = size === "lg" ? "w-10 h-10 text-base" : "w-8 h-8 text-sm";

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        referrerPolicy="no-referrer"
        className={`${dimension} rounded-full object-cover ring-2 ring-white/30`}
        onError={(e) => {
          // Fallback to letter if image fails to load
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling?.classList.remove("hidden");
        }}
      />
    );
  }

  return (
    <div
      className={`${dimension} bg-blue-500 rounded-full flex items-center justify-center font-semibold text-white`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// ================= NavBar =================
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const mainLinks = [
    { to: "/", label: "Home" },
    { to: "/rooms", label: "Rooms" },
  ];

  const exploreLinks = [
    { to: "/location", label: "Location" },
    { to: "/attractions", label: "Attractions" },
    { to: "/services", label: "Services" },
    { to: "/dining", label: "Dining" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Top bar */}
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
              <div className="">
                <span className="text-white font-bold text-xl">
                  <img
                    className="w-10 h-10  rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                    src={logo}
                    alt="Nurobe Hotel"
                  />
                </span>
              </div>
              <span className="hidden sm:inline">Nurobe Hotel</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {mainLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white font-medium hover:text-blue-400 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}

              {/* Explore Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="text-white font-medium hover:text-blue-400 transition-colors relative group flex items-center gap-1">
                  Explore
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
                </button>
                <div
                  className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
                    isDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  {exploreLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="text-white font-medium hover:text-blue-400 transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
                    <UserAvatar name={user.name} avatar={user.avatar} />
                    <span className="font-medium text-sm">
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
                      isUserMenuOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    {/* User info */}
                    <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-100">
                      <UserAvatar
                        name={user.name}
                        avatar={user.avatar}
                        size="lg"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {user.role === "ADMIN" && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-sm border-t border-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-white font-medium hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              )}

              <Link
                to="/rooms"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
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
            isMenuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="container mx-auto px-4 pb-6 flex flex-col gap-4 bg-black/40 backdrop-blur-md">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-white font-medium hover:text-blue-400 transition-colors py-2 border-b border-white/10"
              >
                {link.label}
              </Link>
            ))}

            <div className="border-b border-white/10">
              <div className="text-white/60 text-sm font-semibold mb-2 px-2">
                Explore
              </div>
              {exploreLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-medium hover:text-blue-400 transition-colors py-2 pl-4 block"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-white font-medium hover:text-blue-400 transition-colors py-2 border-b border-white/10"
            >
              Contact
            </Link>

            {user ? (
              <>
                <div className="flex items-center gap-3 py-2 border-b border-white/10">
                  <UserAvatar name={user.name} avatar={user.avatar} size="lg" />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {user.name}
                    </p>
                    <p className="text-white/50 text-xs">{user.email}</p>
                  </div>
                </div>
                {user.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors py-2 border-b border-white/10"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-400 font-medium hover:text-red-300 transition-colors py-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-white font-medium hover:text-blue-400 transition-colors py-2 border-b border-white/10"
              >
                Login
              </Link>
            )}

            <Link
              to="/rooms"
              onClick={() => setIsMenuOpen(false)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold text-center hover:from-blue-600 hover:to-blue-700 transition-all"
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
