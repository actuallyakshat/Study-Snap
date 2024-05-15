const mongoose = require("mongoose");
const CompletedTimer = require("./CompletedTimers");
const Todo = require("./Todo");
const Folder = require("./Folder");
const ProductivityData = require("./ProductivityData");
const { Agent } = require("http");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    default: null,
  },
  profilePicture: {
    type: String,
    default: null,
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
  age: {
    type: Number,
    default: null,
  },
  bio: {
    type: String,
    default: null,
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
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friendship",
    },
  ],
  studyRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudyRoom",
  },
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
      await Todo.deleteMany({ _id: { $in: User.todos } });
      await CompletedTimer.deleteMany({ _id: { $in: User.completedTimers } });
      await Folder.deleteMany({ _id: { $in: User.folders } });
      next();
    } catch (error) {
      console.error(error);
    }
  }
);

userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const user = this;
      await mongoose.model("Todo").deleteMany({ _id: { $in: user.todos } });
      await mongoose
        .model("CompletedTimer")
        .deleteMany({ _id: { $in: user.completedTimers } });
      await mongoose.model("Folder").deleteMany({ _id: { $in: user.folders } });
      await mongoose
        .model("ProductivityData")
        .deleteMany({ _id: { $in: user.productivityData } });

      next();
    } catch (error) {
      console.error("Error deleting referencing data:", error);
      next(error);
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
