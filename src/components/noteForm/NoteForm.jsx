import React, { useState } from 'react';
import './NoteForm.css';

const NoteForm = ({ group, setGroups, groups }) => {
  const [text, setText] = useState('');

  const saveNote = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = new Date();
    const newNote = {
      id: Date.now(),
      text: trimmed,
      date: now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updatedGroups = groups.map((g) =>
      g.id === group.id ? { ...g, notes: [...g.notes, newNote] } : g
    );
    setGroups(updatedGroups);
    setText('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveNote();
    }
  };

  return (
    <footer className="note-form">
      <input
        type="text"
        placeholder="Enter your text here..........."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
      />
      <button onClick={saveNote} className={text.trim() ? 'active' : ''}>
        &gt;
      </button>
    </footer>
  );
};

export default NoteForm;
