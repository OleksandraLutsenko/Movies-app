import React from "react";
import classes from "./Pagination.module.css";

const Pagination = (props) => {
  return (
    <div className={classes.container}>
      <ul className={classes.pagination}>
        <li className={classes.icon}>
          <button onClick={props.onPrev}>
            <span className="button-left">&lt;</span>Previous
          </button>
        </li>
        <li>
          <button>{props.pageNumber}</button>
        </li>

        <li className={classes.icon}>
          <button onClick={props.onNext}>
            Next<span className="button-right">&gt;</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
