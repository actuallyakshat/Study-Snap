const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
