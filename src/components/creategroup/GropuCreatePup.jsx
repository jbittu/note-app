import React, { useRef, useEffect, useState } from 'react';
import '../creategroup/GropuCreatePup.css';

const CreateGroupPopup = ({ setShowPopup, groups, setGroups }) => {
  const popupRef = useRef();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#1e40af');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const createGroup = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) return setError('Minimum 2 characters');
    if (groups.some((g) => g.name.toLowerCase() === trimmed.toLowerCase())) {
      return setError('Group already exists');
    }
    const id = Date.now().toString();
    const avatar = trimmed
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('')
      .slice(0, 2);
    const newGroup = { id, name: trimmed, avatar, color, notes: [] };
    setGroups([...groups, newGroup]);
    setShowPopup(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup" ref={popupRef}>
        <h2>Create Group</h2>
        <input
          type="text"
          placeholder="Group name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
        />
        {error && <p className="error">{error}</p>}
        <div className="color-picker">
          <label>Pick Color: </label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <button onClick={createGroup}>Create</button>
      </div>
    </div>
  );
};

export default CreateGroupPopup;