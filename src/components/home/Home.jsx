import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import NoteArea from '../noteArea/NoteArea';
import './Home.css';

const Home = () => {
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem('groups');
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [showNoteArea, setShowNoteArea] = useState(false);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const currentGroup = groups.find(group => group.id === currentGroupId);

  return (
    <div className="home">
      <div className={`sidebar-wrapper ${showNoteArea ? 'hide' : ''}`}>
        <Sidebar
          groups={groups}
          setGroups={setGroups}
          currentGroupId={currentGroupId}
          setCurrentGroupId={(id) => {
            setCurrentGroupId(id);
            setShowNoteArea(true);
          }}
        />
      </div>

      <div className={`notearea-wrapper ${showNoteArea ? 'show' : ''}`}>
        <NoteArea
          group={currentGroup}
          setGroups={setGroups}
          groups={groups}
          onBack={() => setShowNoteArea(false)}
        />
      </div>
    </div>
  );
};

export default Home;
