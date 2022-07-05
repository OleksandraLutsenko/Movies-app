import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MoviesDetail from "../components/movies/MoviesDetail";
import { getSingleFilm } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

const MoviesDetails = () => {
  // const [singleFilmData, setSingleFilmData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const params = useParams();

  const { filmId } = params;

  // useEffect(() => {
  //   const getSingleFilm = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await fetch(
  //         `https://api.themoviedb.org/3/movie/${filmId}?api_key=f3082f1504a96fa8a8f8c27eb0b95f53`
  //       );
  //       const data = await response.json();
  //       setIsLoading(false);

  //       if (!response.ok) {
  //         throw new Error(data.message || "Could not fetch quote.");
  //       }

  //       const { genres } = data;

  //       const [filmGenres] = genres.map((genre) => genre.name);

  //       const filmDetails = {
  //         id: filmId,
  //         cover: data.poster_path,
  //         title: data.original_title,
  //         rating: data.vote_average,
  //         releaseDate: data.release_date,
  //         duration: data.runtime,
  //         description: data.overview,
  //         genres: filmGenres,
  //       };

  //       setSingleFilmData(filmDetails);
  //       console.log(filmDetails);
  //       console.log(singleFilmData);
  //     } catch (err) {
  //       console.log(err.message);
  //       setError(err.message);
  //     }
  //   }
  //   getSingleFilm();
  // }, []);

  const {
    sendRequest,
    status,
    data: filmDetails,
    error,
  } = useHttp(getSingleFilm, true);

  useEffect(() => {
    sendRequest(filmId);
  }, [sendRequest, filmId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!filmDetails.title) {
    return <p>No film found!</p>;
  }

  return (
    <MoviesDetail
      id={filmDetails.id}
      key={filmDetails.id}
      cover={filmDetails.cover}
      title={filmDetails.title}
      rating={filmDetails.rating}
      releaseDate={filmDetails.releaseDate}
      duration={filmDetails.duration}
      description={filmDetails.description}
      genres={filmDetails.genres}
    />
  );
};

export default MoviesDetails;
