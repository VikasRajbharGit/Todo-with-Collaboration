import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import "./Styles/Login.css";

import { registerUser } from "../store/auth";

function Login() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userError, setUserError] = useState(false);
  //   console.log(auth);
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
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="submit"
            className="button"
            value="Sign Up"
            onClick={(e) => {
              const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

              e.preventDefault();
              if (
                username == "" ||
                !username ||
                !email ||
                email === "" ||
                !password ||
                password === "" ||
                !confirmPassword ||
                confirmPassword === "" ||
                re.test(String(email).toLowerCase())
              ) {
                setUserError(
                  "All fields are mandatory & Email should be correct"
                );
                return 0;
              }

              try {
                dispatch(
                  registerUser({
                    username: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                  })
                );
                setUserError(false);
              } catch (e) {
                console.log(e);
              }
            }}
          />
          <div style={{ color: "black" }}>{userError}</div>
          <div style={{ color: "black" }}>
            {auth.messages.error && <p>{auth.messages.error}</p>}
          </div>

          <button
            type="button"
            className="button"
            onClick={() => {
              history.push("/login");
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
