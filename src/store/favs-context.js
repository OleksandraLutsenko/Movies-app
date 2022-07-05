import React from "react";

const FilmContext = React.createContext({
  favFilms: [],
  addFilm: (item) => {},
  removeFilm: (id) => {},
});

export default FilmContext;
