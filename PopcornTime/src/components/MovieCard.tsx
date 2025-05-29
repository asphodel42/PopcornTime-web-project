import type { Movie } from "../../types/movie";
import "../index.css";

interface Props {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

function MovieCard({ movie, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(movie)}
      className="movie-cd-ct flex flex-col w-full bg-surface-a10 rounded-2xl overflow-hidden duration-300 ease-in-out cursor-pointer hover:scale-105"
    >
      <div className="movie-cd-img-ct w-full aspect-[2/3] overflow-hidden mb-2">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-auto h-full rounded-t-2xl"
        />
      </div>
      <div className="px-4 pb-2 md:px-6 md:pb-4 lg:px-6 lg:pb-6">
        <h1 className="text-xl font-bold truncate text-primary-a10 mb-2">
          {movie.title}
        </h1>
        <p className="text-light-a0 mb-2 line-clamp-2">{movie.description}</p>
        <div className="flex justify-between text-surface-tonal-a50 text-sm">
          <p>
            Genre: <br /> {movie.genreNames.slice(0, 2).join(", ")}
          </p>
          <p>
            Release: <br /> {movie.releaseDate.split("-")[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
