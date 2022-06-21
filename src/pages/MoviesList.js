import React, { useEffect, useState } from "react";
import MoviesItem from "../components/movies/MoviesItem";
import classes from "../components/movies/MoviesList.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const MoviesList = () => {
  const [filmData, setFilmData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // my API key - f3082f1504a96fa8a8f8c27eb0b95f53

  useEffect(() => {
    const fetchMoviesList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=f3082f1504a96fa8a8f8c27eb0b95f53"
        );

        if (!response.ok) {
          throw new Error("Something went wrong! ");
        }

        const data = await response.json();

        setIsLoading(false);
        //console.log(data);
        //console.log(data.results[0].id, data.results[0].original_title);

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

        setFilmData(filmsList);
        setIsLoading(false);
        console.log(filmsList);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    };

    fetchMoviesList();
  }, []);

  const PopularMoviesList = filmData.map((film) => (
    <MoviesItem
      id={film.id}
      key={film.id}
      title={film.title}
      rating={film.rating}
      cover={film.cover}
      releaseDate={film.releaseDate}
    />
  ));

  if (error) {
    return (
      <section className={classes.FilmsError}>
        <p>{error}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={classes.FilmsLoading}>
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section className={classes.section}>
      <ul className={classes.container}>{PopularMoviesList}</ul>
    </section>
  );
};

export default MoviesList;
