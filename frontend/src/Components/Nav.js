import React, { useState, useEffect } from "react";
import "./Styles/Nav.css";
import { useHistory, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../store/auth";

function Nav() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (
      auth.isAuthenticated == true &&
      auth.session > new Date() &&
      location.pathname == "/login"
    ) {
      history.push("/");
    } else if (auth.isAuthenticated == false) {
      history.push("/login");
    }
  }, [auth.isAuthenticated]);
  return (
    <div className="nav">
      <h4
        onClick={() => {
          history.push("/");
        }}
      >
        Home
      </h4>

      <h4
        onClick={() => {
          history.push("/add-todo");
        }}
      >
        Add Todo
      </h4>

      <h4
        onClick={() => {
          history.push("/login");
          dispatch(authActions.logout());
        }}
      >
        Logout
      </h4>
    </div>
  );
}

export default Nav;
