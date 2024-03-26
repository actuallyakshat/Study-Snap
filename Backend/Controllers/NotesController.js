const Note = require("../Models/Note");
const User = require("../Models/User");
const Folder = require("../Models/Folder");

// Controller function to add a new note
const addNote = async (req, res) => {
  try {
    const { title, content, dateCreated, folderId, email } = req.body;

    const newNote = new Note({
      title,
      dateCreated,
      content,
      folder: folderId,
    });

    await newNote.save();
    await Folder.findByIdAndUpdate(
      folderId,
      { $addToSet: { notes: newNote._id } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { email },
      { $addToSet: { folders: folderId } },
      { new: true }
    );

    res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const saveNoteContent = async (req, res) => {
  try {
    const { noteId, title, content } = req.body;
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }
    note.content = content;
    note.title = title;
    await note.save();
    res
      .status(200)
      .json({ success: true, message: "Note content updated successfully" });
  } catch (error) {
    console.error("Error saving note content:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { noteId, email } = req.body;
    await Note.findByIdAndDelete(noteId);
    await User.findOneAndUpdate({ email }, { $pull: { folders: noteId } });
    await Folder.updateMany({ notes: noteId }, { $pull: { notes: noteId } });

    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
// Controller function to add a new folder
const addFolder = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newFolder = new Folder({
      name,
    });

    await newFolder.save();

    await User.findOneAndUpdate(
      { email },
      { $addToSet: { folders: newFolder._id } }, // Add the new folder ID to the folders array if it doesn't already exist
      { new: true }
    );

    res.status(201).json({ success: true, folder: newFolder });
  } catch (error) {
    console.error("Error adding folder:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const { folderId, email } = req.body;

    // Find and delete the folder from the database
    await Folder.findByIdAndDelete(folderId);

    // Find and delete all notes associated with the folder
    await Note.deleteMany({ folder: folderId });

    // Remove the folder from the user's folders array
    await User.findOneAndUpdate(
      { email },
      { $pull: { folders: folderId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Folder and associated notes deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting folder and associated notes:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  addNote,
  deleteNote,
  addFolder,
  deleteFolder,
  saveNoteContent,
};
