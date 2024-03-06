const Todo = require("../Models/Todo");
const User = require("../Models/User");

const createTodo = async (req, res) => {
  try {
    const { task, auth0Id, order } = req.body;
    if (!task || !auth0Id) {
      return res
        .status(400)
        .json({ success: false, message: "Task and auth0Id are required" });
    }
    const user = await User.findOne({ auth0Id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const todo = new Todo({
      task,
      order,
    });
    await todo.save();

    await User.findOneAndUpdate(
      { auth0Id: auth0Id },
      { $push: { todos: todo._id } }
    );
    console.log(todo);
    res.status(201).json({ success: true, todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { todoId, task } = req.body;

    if (!todoId) {
      return res
        .status(400)
        .json({ success: false, message: "TodoId is required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { task },
      { new: true }
    );

    if (!updatedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.json({ success: true, updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todoId, auth0Id } = req.body;

    if (!todoId || !auth0Id) {
      return res
        .status(400)
        .json({ success: false, message: "TodoId and auth0Id are required" });
    }

    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    await User.findOneAndUpdate(
      { auth0Id: auth0Id },
      { $pull: { todos: todoId } }
    );

    res.json({ deletedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const reorderTodo = async (req, res) => {
  try {
    const newOrder = req.body.newOrder;

    await Promise.all(
      newOrder.map(async (todoId, index) => {
        await Todo.updateOne({ _id: todoId }, { $set: { order: index } });
      })
    );
    res
      .status(200)
      .json({ success: true, message: "Todos reordered successfully" });
  } catch (err) {
    console.error("Error reordering todos:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
};
