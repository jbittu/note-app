import React from 'react';
import NoteForm from '../noteForm/NoteForm';
import './NoteArea.css';

const NoteArea = ({ group, setGroups, groups, onBack }) => {
  if (!group) return <div className="note-area empty">Select or create a group</div>;

  return (
    <div className="note-area">
      <header style={{ backgroundColor: group.color }}>
  <button className="back-btn" onClick={onBack}>&larr;</button>
  <div className="avatar">{group.avatar}</div>
  <h2>{group.name}</h2>
</header>

      <main>
        {group.notes.length === 0 ? (
          <p className="no-notes">No notes yet. Add your first note below.</p>
        ) : (
          group.notes.map((note) => (
            <div key={note.id} className="note">
              <p>{note.text}</p>
              <div className="meta">
                <span>{note.date}</span>
                <span>•</span>
                <span>{note.time}</span>
              </div>
            </div>
          ))
        )}
      </main>
      <NoteForm group={group} setGroups={setGroups} groups={groups} />
    </div>
  );
};

export default NoteArea;