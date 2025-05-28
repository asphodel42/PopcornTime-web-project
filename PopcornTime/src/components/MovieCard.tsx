import "../index.css";
import type { Movie } from "../../types/movie";

function MovieCard({ posterUrl, title, description, genre, runtime }: Movie) {
  return (
    <div className="movie-cd-ct flex flex-col w-full bg-surface-a10 rounded-2xl duration-300 ease-in-out cursor-pointer hover:scale-105">
      <div className="movie-cd-img-ct flex justify-center mb-2">
        <img
          src={posterUrl}
          alt={title}
          className="w-full lg:h-65 sm:h-50 h-40 object-cover rounded-t-2xl"
        />
      </div>
      <div className="px-4 pb-2 md:px-6 md:pb-4 lg:px-6 lg:pb-6">
        <h1 className="text-xl font-bold truncate text-primary-a10 mb-2">
          {title}
        </h1>
        <p className="text-light-a0 mb-2 line-clamp-2">{description}</p>
        <div className="flex justify-between">
          <p className="text-surface-tonal-a50">
            Genre: <br /> {genre}
          </p>
          <p className="text-surface-tonal-a50 ">
            Runtime: <br /> {runtime}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
