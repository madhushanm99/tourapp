import React from 'react';
import './AlertModal.css';

function AlertModal({ message, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default AlertModal;