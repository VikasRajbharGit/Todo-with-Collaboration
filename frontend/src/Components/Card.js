import React from "react";
import "./Styles/Card.css";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";

function Card(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [deleteTodo, { deleteData, deleting, deleteError }] =
    useMutation(DELETE_TODO);

  const [collaborators, setCollaborators] = useState(
    props.todo.collabUsers.slice(0, 2)
  );
  // const [collaborator, setCollaborator] = useState("");

  return (
    <div className="card">
      <div className="caption">
        <p>
          {/* <b>{props.todo.username}</b> &nbsp; */}
          {props.todo.body}
        </p>
        {/* Collaborators
        {collaborators.map((collaborator) => {
          return (
            <p key={collaborator}>
              <b>{collaborator}</b>
            </p>
          );
        })} */}
      </div>
      {/* {props.todo.username === auth.username && (
        <div
          onClick={() => {
            deleteTodo({
              variables: {
                deleteTodoTodoId: props.todo.id,
              },
            });
          }}
        >
          Delete
        </div>
      )} */}
    </div>
  );
}
const DELETE_TODO = gql`
  mutation ($deleteTodoTodoId: ID!) {
    deleteTodo(todoId: $deleteTodoTodoId)
  }
`;

export default Card;
