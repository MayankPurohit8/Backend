const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/socialApp");

const userModel = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  age: Number,
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

module.exports = mongoose.model("user", userModel);
