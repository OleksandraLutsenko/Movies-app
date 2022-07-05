import Card from "../../UI/Card";
import classes from "../movies/MoviesItem.module.css";
import React from "react";
import { Link } from "react-router-dom";
import bookmark from "../../images/bookmark.png";
import star from "../../images/star.png";
import calendar from "../../images/calendar.png";

const MoviesItem = (props) => {
  return (
    <Card>
      <Link className={classes.card} to={`/movies-details/${props.id}`}>
        <div className={classes.container}>
          <li className={classes.section}>
            <img
              className={classes.image}
              src={`${"https://image.tmdb.org/t/p/w500" + props.cover}`}
              alt={props.title}
            ></img>
            <h3>{props.title}</h3>
            <div className={classes.box}>
              <div className={classes.icon_box}>
                <img src={star} alt="star" className={classes.img}></img>
                <div> {props.rating}</div>
              </div>
              <div className={classes.circle}>
                <img
                  src={bookmark}
                  className={classes.bookmark}
                  alt="bookmark icon"
                />
              </div>
            </div>
            <div className={classes.icon_box_cal}>
            <img src={calendar} alt="calendar" className={classes.img}></img>
            <div> {props.releaseDate}</div>
            </div>
          </li>
        </div>
      </Link>
    </Card>
  );
};

export default MoviesItem;
