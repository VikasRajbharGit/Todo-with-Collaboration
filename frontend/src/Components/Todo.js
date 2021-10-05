import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import "./Styles/Todo.css";
import "./Styles/Home.css";

function Todo() {
  const [updateTodo, { updateData, updating, error }] =
    useMutation(UPDATE_TODO);
  const [addCollaborator, { addCollabData, addingCollab, collabError }] =
    useMutation(ADD_COLABORATOR);
  const [deleteTodo, { deleteData, deleting, deleteError }] =
    useMutation(DELETE_TODO);
  const { id } = useParams();
  const [body, setBody] = useState("");
  const [collaborator, setCollaborator] = useState("");
  const [collaboratorError, setCollaboratorError] = useState(false);
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { loading, data, refetch } = useQuery(FETCH_TODO_QUERY, {
    variables: { getTodoTodoId: id },
    onCompleted: (res) => {
      setBody(res.getTodo.body);
    },
  });

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuth) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="home ">
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className="todo">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <textarea
              className="todo-box"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="submit"
              className="button"
              value="Update Todo"
              onClick={(e) => {
                e.preventDefault();
                updateTodo({
                  variables: {
                    updateTodoTodoId: id,
                    updateTodoBody: body,
                  },
                });
              }}
            />
          </div>
          {data.getTodo.username === auth.username && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="submit"
                value="Delete Todo"
                className="button"
                style={{ backgroundColor: "red" }}
                onClick={async () => {
                  try {
                    await deleteTodo({
                      variables: {
                        deleteTodoTodoId: id,
                      },
                    });
                    history.push("/");
                  } catch (e) {
                    console.log(e);
                  }
                }}
              />
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <input
              type="text"
              value={collaborator}
              style={{ marginTop: "20px" }}
              onChange={(e) => setCollaborator(e.target.value)}
            />
          </div>
          {collaboratorError}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="submit"
              className="button"
              value="+ Add collaborator"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  await addCollaborator({
                    variables: {
                      addCollaboratorTodoId: id,
                      addCollaboratorBody: collaborator,
                    },
                  });
                  setCollaboratorError(false);
                  await refetch();
                  setCollaborator("");
                } catch (e) {
                  setCollaboratorError(e.message);
                  // console.log(e.message);
                }

                // console.log(refetch());
              }}
            />
          </div>
        </div>
      )}
      {!loading && (
        <div className="side-panel">
          <div className="panel">
            <h3>Collaborators list</h3>
            {data.getTodo.collabUsers.map((user) => {
              return (
                <div className="collabs-card" key={user}>
                  <div className="avatar">{user.slice(0, 1)}</div>
                  <div className="vertical-center">{user}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const FETCH_TODO_QUERY = gql`
  query ($getTodoTodoId: ID!) {
    getTodo(todoId: $getTodoTodoId) {
      id
      body
      username
      createdAt
      collabUsers
    }
  }
`;

const UPDATE_TODO = gql`
  mutation ($updateTodoTodoId: String!, $updateTodoBody: String!) {
    updateTodo(todoId: $updateTodoTodoId, body: $updateTodoBody) {
      body
      collabUsers
      username
      createdAt
      id
    }
  }
`;

const DELETE_TODO = gql`
  mutation ($deleteTodoTodoId: ID!) {
    deleteTodo(todoId: $deleteTodoTodoId)
  }
`;

const ADD_COLABORATOR = gql`
  mutation ($addCollaboratorTodoId: ID!, $addCollaboratorBody: String!) {
    addCollaborator(
      todoId: $addCollaboratorTodoId
      collaborator: $addCollaboratorBody
    ) {
      collabUsers
    }
  }
`;

export default Todo;
