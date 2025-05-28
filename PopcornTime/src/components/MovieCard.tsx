import "../index.css";

function MovieCard() {
  return (
    <div className="movie-cd-ct flex flex-col w-full bg-surface-a10 rounded-2xl duration-300 ease-in-out cursor-pointer hover:scale-105">
      <div className="movie-cd-img-ct flex justify-center mb-2">
        <img
          src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/239382/karatekidlegends-posterart.jpg"
          alt=""
          className="w-full lg:h-65 sm:h-50 h-40 object-cover rounded-t-2xl"
        />
      </div>
      <div className="px-4 pb-2 md:px-6 md:pb-4 lg:px-6 lg:pb-6">
        <h1 className="text-xl font-bold truncate text-primary-a10 mb-2">
          Karate Kid: Legends (2025)
        </h1>
        <p className="text-light-a0 mb-2 line-clamp-2">
          Karate Kid: Legends unites the iconic martial arts masters of one of
          the most beloved film franchises of all time to tell a completely new
          story full of action and heart.
        </p>
        <div className="flex justify-between">
          <p className="text-surface-tonal-a50">
            Genre: <br /> Action, Comedy
          </p>
          <p className="text-surface-tonal-a50 ">
            Runtime: <br /> 2h 10m
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
