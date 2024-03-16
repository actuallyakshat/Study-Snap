const mongoose = require("mongoose");

const completedTimerSchema = new mongoose.Schema({
  duration: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const CompletedTimer = mongoose.model("CompletedTimer", completedTimerSchema);

module.exports = CompletedTimer;
