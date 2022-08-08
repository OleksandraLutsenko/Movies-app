import React, { useState, useRef } from "react";
import classes from "./Search.module.css";
// import { getAllFilms } from "../../lib/api";
// import useHttp from "../../hooks/use-http";

const Search = (props) => {
  const [searchResults, setSearchResults] = useState();
  const searchRef = useRef();

  //   const { sendRequest, status, data } = useHttp(
  //     getAllFilms(
  //       `https://api.themoviedb.org/3/search/movie?api_key=f3082f1504a96fa8a8f8c27eb0b95f53&query=the+avengers`
  //     ),
  //     true
  //   );

  const loadSearchResultsHandler = async (event) => {
    event.preventDefault();
    const inputKeyword = searchRef.current.value;
    const transformedKeyword = inputKeyword.split(" ").join("+");
    console.log(transformedKeyword);
    // await sendRequest();
    // console.log(data);
    // setSearchResults(data);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=f3082f1504a96fa8a8f8c27eb0b95f53&query=${transformedKeyword}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong! ");
      }

      const data = await response.json();

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

      setSearchResults(filmsList);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(searchResults);
  // this.props.onLoadSeachResults(searchResults);

  return (
    <form className={classes.form} onSubmit={loadSearchResultsHandler}>
      <input
        type="text"
        name="search"
        className={classes.input}
        ref={searchRef}
      />
      <button type="submit" className={classes.btn}>
        Search
      </button>
    </form>
  );
};

export default Search;
