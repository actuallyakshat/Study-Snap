const express = require("express");
const router = express.Router();
const {
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../Controllers/TodoController");

router.post("/create", createTodo);
router.put("/update", updateTodo);
router.delete("/delete", deleteTodo);

module.exports = router;
