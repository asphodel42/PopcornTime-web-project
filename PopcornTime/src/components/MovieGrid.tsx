import "../index.css";
import MovieCard from "./MovieCard";
import { useMovies } from "../../hooks/useMovies";
import type { Movie } from "../../types/movie";

interface Props {
  onSelectMovie: (movie: Movie) => void;
}

function MovieGrid({ onSelectMovie }: Props) {
  const movies = useMovies();

  return (
    <div className="movie-cds-grid w-10/12 mx-auto movie-list grid gap-6 max-[490px]:grid-cols-1 max-[900px]:grid-cols-2 max-[1300px]:grid-cols-3 max-[1600px]:grid-cols-4 max-[1920px]:grid-cols-5 min-[1920px]:grid-cols-6">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onSelectMovie} />
        ))
      ) : (
        <p className="text-center text-surface-tonal-a40">Loading...</p>
      )}
    </div>
  );
}

export default MovieGrid;
