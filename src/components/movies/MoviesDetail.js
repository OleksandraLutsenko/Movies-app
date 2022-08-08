import React, { useState, useEffect, useContext } from "react";
import classes from "./MoviesDetail.module.css";
import bookmark from "../../images/bookmark.png";
import { addMyFavFilm } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import star from "../../images/star.png";
import calendar from "../../images/calendar.png";
import genres from "../../images/genre.png";
import clock from "../../images/clock1.png";
import { useParams } from "react-router-dom";
import FilmContext from "../../store/favs-context";

const MoviesDetail = (props) => {
  const filmCtx = useContext(FilmContext);
  const [bookmarkedFilm, setBookmarkedFilm] = useState();
  const [displayPopup, setDisplayPopup] = useState(false);

  const params = useParams();

  const { filmId } = params;

  const addBookmarkHandle = () => {
    setBookmarkedFilm({
      id: props.id,
      key: props.id,
      cover: props.cover,
      title: props.title,
      genres: props.genres,
      rating: props.rating,
      description: props.description,
    });
    setDisplayPopup(true);
  };

  // const deleteBookmarkHandler = (filmId) => {
  //   setBookmarkedFilm((prevState) => {
  //     return prevState.filter((film) => film.id !== filmId);
  //   });
  // };

  // props.onDelete(deleteBookmarkHandler(filmId));

  // const cartItemRemoveHandler = (id) => {
  //   filmCtx.removeFilm(id);
  // };

  // props.onRemove(cartItemRemoveHandler.bind(null, film.id))
  //подумать почему отправляються два запроса - этот эфект тригерит другой

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDisplayPopup(false);
  //   }, 6000);
  //   return () => clearTimeout(timer);
  // }, []);

  console.log(bookmarkedFilm);

  const { sendRequest, status, error } = useHttp(
    addMyFavFilm(bookmarkedFilm),
    true
  );

  useEffect(() => {
    if (status === "completed") {
      sendRequest();
    }
  }, [sendRequest, status]);

  console.log();

  return (
    <section className={classes.details}>
      <img
        src={`${"https://image.tmdb.org/t/p/w500" + props.cover}`}
        alt={props.title}
      ></img>

      <div className={classes.post_info}>
        <div>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.post_header}>
          <div className={classes.icon_box}>
            <img src={calendar} alt="calendar" className={classes.img}></img>
            <div> {props.releaseDate}</div>
          </div>
          <div className={classes.icon_box}>
            <img src={genres} alt="calendar" className={classes.img}></img>
            <div>{props.genres}</div>
          </div>
          <div className={classes.icon_box}>
            <img src={clock} alt="clock" className={classes.img}></img>
            <div> {props.duration}</div>
          </div>
        </div>
        <div className={classes.specs}>
          <div className={classes.ratings}>
            <img src={star} alt="star" className={classes.img}></img>
            <div>{props.rating}</div>
          </div>
          <div className={classes.circle} onClick={addBookmarkHandle}>
            <img
              src={bookmark}
              className={classes.bookmark}
              alt="bookmark_icon"
            />
          </div>
          {displayPopup && (
            <div className={classes.popup}>
              <p>Your bookmark was added succesfully!</p>
            </div>
          )}
        </div>
        <div>
          <h3>Overview </h3>
          <p>{props.description}</p>
        </div>
      </div>
    </section>
  );
};

export default MoviesDetail;
