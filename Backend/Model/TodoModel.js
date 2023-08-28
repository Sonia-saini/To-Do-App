const mongoose = require("mongoose");
const todoschema = mongoose.Schema({
  title: String,
  description: String,
  userId: String,
});
const Todomodel = mongoose.model("todo", todoschema);
module.exports = { Todomodel };
