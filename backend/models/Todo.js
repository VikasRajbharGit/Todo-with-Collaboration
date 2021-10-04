const { model, Schema, modelNames } = require("mongoose");

const todoSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  collabUsers: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Todo", todoSchema);
