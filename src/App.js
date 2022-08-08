import { Switch, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Header from "./components/Layout/Header";
import "./index.css";
import Favourites from "./pages/Favourites";
import AddNewFilm from "./pages/AddNewFilm";
import MoviesList from "./pages/MoviesList";
import Login from "./pages/Login";
import MoviesDetails from "./pages/MoviesDetails";
import Search from "./components/movies/Search";

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <Switch>
        <Route path="/" exact>
          <MoviesList />
        </Route>
        {/* <Route path="/page=:num">
          <MoviesList />
        </Route> */}
        <Route path="/page=:num/?search=:num">
          <Search />
        </Route>
        <Route path="/favourites">
          <Favourites />
        </Route>
        <Route path="/add-new-film">
          <AddNewFilm />
        </Route>
        <Route path="/movies-details/:filmId">
          <MoviesDetails />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
