const Note = require("../models/Note");
const Folder = require("../models/Folder");
const User = require("../models/User");

const addNote = async (req, res) => {
  try {
    const { title, content, folderId, auth0Id } = req.body;
    let folder;
    if (folderId) {
      folder = await Folder.findById(folderId);
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
    } else {
      // Get the unorganized folder of the user
      const user = await User.findOne({ auth0Id }).populate("folders");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Find the "unorganized" folder
      folder = user.folders.find((folder) => folder.name === "unorganized");
      if (!folder) {
        return res
          .status(404)
          .json({ message: "Unorganized folder not found" });
      }
    }

    // Create the new note
    const note = new Note({
      title,
      content,
      folder: folder._id,
    });

    // Save the note
    await note.save();

    // Update the folder's notes array
    folder.notes.push(note._id);
    await folder.save();

    res.status(201).json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addNote,
};
