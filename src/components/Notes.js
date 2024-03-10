import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNoteForm from "./AddNoteForm";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const refClose = useRef(null);

  const contextNote = useContext(NoteContext);
  const { notes, getNotes, editNote, filterNotes } = contextNote;

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (note) => {
    ref.current.click();
    setNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  };

  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note has been updated.", "info");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const filter = (e) => {
    setQuery(e.target.value);
    console.log(query);
    filterNotes(query);
  };

  return (
    <>
      <AddNoteForm showAlert={props.showAlert} />

      {/* Edit Note Modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Note Title
                  </label>
                  <input
                    value={note.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Note Description
                  </label>
                  <textarea
                    value={note.edescription}
                    onChange={onChange}
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    cols="30"
                    rows="10"
                    minLength={5}
                    required
                  ></textarea>
                </div>
                <label htmlFor="etag" className="form-label">
                  Note Tag
                </label>
                <input
                  value={note.etag}
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display!"}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="query"
            name="query"
            onChange={filter}
            placeholder="Search by tag"
            value={query}
          />
        </div>
        {notes.map((item, index) => {
          return (
            <NoteItem
              key={item._id}
              updateNote={updateNote}
              note={item}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
