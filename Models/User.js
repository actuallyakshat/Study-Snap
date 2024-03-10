const mongoose = require("mongoose");
const CompletedTimer = require("./CompletedTimers");

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
  completedTimers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompletedTimer",
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.completedTimers.length > 10) {
    user.completedTimers = user.completedTimers.slice(
      user.completedTimers.length - 10
    );
  }

  if (user.completedTimers.length > 10) {
    const oldestTimer = user.completedTimers.shift();
    await CompletedTimer.findByIdAndDelete(oldestTimer._id);
  }

  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;

  try {
    await Todo.deleteMany({ _id: { $in: user.todos } });
    await CompletedTimer.deleteMany({ _id: { $in: user.completedTimers } });
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
