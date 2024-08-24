import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/editTask.css'; 
import { ToastContainer } from 'react-toastify';
import ErrorToast from '../components/ErrorToast';
import SuccessToast from '../components/SuccessToast';
import 'react-toastify/dist/ReactToastify.css';

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    taskName: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`);
        if (!response.ok) throw new Error("Failed to fetch task");
        const data = await response.json();
        setFormData({
          taskName: data.taskName,
          category: data.category,
          date: data.date.slice(0, 10),
          startTime: data.startTime,
          endTime: data.endTime,
          description: data.description,
        });
      } catch (err) {
        setError("Failed to fetch task");
        ErrorToast("Failed to fetch task");
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update task");
      SuccessToast("Task updated successfully");
      setTimeout(() => {
        navigate('/home');
      }, 1500); // Delay of 3 seconds
    } catch (err) {
      ErrorToast("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-task-page">
      <ToastContainer />
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <FormGroup
          label="Task Name:"
          id="taskName"
          name="taskName"
          value={formData.taskName}
          onChange={handleChange}
          type="text"
          placeholder="Enter task name"
        />
        <FormGroup
          label="Category:"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          type="select"
          options={[
            { value: "", text: "Select category", disabled: true },
            { value: "Work", text: "Work" },
            { value: "Personal Development", text: "Personal Development" },
            { value: "Health & Fitness", text: "Health & Fitness" },
            { value: "Household", text: "Household" },
            { value: "Social", text: "Social" },
            { value: "Finance", text: "Finance" },
          ]}
        />
        <FormGroup
          label="Date:"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
        />
        <FormGroup
          label="Start Time:"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          type="time"
        />
        <FormGroup
          label="End Time:"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          type="time"
        />
        <FormGroup
          label="Description:"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="textarea"
          placeholder="Enter task description"
        />
        <button type="submit" className="submit-button">Update Task</button>
      </form>
    </div>
  );
};

// Reusable FormGroup Component
const FormGroup = ({ label, id, name, value, onChange, type, options, placeholder }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    {type === 'select' ? (
      <select id={id} name={name} value={value} onChange={onChange} required>
        {options.map((option, index) => (
          <option key={index} value={option.value} disabled={option.disabled}>
            {option.text}
          </option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      ></textarea>
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    )}
  </div>
);

export default EditTask;
