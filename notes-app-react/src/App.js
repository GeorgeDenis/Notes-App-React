import NotesList from "./components/NotesList";
import { nanoid } from "nanoid";
import { useState } from "react";
import Search from "./components/Search";
import Header from "./components/Header";
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
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

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
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container ">
        <Header handleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleNewNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}

export default App;
