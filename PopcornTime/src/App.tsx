import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import MovieGrid from "./components/MovieGrid";
import MovieModal from "./components/MovieModal";
import { useState } from "react";
import type { Movie } from "../types/movie";

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <>
      <div className="main bg-surface-a0 min-h-screen py-6">
        <h1 className="text-3xl font-bold text-primary-a0 text-center mb-6">
          PopcornTime
        </h1>
        <MovieGrid onSelectMovie={setSelectedMovie} />
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <ToastContainer />
    </>
  );
}

export default App;
