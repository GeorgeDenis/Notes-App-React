const {
  addNote,
  getAllNotes,
  updateNoteColor,
  deleteNote,
} = require("./notes");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8082;

app.use(express.json());
app.use(cors());

app.get("/notes", (req, res) => {
  const notes = getAllNotes();
  res.status(200).send({
    notes,
  });
});

app.post("/notes", (req, res) => {
  const { id, text, date, backgroundColor } = req.body;

  if (!id || !text || !date || !backgroundColor) {
    res.status(418).send({ message: "Complete all fields!" });
  } else {
    const note = { id, text, date, backgroundColor };

    addNote(note);
    res.status(201).send({
      message: "Note added successfully",
    });
  }
});

app.patch("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { backgroundColor } = req.body;

  if (!backgroundColor) {
    res.status(418).send({ message: "You must send a valid color!" });
  } else {
    const noteId = parseInt(id);

    if (isNaN(noteId)) {
      res.status(400).send({ message: "Invalid note ID!" });
    } else {
      updateNoteColor(noteId, backgroundColor);
      res.status(200).send({
        message: "Color modified successfully!",
      });
    }
  }
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  deleteNote(id);
  res.status(200).send({
    message: "Note deleted successfully!",
  });
});

app.listen(PORT, () =>
  console.log(`The server it's on at http://localhost:${PORT}`)
);
