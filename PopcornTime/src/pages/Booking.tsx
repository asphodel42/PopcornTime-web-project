import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingService from "../services/BookingService.ts";
import { toast, ToastContainer } from "react-toastify";
import type { Movie } from "../../types/movie";
import movies from "../data/movies.json";
import "../index.css";

interface Seat {
  row: number;
  col: number;
}

function Booking() {
  const { id } = useParams<{ id: string }>();
  const movieId = id ?? "";
  const rows = 8;
  const cols = 10;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [reservedSeats, setReservedSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  useEffect(() => {
    const existing = BookingService.getReservedSeats(movieId);
    setReservedSeats(existing);

    const movieData = (movies as Movie[]).find(
      (m) => m.id === parseInt(movieId)
    );
    setMovie(movieData ?? null);
  }, [movieId]);

  const isReserved = (row: number, col: number) =>
    reservedSeats.some((seat) => seat.row === row && seat.col === col);

  const isSelected = (row: number, col: number) =>
    selectedSeats.some((seat) => seat.row === row && seat.col === col);

  const toggleSeat = (row: number, col: number) => {
    if (isReserved(row, col)) return;

    const exists = isSelected(row, col);
    const newSelected = exists
      ? selectedSeats.filter((s) => !(s.row === row && s.col === col))
      : [...selectedSeats, { row, col }];
    setSelectedSeats(newSelected);
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      toast.warn("Please, select at least one seat", {
        className: "toast-message",
      });
      return;
    }

    sessionStorage.setItem(
      `booking-${movieId}-temp`,
      JSON.stringify(selectedSeats)
    );

    window.location.href = `/confirm/${movieId}`;
  };

  return (
    <div className="min-h-screen bg-surface-a0 text-light-a0 p-6">
      {movie && (
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 mb-8 items-center">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="max-[768px]:hidden w-32 h-auto rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary-a10">
              {movie.title}
            </h2>
            <p className="text-surface-tonal-a40 text-sm mb-1">
              {movie.genreNames.join(", ")} | {movie.releaseDate}
            </p>
            <p className="text-sm text-light-a0 line-clamp-2">
              {movie.description}
            </p>
          </div>
        </div>
      )}

      <h1 className="text-center text-3xl font-bold text-primary-a10 mb-6">
        Select Seats
      </h1>

      <div className="w-fit mx-auto grid grid-cols-10 max-[490px]:gap-1 gap-2 mb-6">
        {[...Array(rows)].map((_, row) =>
          [...Array(cols)].map((_, col) => {
            const reserved = isReserved(row, col);
            const selected = isSelected(row, col);

            return (
              <div
                key={`${row}-${col}`}
                onClick={() => toggleSeat(row, col)}
                className={`max-[490px]:w-6 max-[490px]:h-6 w-8 h-8 rounded cursor-pointer flex items-center justify-center
                  ${
                    reserved
                      ? "bg-red-600 cursor-not-allowed"
                      : selected
                      ? "bg-blue-500"
                      : "bg-green-600 hover:bg-green-500"
                  }`}
              ></div>
            );
          })
        )}
      </div>

      <div className="text-center">
        <button
          onClick={handleProceed}
          className="px-6 py-3 bg-primary-a0 text-dark-a0 font-semibold rounded hover:bg-primary-a10 transition cursor-pointer"
        >
          Book
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Booking;
