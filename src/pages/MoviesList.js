import React, { useEffect, useState } from "react";
//import { getAllFilms } from "../lib/api";
import MoviesItem from "../components/movies/MoviesItem";
import classes from "../components/movies/MoviesList.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import Pagination from "../components/pagination/Pagination";
//import useHttp from "../hooks/use-http";
import { Link } from "react-router-dom";

const MoviesList = (props) => {
  const [filmData, setFilmData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let [pageNumber, setPageNumber] = useState(1);

  const prevPageHandler = () => {
    setPageNumber(pageNumber >= 1 ? --pageNumber : (pageNumber = 1));
  };

  const nextPageHandler = () => {
    const incremeant = ++pageNumber;
    setPageNumber(incremeant);
  };
  // my API key - f3082f1504a96fa8a8f8c27eb0b95f53

  useEffect(() => {
    const fetchMoviesList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=f3082f1504a96fa8a8f8c27eb0b95f53&page=${pageNumber}`
          // `https://api.themoviedb.org/3?api_key=f3082f1504a96fa8a8f8c27eb0b95f53`
        );

        if (!response.ok) {
          throw new Error("Something went wrong! ");
        }

        const data = await response.json();

        setIsLoading(false);

        console.log(data);
        const filmsList = [];

        const results = data.results;

        for (let film in results) {
          filmsList.push({
            id: results[film].id,
            cover: results[film].poster_path,
            title: results[film].original_title,
            rating: results[film].vote_average,
            releaseDate: results[film].release_date.slice(0, 4),
          });
        }

        setFilmData(filmsList);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    };

    fetchMoviesList();
  }, [pageNumber]);

  // const { sendRequest, status, data: filmsList, error } = useHttp(
  //   getAllFilms(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=f3082f1504a96fa8a8f8c27eb0b95f53&page=${
  //       pageNumber ? pageNumber : 1
  //     }`
  //   ),
  //   true
  // );

  // useEffect(() => {
  //   sendRequest();
  // }, [sendRequest]);

  const PopularFilmsList = filmData.map((film) => (
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
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Link to={`/page=${pageNumber}`}>
      <section className={classes.section}>
        <ul className={classes.container}>{PopularFilmsList}</ul>
        <Pagination
          onPrev={prevPageHandler}
          onNext={nextPageHandler}
          pageNumber={pageNumber}
        />
      </section>
    </Link>
  );
};

export default MoviesList;
