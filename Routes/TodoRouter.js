const express = require("express");
const router = express.Router();
const {
  createTodo,
  deleteTodo,
  updateTodo,
  reorderTodo,
  updateTodoStatus,
} = require("../Controllers/TodoController");

router.post("/create", createTodo);
router.put("/update", updateTodo);
router.put("/update-status", updateTodoStatus);
router.delete("/delete", deleteTodo);
router.put("/update-order", reorderTodo);

module.exports = router;
