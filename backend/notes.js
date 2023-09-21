const fs = require("fs");
const path = require("path");

const notesFilePath = path.join(__dirname, "notes.json");

function readNotesFromFile() {
  try {
    const notesData = fs.readFileSync(notesFilePath, "utf-8");
    return JSON.parse(notesData);
  } catch (error) {
    return [];
  }
}

function writeNotesToFile(notes) {
  const notesData = JSON.stringify(notes, null, 2);
  fs.writeFileSync(notesFilePath, notesData);
}

function addNote(note) {
  const notes = readNotesFromFile();

  notes.push(note);
  writeNotesToFile(notes);
}

function getAllNotes() {
  return readNotesFromFile();
}

function updateNoteColor(id, backgroundColor) {
  try {
    const notes = readNotesFromFile();
    const newNotes = notes.map((note) => {
      if (note.id !== id) {
        return note;
      } else {
        return {
          ...note,
          backgroundColor,
        };
      }
    });

    writeNotesToFile(newNotes);
  } catch (error) {
    return readNotesFromFile();
  }
}

function deleteNote(id) {
  try {
    const notes = readNotesFromFile();
    const newNotes = notes.filter((note) => note.id !== id);
    writeNotesToFile(newNotes);
  } catch (error) {
    return readNotesFromFile();
  }
}

module.exports = {
  addNote,
  getAllNotes,
  updateNoteColor,
  deleteNote,
};
