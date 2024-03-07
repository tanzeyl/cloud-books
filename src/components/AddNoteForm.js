import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNoteForm = (props) => {
  let contextNote = useContext(NoteContext);
  const { addNote } = contextNote;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    props.showAlert("Note has been added.", "success");
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Add Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Note Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5}
            required
            value={note.title}
          />
          <div className="form-text">All of your notes are secure with us!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Note Description
          </label>
          <textarea
            onChange={onChange}
            className="form-control"
            id="description"
            name="description"
            cols="30"
            rows="5"
            minLength={5}
            required
            value={note.description}
          ></textarea>
        </div>
        <label htmlFor="tag" className="form-label">
          Note Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          aria-describedby="emailHelp"
          onChange={onChange}
          value={note.tag}
        />
        <button
          type="submit"
          onClick={handleClick}
          className="btn btn-lg btn-success my-3"
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          Add Note
        </button>
      </form>
    </>
  );
};

export default AddNoteForm;
