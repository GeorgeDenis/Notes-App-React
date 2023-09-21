import NotesList from "./components/NotesList";
import { nanoid } from "nanoid";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is a my first note",
      date: "15/09/2023",
    },
    {
      id: nanoid(),
      text: "This is a my second note",
      date: "16/09/2023",
    },
    {
      id: nanoid(),
      text: "This is a my third note",
      date: "17/09/2023",
    },
    {
      id: nanoid(),
      text: "This is a my fourth note",
      date: "18/09/2023",
    },
  ]);
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };
  return (
    <div className="container">
      <NotesList notes={notes} handleNewNote={addNote} />
    </div>
  );
}

export default App;
