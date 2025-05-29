export interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  genreNames: string[];
  releaseDate: string;
  rating: number;

  budget: number;
  productionCountries: string[];
  cast: string[];
  crew: {
    name: string;
    job: string;
  }[];
  trailer: string | null;
}
