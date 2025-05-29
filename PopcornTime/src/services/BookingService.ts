// src/services/BookingService.ts

interface Seat {
  row: number;
  col: number;
}

const BookingService = {
  getReservedSeats: (movieId: string): Seat[] => {
    const raw = localStorage.getItem(`booking-${movieId}`);
    return raw ? JSON.parse(raw) : [];
  },

  saveBooking: (movieId: string, seats: Seat[]) => {
    const current = BookingService.getReservedSeats(movieId);
    const updated = [...current, ...seats];
    localStorage.setItem(`booking-${movieId}`, JSON.stringify(updated));
  },
};

export default BookingService;
