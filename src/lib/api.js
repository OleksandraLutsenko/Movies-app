const FILMSDB_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=f3082f1504a96fa8a8f8c27eb0b95f53";

const FIREBASE_DOMAIN =
  "https://mybookmarks-87e4d-default-rtdb.firebaseio.com/";

export async function getAllFilms(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const filmsList = [];

  const results = data.results;

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

  const date = data.release_date.split("-").reverse().join("/");

  const durationTransform = (num, first, sec) => {
    const output = num.toString().split("").slice(first, sec).join("");

    return output;
  };

  const duration =
    data.runtime < 60
      ? `${data.runtime + " min"}`
      : `${
          durationTransform(data.runtime, 0, 1) +
          " h" +
          " " +
          durationTransform(data.runtime, 1) +
          " min"
        }`;
  //console.log(typeof duration);

  const filmDetails = {
    id: filmId,
    cover: data.poster_path,
    title: data.title,
    rating: data.vote_average,
    releaseDate: date,
    duration: duration,
    description: data.overview,
    genres: filmGenres,
  };

  return filmDetails;
}

export async function addMyFavFilm(filmData) {
  //https://mybookmarks-87e4d-default-rtdb.firebaseio.com/

  const response = await fetch(`${FIREBASE_DOMAIN}/bookmarks.json`, {
    method: "POST",
    body: JSON.stringify(filmData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create a bookmark.");
  }

  return null;
}

export async function getFavourites() {
  const response = await fetch(`${FIREBASE_DOMAIN}/bookmarks.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch favourites.");
  }

  return data;
}
