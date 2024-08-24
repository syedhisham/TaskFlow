import React from 'react';
import '../styles/confirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{message}</h2>
        <button className='btn' onClick={onConfirm}>Confirm</button>
        <button className='btn' onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
