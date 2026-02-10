import "@radix-ui/themes/styles.css";

import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./app/pages/LandingPage";
import { BookingPage } from "./app/pages/BookingPage";
import { RoomDetailsPage } from "./app/pages/RoomDetails";
import { RoomsPage } from "./app/pages/RoomsPage";
import { ContactPage } from "./app/pages/ContactPage";
import { LoginPage } from "./app/pages/LoginPage";
import { AdminBookings } from "./app/pages/admin/AdminBookings";
import { AdminDashboard } from "./app/pages/admin/AdminDashboard";
import { AdminPayments } from "./app/pages/admin/AdminPayments";
import { AdminRooms } from "./app/pages/admin/AdminRooms";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/room/:id" element={<RoomDetailsPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<ContactPage />} />
      {/* admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/rooms" element={<AdminRooms />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/payments" element={<AdminPayments />} />
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
