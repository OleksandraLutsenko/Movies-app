const FILMSDB_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=f3082f1504a96fa8a8f8c27eb0b95f53";

export async function getAllFilms() {
  const response = await fetch(FILMSDB_API);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const filmsList = [];

  const results = data.results;
  console.log(results);

  for (let film in results) {
    filmsList.push({
      id: results[film].id,
      cover: results[film].poster_path,
      title: results[film].original_title,
      rating: results[film].vote_average,
      releaseDate: results[film].release_date,
    });
  }
  return filmsList;
}

export async function getSingleFilm(filmId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=f3082f1504a96fa8a8f8c27eb0b95f53`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const { genres } = data;
  console.log(genres);
  console.log(data);

  const filmGenres = genres.map((genre) => `${genre.name + ", "}`);

  const date = data.release_date
    .split("-")
    .reverse()
    .join("-");

  const filmDetails = {
    id: filmId,
    cover: data.poster_path,
    title: data.title,
    rating: data.vote_average,
    releaseDate: date,
    duration: data.runtime,
    description: data.overview,
    genres: filmGenres,
  };

  return filmDetails;
}
