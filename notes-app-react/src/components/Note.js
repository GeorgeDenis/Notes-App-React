import { MdDeleteForever, MdColorLens } from "react-icons/md";
import { useState } from "react";
const Note = ({
  id,
  text,
  date,
  handleDeleteNote,
  handleNoteColor,
  backgroundColor,
}) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(backgroundColor);
  const noteStyle = {
    backgroundColor: backgroundColor,
  };
  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  const handleColorChange = (color, id) => {
    setSelectedColor(color);
    toggleColorPicker();
    handleNoteColor(id, color);
  };
  return (
    <div className="note" style={noteStyle}>
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <div>
          <MdColorLens
            className="color-icon"
            size="1.3em"
            onClick={toggleColorPicker}
          />
          <MdDeleteForever
            className="delete-icon"
            size="1.3em"
            onClick={() => handleDeleteNote(id)}
          />
        </div>
        {isColorPickerOpen && (
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value, id)}
          />
        )}
      </div>
    </div>
  );
};

export default Note;
