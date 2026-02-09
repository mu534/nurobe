import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./app/pages/LandingPage";
import { BookingPage } from "./app/pages/BookingPage";
import { RoomDetailsPage } from "./app/pages/RoomDetails";
import { RoomsPage } from "./app/pages/RoomsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/room/:id" element={<RoomDetailsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        {/* Define other routes here */}
      </Routes>
    </BrowserRouter>
  );
}
