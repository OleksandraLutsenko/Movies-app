import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import { getFavourites } from "../lib/api";
import { Link } from "react-router-dom";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "../components/movies/Favourites.module.css";
import star from "../images/star.png";
import masks from "../images/genre.png";
import bin from "../images/trash.png";
import { db } from "./firebase";

// import { remove, ref } from "firebase/database";
import { doc, deleteDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const Favourites = (props) => {
  const [displayBtn, setDisplayBtn] = useState(false);
  const params = useParams();

  const { filmId } = params;

  const { sendRequest, status, data, error } = useHttp(getFavourites, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const displayDeleteBtnHandler = () => {
    setDisplayBtn(true);
  };

  const hideDeleteBtnHandler = () => {
    setDisplayBtn(false);
  };

  const deleteItemHandler = async (film) => {
    // remove(ref(db, `${filmId}`));

    // await deleteDoc(doc(db, "bookmarks", ));

    // const res = await db
    //   .collection("bookmarks")
    //   .doc("N5uVisy0pAOcciItGjZ")
    //   .delete();
    db.collection("bookmarks")
      .doc("N5uVisy0pAOcciItGjZ")
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  let keys;
  if (status === "completed" && data !== null) {
    keys = Object.values(data);

    console.log(keys);
  }

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  return (
    <ul>
      {data &&
        keys.map((film) => (
          <div
            className={classes.card}
            onMouseEnter={displayDeleteBtnHandler}
            onMouseLeave={hideDeleteBtnHandler}
          >
            <Card>
              {/* <Link className={classes.card} to={`/movies-details/${film.id}`}> */}
              <li className={classes.item}>
                <img
                  className={classes.image}
                  src={`${"https://image.tmdb.org/t/p/w500" + film.cover}`}
                  alt={film.title}
                ></img>
                <div className={classes.container}>
                  <h3>{film.title}</h3>
                  <div className={classes.box}>
                    <div className={classes.icon_box}>
                      <img src={star} alt="star" className={classes.img}></img>
                      <div>{film.rating}</div>
                    </div>
                    <div className={classes.icon_box}>
                      <img
                        src={masks}
                        alt="masks"
                        className={classes.img}
                      ></img>
                      <div>{film.genres}</div>
                    </div>
                  </div>
                  <p>{film.description}</p>
                </div>
                {displayBtn && (
                  <div className={classes.del}>
                    <img
                      src={bin}
                      alt="trash_bin"
                      className={classes.bin}
                    ></img>
                    <button onClick={deleteItemHandler}>Delete</button>
                  </div>
                )}
              </li>
              {/* </Link> */}
            </Card>
          </div>
        ))}
      {data === null && <p>No Bookmarks found!</p>}
    </ul>
  );
};

export default Favourites;
