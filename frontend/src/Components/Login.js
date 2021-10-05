import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import "./Styles/Login.css";

import { login } from "../store/auth";

function Login() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // console.log(auth);
  const dispatch = useDispatch();

  return (
    <div className="main">
      <div>
        <form className="form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            className="button"
            value="Log In"
            onClick={(e) => {
              e.preventDefault();

              dispatch(
                login({
                  username: username,
                  password: password,
                })
              );
            }}
          />
          {auth.messages.error && <p>{auth.messages.error}</p>}

          <button
            type="button"
            className="button"
            onClick={() => {
              history.push("/register");
            }}
          >
            Sign Up
          </button>
        </form>
        To test this app either sign up with two accounts <br /> OR use
        <br />
        User: todoUser , Password:123456 <br />
        User: collaborator1 , Paswords: 123456
      </div>
    </div>
  );
}

export default Login;
