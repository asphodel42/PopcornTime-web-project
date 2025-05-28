import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

async function fetchTopMovies(pages = 5) {
  const allMovies = [];

  for (let page = 1; page <= pages; page++) {
    const res = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data = await res.json();

    const movies = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      genreNames: movie.genre_ids.map((id) => genreMap[id] ?? "Unknown"),
      releaseDate: movie.release_date,
      rating: movie.vote_average,
    }));

    allMovies.push(...movies);
  }

  return allMovies;
}
async function saveToJson() {
  const movies = await fetchTopMovies(10);
  const outputPath = path.resolve("./src/data", "movies.json");
  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(movies, null, 2), "utf-8");

  console.log(`Saved ${movies.length} movies to ${outputPath}`);
}

saveToJson().catch((err) => {
  console.error("Error fetching movies:", err);
  process.exit(1);
});
