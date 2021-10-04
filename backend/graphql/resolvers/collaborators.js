const { UserInputError, AuthenticationError } = require("apollo-server");

const Todo = require("../../models/Todo");
const TodoUser = require("../../models/User");
const checkAuth = require("../../Util/check-auth");

module.exports = {
  Mutation: {
    addCollaborator: async (_, { todoId, collaborator }, context) => {
      const { username } = checkAuth(context);
      if (collaborator.trim() === "") {
        throw new UserInputError("User can not be empty", {
          errors: {
            body: "User must not be empty",
          },
        });
      }
      const todo = await Todo.findById(todoId);
      if (todo) {
        if (username === todo.username) {
          const collabUser = await TodoUser.findOne({ username: collaborator });
          console.log(collabUser);
          if (collabUser) {
            const existing = todo.collabUsers.includes(collaborator);
            if (!existing && todo.username !== collaborator) {
              todo.collabUsers.unshift(collaborator);

              await todo.save();

              return todo;
            } else {
              throw new UserInputError("User already has access");
            }
          } else {
            throw new UserInputError("User not found");
          }
        } else {
          throw new AuthenticationError("Action not allowed");
        }
        // console.log(todo);
      } else throw new UserInputError("Todo not found");
    },
    deleteCollaborator: async (_, { todoId, collaborator }, context) => {
      const user = checkAuth(context);
      const todo = await Todo.findById(todoId);

      if (todo) {
        const collaboratorIndex = todo.collabUsers.findIndex(
          (c) => c === collaborator
        );
        console.log(collaboratorIndex);

        if (collaboratorIndex !== -1) {
          if (todo.collabUsers[collaboratorIndex] === user.username) {
            todo.collabUsers.splice(collaboratorIndex, 1);
            await todo.save();
            return todo;
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else throw new UserInputError("User not found");
      } else throw new UserInputError("Todo not found");
    },
  },
};
