const mongoose = require("mongoose");
const CompletedTimer = require("./CompletedTimers");
const Todo = require("./Todo");
const Folder = require("./Folder");
const ProductivityData = require("./ProductivityData");

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
  studyTarget: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 0,
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
  folders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
  ],
  productivityData: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ProductivityData" },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const defaultFolder = await Folder.create({ name: "unorganized" });
      this.folders.push(defaultFolder._id);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("save", async function (next) {
  if (this.completedTimers.length > 10) {
    this.completedTimers = this.completedTimers.slice(
      this.completedTimers.length - 10
    );
  }

  if (this.completedTimers.length > 10) {
    const oldestTimer = this.completedTimers.shift();
    await CompletedTimer.findByIdAndDelete(oldestTimer._id);
  }

  next();
});

userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      console.log("Removing user with todos:", User.todos);
      await Todo.deleteMany({ _id: { $in: User.todos } });
      await CompletedTimer.deleteMany({ _id: { $in: User.completedTimers } });
      await Folder.deleteMany({ _id: { $in: User.folders } });
      next();
    } catch (error) {
      console.log(error);
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
