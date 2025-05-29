import { Route, Routes } from "react-router-dom";
import App from "./App";
import BookingPage from "./pages/Booking";
import ConfirmBooking from "./pages/ConfirmBooking";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/booking/:id" element={<BookingPage />} />
      <Route path="/confirm/:id" element={<ConfirmBooking />} />
    </Routes>
  );
}
