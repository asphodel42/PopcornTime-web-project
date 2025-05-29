// src/pages/ConfirmBooking.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingService from "../services/BookingService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

interface Seat {
  row: number;
  col: number;
}

export default function ConfirmBooking() {
  const { id } = useParams<{ id: string }>();
  const movieId = id ?? "";
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const temp = sessionStorage.getItem(`booking-${movieId}-temp`);
    if (temp) {
      setSelectedSeats(JSON.parse(temp));
    }
  }, [movieId]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!name || !phone || !email) {
      toast.error("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    BookingService.saveBooking(movieId, selectedSeats);
    sessionStorage.removeItem(`booking-${movieId}-temp`);
    toast.success("Booking successful!");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface-a0 text-light-a0 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary-a10 mb-4">
        Confirm Booking
      </h1>

      <p className="mb-2 text-sm text-surface-tonal-a40">
        Selected Seats:
        <span className="font-semibold text-primary-a20 ml-2">
          {selectedSeats.map((s) => `${s.row + 1}-${s.col + 1}`).join(", ")}
        </span>
      </p>

      <div className="w-full max-w-md space-y-4 mt-6">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded bg-surface-a10 text-light-a0 outline-none focus:ring-2 ring-primary-a20"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 rounded bg-surface-a10 text-light-a0 outline-none focus:ring-2 ring-primary-a20"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-surface-a10 text-light-a0 outline-none focus:ring-2 ring-primary-a20"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-primary-a0 hover:bg-primary-a10 text-dark-a0 font-semibold py-3 rounded transition"
        >
          Confirm
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
