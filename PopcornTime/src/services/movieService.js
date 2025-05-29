// src/scripts/fetchTopMoviesExtended.ts

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

async function fetchMovieDetails(id) {
  const [detailsRes, creditsRes, videosRes] = await Promise.all([
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
    fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`),
  ]);

  const details = await detailsRes.json();
  const credits = await creditsRes.json();
  const videos = await videosRes.json();

  const trailer = videos.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return {
    budget: details.budget,
    productionCountries: details.production_countries.map((c) => c.name),
    cast: credits.cast.slice(0, 5).map((a) => a.name),
    crew: credits.crew
      .filter((c) => ["Director", "Writer"].includes(c.job))
      .map((c) => ({
        name: c.name,
        job: c.job,
      })),
    trailer: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
  };
}

async function fetchTopMovies(pages = 1) {
  const allMovies = [];

  for (let page = 1; page <= pages; page++) {
    const res = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data = await res.json();
    for (const movie of data.results) {
      const extra = await fetchMovieDetails(movie.id);

      allMovies.push({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        genreNames: movie.genre_ids.map((id) => genreMap[id] ?? "Unknown"),
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        ...extra,
      });
    }
  }

  return allMovies;
}

async function saveToJson() {
  const movies = await fetchTopMovies(2);
  const outputPath = path.resolve("./src/data", "movies.json");
  fs.mkdirSync("src/data", { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(movies, null, 2), "utf-8");

  console.log(`Saved ${movies.length} movies to ${outputPath}`);
}

saveToJson().catch((err) => {
  console.error("Error fetching movies:", err);
  process.exit(1);
});
