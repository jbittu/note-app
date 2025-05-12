import React from 'react'
import { useState } from 'react'
import './Sidebar.css'
import GroupCreatePup from '../creategroup/GropuCreatePup'


const Sidebar = ({groups, setGroups, currentGroupId, setCurrentGroupId}) => {
  const [showPopup, setShowPopup] = useState(false);

  const selectGroup = (Id) => {
    setCurrentGroupId(Id);
  }


  return (
    <aside className='sidebar'>
    <h1>Pocket Notes</h1>
    <nav>
      {groups.map((group) => (
        <div key={group.id} className={`group-item ${ group.id === currentGroupId  ? 'active' : ''}`} onClick={() => selectGroup(group.id)}>
          <div className='groupColor' style={{ backgroundColor: group.color }}>{group.groupColor}</div>
          <span>{group.name}</span>
        </div>
      ))}
    </nav>
    <button className='add-group' onClick={() => setShowPopup(true)}>+</button>
{showPopup && (
  <GroupCreatePup
  setShowPopup={setShowPopup}
  groups={groups}
  setGroups={setGroups}
  />
)}    
     </aside>
  );
};

export default Sidebar