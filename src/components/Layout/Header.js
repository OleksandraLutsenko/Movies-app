import React from "react";
import classes from "../Layout/Header.module.css";
import logo from "../../images/cinema-logo.jpg";
import login from "../../images/login.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <section className={classes.topnav}>
        <div className="logo">
          <img src={logo} className={classes.logo} alt="movies logo"></img>
        </div>
        <input id={classes["menu_toggle"]} type="checkbox" />
        <label className={classes.menu_button_container}>
          <div className={classes.menu_button}></div>
        </label>
        <nav className={classes.nav}>
          <ul className={classes.menu}>
            <li>
              <NavLink to="/" activeClassName={classes.active}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/favourites" activeClassName={classes.active}>
                My Favourites
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-new-film" activeClassName={classes.active}>
                Add a film
              </NavLink>
            </li>
          </ul>
        </nav>
        <div>
          <div className={classes.login}>
            <div>
              <img
                src={login}
                className={classes.login_icon}
                alt="login icon"
              ></img>
            </div>
            <div className={classes.login_text}>
              <NavLink to="/login" activeClassName={classes.active}>
                Log In
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
