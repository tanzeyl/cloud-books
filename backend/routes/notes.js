const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Get all the notes of logged-in User. => api/notes/getAllNotes Required log-in.
router.get("/getAllNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

//ROUTE 2: Create a new Note using POST. => api/notes/createNewNote Requires log-in.
router.post(
  "/createNewNote",
  fetchuser,
  [
    body("title", "Title cannot be empty.").notEmpty(),
    body("description", "Description cannot be empty.").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      let note = await Note.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
      res.json(note);
    } catch (err) {
      return res.status(500).send("Internal server error.");
    }
  }
);

// ROUTE 3: Update an existing Note using PUT. => /api/notes/updateNote. Requires log-in.
router.put(
  "/updateNote/:id",
  fetchuser,
  [
    body("title", "Title cannot be empty.").notEmpty(),
    body("description", "Description cannot be empty.").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      // Create a new note object.
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;
      // Find the note to be updated.
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note not found.");
      }
      // Check if the note belongs to the user.
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized access.");
      }
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (err) {
      return res.status(500).send("Internal server error.");
    }
  }
);

// ROUTE 4: Delete an existing note using DELETE. => /api/note/deleteNote. Requires log-in.
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    // Check if the note exists.
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Note not found.");
    }
    // Delete the note.
    note = await Note.findByIdAndDelete(req.params.id);
    res.json("Note has been deleted.");
  } catch (err) {
    return res.status(500).send("Internal server error.");
  }
});

// ROUTE 5: Fetch all notes with a certain word in the tag. => /api/note/filterNotes. Requires log-in.
router.post("/filterNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    const regex = new RegExp(`\\w*${req.body.query}\\w*`, "i");
    const filteredNotes = notes.filter((note) => regex.test(note.tag));
    res.json(filteredNotes);
  } catch (err) {
    return res.status(500).send("Internal server error.");
  }
});

module.exports = router;
