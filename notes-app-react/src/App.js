import NotesList from "./components/NotesList";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import Header from "./components/Header";

const postNoteDb = async (id, text, date, backgroundColor) => {
  const response = await fetch("http://localhost:8082/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      text,
      date,
      backgroundColor,
    }),
  });
  if (!response.ok) {
    alert("Could not save note!");
    return;
  }
};

const deleteNoteDb = async (id) => {
  const response = await fetch(`http://localhost:8082/notes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    alert("Could not delete note!");
    return;
  }
};

const updateNoteColorDb = async (id, backgroundColor) => {
  const response = await fetch(`http://localhost:8082/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ backgroundColor }),
  });
  if (!response.ok) {
    alert("Could not update note color!");
    return;
  }
};

function App() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8082/notes");
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      const savedNotes = data.notes;
      if (savedNotes) {
        setNotes(savedNotes);
      }
    };
    fetchData();
  }, []);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text,
      date: date.toLocaleDateString(),
      backgroundColor: "lightblue",
    };
    postNoteDb(newNote.id, newNote.text, newNote.date, newNote.backgroundColor);
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    deleteNoteDb(id);
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
    updateNoteColorDb(id, backgroundColor);
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
