import React from 'react';
import './AddToDatabaseModal.css'; // Import the CSS file for styling

const AddToDatabaseModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        {children} {/* Render any content passed to the modal */}
      </div>
    </div>
  );
};

export default AddToDatabaseModal;
