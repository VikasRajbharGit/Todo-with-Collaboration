const todosResolvers = require("./todos");
const usersResolvers = require("./users");
const collaboratorsResolvers = require("./collaborators");

module.exports = {
  Query: {
    ...todosResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...todosResolvers.Mutation,
    ...collaboratorsResolvers.Mutation,
  },
};
