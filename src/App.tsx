import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./app/pages/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Define other routes here */}
      </Routes>
    </BrowserRouter>
  );
}
