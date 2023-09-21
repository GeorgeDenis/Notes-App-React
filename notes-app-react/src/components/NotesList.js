import AddNote from "./AddNote";
import Note from "./Note";

const NotesList = ({ notes, handleNewNote, handleDeleteNote }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
      <AddNote handleNewNote={handleNewNote} />
    </div>
  );
};

export default NotesList;
