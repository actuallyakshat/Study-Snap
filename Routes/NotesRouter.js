const express = require("express");
const router = express.Router();
const {
  addNote,
  deleteNote,
  addFolder,
  deleteFolder,
  saveNoteContent,
} = require("../Controllers/NotesController");

router.post("/add-note", addNote);
router.put("/save-note", saveNoteContent);
router.delete("/delete-note", deleteNote);
router.post("/add-folder", addFolder);
router.delete("/delete-folder", deleteFolder);

module.exports = router;
