import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

import styles from "./NavBar.module.css";

const NavBar = () => {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  const user_buttons = () => {
    if (currentUser) {
      return (
        <div className={styles.logged_in_buttons}>
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              <i className={`fas fa-home ${styles.home_icon}`}></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
            </NavLink>
          </li>
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        </div>
      );
    } else {
      return (
        <div className={styles.logged_out_buttons}>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </div>
      );
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.home_button}>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Cleanstagram
          </NavLink>
        </li>
      </div>
      {user_buttons()}
    </nav>
  );
};

export default NavBar;
