import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import Card from "./Card";
import "./Styles/Home.css";

import { Link } from "react-router-dom";

function Home() {
  const { loading, data, refetch } = useQuery(FETCH_POSTS_QUERY);
  console.log(data);
  useEffect(async () => {
    await refetch();
  }, []);

  return (
    <div className="home">
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          {data.getTodos.map((todo) => {
            return (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/todo/${todo.id}`}
              >
                <Card key={todo.id} todo={todo} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

const FETCH_POSTS_QUERY = gql`
  query {
    getTodos {
      id
      body
      username
      createdAt
      collabUsers
    }
  }
`;
export default Home;
