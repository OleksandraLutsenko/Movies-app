import { Switch, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Header from "./components/Layout/Header";
import "./index.css";
import Favourites from "./pages/Favourites";
import AddNewFilm from "./pages/AddNewFilm";
import MoviesList from "./pages/MoviesList";
import Pagination from "./components/pagination/Pagination";
import Login from "./pages/Login";
import MoviesDetails from "./pages/MoviesDetails";

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <Switch>
        <Route path="/" exact>
          <MoviesList />
          <Pagination />
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
