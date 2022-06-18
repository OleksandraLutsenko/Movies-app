import React from "react";
import { useParams, Outlet } from "react-router-dom";

const MoviesDetails = () => {
  const params = useParams();

  const { quoteId } = params;
  return (
    <li>
      <div>Cover Poster</div>
      <div className="film_details">
        <h3>Title</h3>
        <div className="post_header">
          <div>Release Date</div>
          <div>Genre</div>
          <div>Duration</div>
        </div>
        <div>
          <div>Rating</div>
          <div>My Favourite</div>
        </div>
        <div>
          <p>Overview</p>
        </div>
        <li className="profile">
          <p>Actors Name</p>
          <p>Job title</p>
        </li>
      </div>
    </li>
  );
};

export default MoviesDetails;
