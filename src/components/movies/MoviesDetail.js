import React from "react";
import classes from "./MoviesDetail.module.css";

const MoviesDetail = (props) => {
  return (
    <section className={classes.detail}>
      <img
        src={`${"https://image.tmdb.org/t/p/w500" + props.cover}`}
        alt={props.title}
      ></img>
      <h2>{props.title}</h2>

      <div className="post_header">
        <div>Release Date: {props.releaseDate}</div>
        <div>Genre: {props.genres}</div>
        <div>Duration: {props.duration}</div>
      </div>
      <div>
        <div>Rating:{props.rating}</div>
        <div>My Favourite</div>
      </div>
      <div>
        <p>{props.description}</p>
      </div>
    </section>
  );
};

export default MoviesDetail;
