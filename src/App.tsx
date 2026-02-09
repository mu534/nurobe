import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./app/pages/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        {/* Define other routes here */}
      </Routes>
    </BrowserRouter>
  );
}
