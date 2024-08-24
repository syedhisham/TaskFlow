import React, { useState } from 'react';
import '../styles/confirmationModal.css';

const CalendarConfirmationModal = ({ isOpen, onClose, selectedDate, onAddEvent, onAddTask, isFutureDate }) => {
  const [eventName, setEventName] = useState('');

  if (!isOpen) return null;

  const handleAddEventClick = () => {
    if (eventName.trim()) {
      onAddEvent(eventName);
      setEventName(''); // Reset event name input
    } else {
      alert('Please enter an event name.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add Event on {selectedDate?.toDateString()}</h2>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event name"
        />
        <button className="btn" onClick={handleAddEventClick}>Add Event</button>
        {/* Conditionally render the "Add a New Task" button */}
        {isFutureDate && (
          <button className="btn" onClick={onAddTask}>Add a New Task</button>
        )}
        <button className="btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CalendarConfirmationModal;
