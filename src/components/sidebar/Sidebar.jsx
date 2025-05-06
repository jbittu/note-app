import React from "react";
import "./Sidebar.css";

const Sidebar = ({ groups, selectedGroup, onSelectGroup, onShowModal }) => {
  return (
    <div className="sidebar">
      <h2>Pocket Notes</h2>
      <ul>
        {groups.map((group) => (
          <li
            key={group.name}
            className={selectedGroup === group.name ? "active" : ""}
            onClick={() => onSelectGroup(group.name)}
          >
            <span className="avatar" style={{ backgroundColor: group.color }}>
              {group.initials}
            </span>
            {group.name}
          </li>
        ))}
      </ul>
      <button className="add-btn" onClick={onShowModal}>
        +
      </button>
    </div>
  );
};

export default Sidebar;