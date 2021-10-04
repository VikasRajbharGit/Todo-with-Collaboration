import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import "./Styles/Login.css";

function AddPost() {
  const ADD_TODO = gql`
    mutation ($createTodoBody: String!) {
      createTodo(body: $createTodoBody) {
        id
        body
        username
        collabUsers
        createdAt
      }
    }
  `;
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);
  const [todoError, setTodoError] = useState(false);
  const history = useHistory();
  const [body, setBody] = useState("");

  //   console.log(auth);

  return (
    <div className="main">
      <div>
        <form className="form">
          <input
            type="text"
            placeholder="Write down something..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <p style={{ color: "black" }}>{todoError}</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="submit"
              className="button"
              value="Add Todo"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  await addTodo({
                    variables: { createTodoBody: body },
                  });
                  setBody("");
                  setTodoError(false);
                  history.push("/");
                } catch (e) {
                  // console.log(e);
                  setTodoError(e.message);
                }
              }}
            />
          </div>
          {/* {auth.messages.error && <p>{auth.messages.error}</p>} */}
        </form>
      </div>
    </div>
  );
}

export default AddPost;
