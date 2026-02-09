import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl text-gray-900">
              Nurobe Hotel
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link to="/rooms" className="text-gray-600 hover:text-gray-900">
                Rooms
              </Link>
              <Link to="/contact" className="text-gray-900">
                Contact
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl mb-2">Contact Us</h1>
          <p className="text-blue-100">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions about our rooms or services? We're here to help.
              Reach out to us through any of the following channels.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1">Address</h3>
                  <p className="text-gray-600">
                    Main Street, Bale Robe
                    <br />
                    Oromia Region, Ethiopia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1">Phone</h3>
                  <p className="text-gray-600">
                    +251 123 456 789
                    <br />
                    +251 987 654 321
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1">Email</h3>
                  <p className="text-gray-600">
                    info@nurobehotel.com
                    <br />
                    reservations@nurobehotel.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Reception: 24/7
                    <br />
                    Check-in: 2:00 PM
                    <br />
                    Check-out: 12:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-200 rounded-lg overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63112.54421799531!2d39.5!3d7.116667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b1f6ea4f64b947%3A0x8f8c2a2b1ec53d0c!2sRobe%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nurobe Hotel Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg mb-2">Message Sent!</h3>
                  <p className="text-gray-600 text-sm">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
