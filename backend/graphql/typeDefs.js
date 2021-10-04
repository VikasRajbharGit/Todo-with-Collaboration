const { gql } = require("apollo-server");

module.exports = gql`
  type Todo {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    collabUsers: [String]!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type User {
    id: String!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getTodos: [Todo]
    getTodo(todoId: ID!): Todo
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createTodo(body: String!): Todo!
    updateTodo(todoId: String!, body: String!): Todo!
    deleteTodo(todoId: ID!): String!
    addCollaborator(todoId: ID!, collaborator: String!): Todo!
    deleteCollaborator(todoId: ID!, collaborator: String!): Todo!
  }
`;
