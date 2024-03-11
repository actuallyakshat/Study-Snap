const mongoose = require("mongoose");
const Note = require("./Note");

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

folderSchema.pre("remove", async function (next) {
  try {
    await Note.deleteMany({ _id: { $in: this.notes } });
    next();
  } catch (error) {
    next(error);
  }
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
