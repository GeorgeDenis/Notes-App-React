import NotesList from "./components/NotesList";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import Header from "./components/Header";
function App() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text,
      date: date.toLocaleDateString(),
      backgroundColor: "lightblue",
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  const changeNoteColor = (id, backgroundColor) => {
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
          handleNoteColor={changeNoteColor}
        />
      </div>
    </div>
  );
}

export default App;
