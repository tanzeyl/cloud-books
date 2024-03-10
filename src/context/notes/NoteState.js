import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const url = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${url}/api/notes/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (note) => {
    const response = await fetch(`${url}/api/notes/createNewNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
        tag: note.tag,
      }),
    });
    const json = await response.json();
    let newNote = json;
    setNotes(notes.concat(newNote));
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${url}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    console.log(response);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${url}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // Filter notes
  const filterNotes = async (query) => {
    const response = await fetch(`${url}/api/notes/filterNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ query }),
    });
    const json = await response.json();
    setNotes(json);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        filterNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
