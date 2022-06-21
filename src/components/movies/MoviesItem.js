import Card from "../../UI/Card";
import classes from "../movies/MoviesItem.module.css";
import React from "react";

const MoviesItem = (props) => {
  return (
    <Card>
      <div className={classes.container}>
        <li className={classes.section}>
          <img
            className={classes.image}
            src={`${"https://image.tmdb.org/t/p/w500" + props.cover}`}
            alt={props.title}
          ></img>
          <h3>{props.title}</h3>
          <div>Rating: {props.rating}</div>
          <p>Date of release: {props.releaseDate}</p>
        </li>
      </div>
    </Card>
  );
};

export default MoviesItem;
