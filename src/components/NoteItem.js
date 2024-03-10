import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const contextNote = useContext(NoteContext);
  const { deleteNote } = contextNote;
  const { note, updateNote } = props;

  return (
    <>
      <div className="col-md-3">
        <div className="card my-4">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <span className="badge text-bg-primary">{note.tag}</span>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note has been deleted.", "danger");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
                props.showAlert("Note has been updated.", "success");
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
