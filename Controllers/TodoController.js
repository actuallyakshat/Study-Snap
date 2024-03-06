const Todo = require("../Models/Todo");
const User = require("../Models/User");

const createTodo = async (req, res) => {
  try {
    const { task, auth0Id } = req.body;
    if (!task || !auth0Id) {
      return res.status(400).json({ message: "Task and auth0Id are required" });
    }
    const user = await User.findOne({ auth0Id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const todo = new Todo({
      task,
    });
    await todo.save();

    await User.findOneAndUpdate(
      { auth0Id: auth0Id },
      { $push: { todos: todo._id } }
    );
    console.log(todo);
    res.status(201).json({ todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { todoId, task } = req.body;

    if (!todoId) {
      return res.status(400).json({ message: "TodoId is required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { task },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todoId, auth0Id } = req.body;

    if (!todoId || !auth0Id) {
      return res
        .status(400)
        .json({ message: "TodoId and auth0Id are required" });
    }

    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await User.findOneAndUpdate(
      { auth0Id: auth0Id },
      { $pull: { todos: todoId } }
    );

    res.json({ deletedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
};
