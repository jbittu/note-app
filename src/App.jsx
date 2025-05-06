import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import NoteArea from "./components/notearea/NoteArea";
import GroupModal from "./components/groupmodal/GroupModal";

function App() {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState({});
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || {};
    setGroups(savedGroups);
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addGroup = (name, color) => {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");

    const newGroup = {
      id: Date.now().toString(),
      name,
      color,
      initials,
    };
    setGroups([...groups, newGroup]);
    setShowModal(false);
  };

  const addNote = (text) => {
    const now = new Date();
    const newNote = {
      content: text,
      created: now.toISOString(),
      updated: now.toISOString(),
    };
    setNotes({
      ...notes,
      [selectedGroupId]: [...(notes[selectedGroupId] || []), newNote],
    });
  };

  return (
    <div className="app">
      <Sidebar
        groups={groups}
        setShowModal={setShowModal}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
      />
      {selectedGroupId ? (
        <NoteArea
          notes={notes[selectedGroupId] || []}
          onAddNote={addNote}
        />
      ) : (
        <div className="welcome">
          <h1>Pocket Notes</h1>
          <p>Send and receive messages without keeping your phone online.</p>
        </div>
      )}
      {showModal && (
        <GroupModal
          onClose={() => setShowModal(false)}
          onCreateGroup={addGroup}
          groups={groups}
        />
      )}
    </div>
  );
}

export default App;
