import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronDown } from "react-icons/fa";
import "../styles/createTask.css";
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";

function CreateTask() {
  const [formData, setFormData] = useState({
    taskName: "",
    category: "",
    date: "",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    description: "",
  });
  const { taskName, category, date, startTime, endTime, description } =
    formData;

  const today = new Date().toISOString().split("T")[0];

  // Set the date from URL parameters if available
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedDate = urlParams.get("date");
    if (preSelectedDate) {
      setFormData((prev) => ({ ...prev, date: preSelectedDate }));
    }
  }, []);

  const timeTo24HourFormat = (time) => {
    const [timePart, period] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return { hours, minutes };
  };

  const handleCreateTask = async () => {
    if (
      !taskName ||
      !category ||
      !date ||
      !startTime ||
      !endTime ||
      !description
    ) {
      ErrorToast("Please fill in all fields");
      return;
    }

    const { hours: startHours, minutes: startMinutes } =
      timeTo24HourFormat(startTime);
    const { hours: endHours, minutes: endMinutes } =
      timeTo24HourFormat(endTime);

    const startDateTime = new Date(
      `${date}T${startHours.toString().padStart(2, "0")}:${startMinutes
        .toString()
        .padStart(2, "0")}`
    );
    const endDateTime = new Date(
      `${date}T${endHours.toString().padStart(2, "0")}:${endMinutes
        .toString()
        .padStart(2, "0")}`
    );

    if (startDateTime >= endDateTime) {
      ErrorToast("End time must be after start time");
      return;
    }

    if (date < today) {
      ErrorToast("Date cannot be in the past");
      return;
    }

    try {
      await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      SuccessToast("Task created successfully");
      setFormData({
        taskName: "",
        category: "",
        date: "",
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        description: "",
      });
    } catch (err) {
      toast.error("Error creating task");
    }
  };

  const addHours = (time, setTime) => {
    const { hours, minutes } = timeTo24HourFormat(time);
    let newHours = hours + 1;
    if (newHours > 12) newHours -= 12;
    const period = newHours >= 12 ? "PM" : "AM";
    setTime(
      `${newHours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryClick = (selectedCategory) => {
    setFormData((prev) => ({
      ...prev,
      category: selectedCategory === formData.category ? "" : selectedCategory,
    }));
  };

  return (
    <div className="create-task-page">
      <ToastContainer />
      <h1>Create a New Task</h1>
      <form className="task-form">
        <div className="form-group">
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={taskName}
            onChange={handleChange}
            placeholder="Enter task name"
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <div className="category-buttons">
            {[
              "Work",
              "Personal Development",
              "Health & Fitness",
              "Household",
              "Social",
              "Finance",
            ].map((cat) => (
              <button
                key={cat}
                className={`category-button ${
                  category === cat ? "selected" : ""
                }`}
                type="button"
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            min={today}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group time-group">
          <div className="time-input">
            <label htmlFor="startTime">Start Time:</label>
            <div className="input-container">
              <input
                type="text"
                id="startTime"
                name="startTime"
                value={startTime}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
                required
              />
              <FaChevronDown
                className="time-icon"
                onClick={() =>
                  addHours(startTime, (value) =>
                    setFormData((prev) => ({ ...prev, startTime: value }))
                  )
                }
              />
            </div>
          </div>
          <div className="time-input">
            <label htmlFor="endTime">End Time:</label>
            <div className="input-container">
              <input
                type="text"
                id="endTime"
                name="endTime"
                value={endTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endTime: e.target.value }))
                }
                required
              />
              <FaChevronDown
                className="time-icon"
                onClick={() =>
                  addHours(endTime, (value) =>
                    setFormData((prev) => ({ ...prev, endTime: value }))
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter task description"
            required
          />
        </div>
        <button className="btn" type="button" onClick={handleCreateTask}>
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
