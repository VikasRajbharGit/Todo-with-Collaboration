const { AuthenticationError, UserInputError } = require("apollo-server");

const Todo = require("../../models/Todo");
const checkAuth = require("../../Util/check-auth");

module.exports = {
  Query: {
    async getTodos(_, __, context, ___) {
      const user = checkAuth(context);
      console.log(user);
      try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        return todos.filter(
          (todo) =>
            todo.collabUsers.includes(user.username) ||
            todo.username === user.username
        );
      } catch (err) {
        throw new Error(err);
      }
    },
    async getTodo(_, { todoId }) {
      try {
        const todo = await Todo.findById(todoId);
        if (todo) {
          return todo;
        } else {
          throw new Error("Todo not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createTodo(_, { body }, context) {
      const user = checkAuth(context);
      console.log(user);
      if (body === "") {
        throw new UserInputError("Body can not be empty");
      }

      const newTodo = new Todo({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const todo = await newTodo.save();

      return todo;
    },
    async updateTodo(_, { todoId, body }, context) {
      const user = checkAuth(context);
      const todo = await Todo.findById(todoId);
      if (user) {
        if (todo) {
          if (
            todo.collabUsers.includes(user.username) ||
            todo.username === user.username
          ) {
            todo.body = body;
            await todo.save();
          } else {
            throw new AuthenticationError("Action not allowe");
          }
        } else {
          throw new UserInputError("Todo not found");
        }
      }

      const todoRes = await todo.save();

      return todoRes;
    },
    async deleteTodo(_, { todoId }, context) {
      const user = checkAuth(context);

      try {
        const todo = await Todo.findById(todoId);
        if (user.username === todo.username) {
          await todo.delete();
          return "Todo deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
