import React, { useState } from "react";
import "./NoteArea.css";

const NoteArea = ({ groupName, notes, onAddNote }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onAddNote(groupName, text);
    setText("");
  };

  return (
    <div className="note-area">
      <h2>{groupName}</h2>
      <div className="notes-list">
        {notes.map((note, idx) => (
          <div className="note" key={idx}>
            <p>{note.content}</p>
            <span>
              {new Date(note.createdAt).toLocaleDateString()} • {" "}
              {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
      <div className="note-input">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
          placeholder="Here’s the sample text for sample work"
        ></textarea>
        <button className={`send-btn ${text ? "active" : ""}`} onClick={handleSend}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default NoteArea;