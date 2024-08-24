import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarConfirmationModal from "../components/CalendarConfirmationModal";
import axios from "axios";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFutureDate, setIsFutureDate] = useState(true);

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events"); // Updated URL
        setEvents(response.data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const clickedDate = new Date(slotInfo.start).setHours(0, 0, 0, 0);

    if (clickedDate >= today) {
      setSelectedDate(slotInfo.start);
      setIsFutureDate(true);
      setModalOpen(true);
    } else {
      setSelectedDate(slotInfo.start);
      setIsFutureDate(false);
      setModalOpen(true);
    }
  };

  const handleAddEvent = async (eventName) => {
    const newEvent = {
      title: eventName,
      start: selectedDate,
      end: selectedDate,
    };

    try {
      // Save the event to the database
      const response = await axios.post("/api/events", newEvent);

      // Update the events state with the newly created event
      setEvents([...events, response.data]);
    } catch (err) {
      console.error("Failed to add event:", err.message);
      // Additional logging or user notification can be added here
    }

    setModalOpen(false);
  };

  const handleConfirm = () => {
    window.location.href = `/createTask?date=${
      selectedDate.toISOString().split("T")[0]
    }`;
  };

  return (
    <div className="calendar-container" style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        selectable
        onSelectSlot={handleSelectSlot}
      />
      <CalendarConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddEvent={handleAddEvent}
        onAddTask={handleConfirm}
        selectedDate={selectedDate}
        isFutureDate={isFutureDate} // Pass the validation status to the modal
      />
    </div>
  );
};

export default CalendarComponent;
