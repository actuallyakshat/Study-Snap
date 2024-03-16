const mongoose = require("mongoose");
const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

const Folder = mongoose.model("Folder", folderSchema);
module.exports = Folder;
