const mongoose = require("mongoose");
const User = require("./User");
// Define the schema for Todo
const roomTodosSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Define the schema for Member
const memberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomTodos",
    },
  ],
});

// Define the schema for Message
const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const studyRoomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const StudyRoom = mongoose.model("StudyRoom", studyRoomSchema);
const Member = mongoose.model("Member", memberSchema);
const Message = mongoose.model("Message", messageSchema);
const RoomTodos = mongoose.model("RoomTodos", roomTodosSchema);

module.exports = { StudyRoom, Member, Message, RoomTodos };
