import React, { useState, useRef, useEffect } from "react";
import "./GroupModal.css";

const COLORS = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

const GroupModal = ({ onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleCreate = () => {
    if (groupName.length < 2) return;
    onCreateGroup(groupName, selectedColor);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <h3>Create New Group</h3>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="color-picker">
          {COLORS.map((color) => (
            <span
              key={color}
              className={`color-circle ${selectedColor === color ? "selected" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <button className="create-btn" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default GroupModal;