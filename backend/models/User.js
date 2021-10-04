const { model, Schema } = require("mongoose");

const todoUserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model("TodoUser", todoUserSchema);
