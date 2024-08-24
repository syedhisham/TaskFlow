// src/pages/CompletedTasks.jsx

import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import ConfirmationModal from '../components/ConfirmationModal';
import '../styles/completedTasks.css';
import '../styles/home.css';

const categoryColors = {
  Work: "#d1c4e9",
  "Personal Development": "#bbdefb",
  "Health & Fitness": "#c8e6c9",
  Household: "#fff9c4",
  Social: "#ffccbc",
  Finance: "#c5e1a5",
  All: "#ffffff",
};

const buttonColors = {
  Work: "#7e57c2",
  "Personal Development": "#2196f3",
  "Health & Fitness": "#388e3c",
  Household: "#fbc02d",
  Social: "#e64a19",
  Finance: "#4caf50",
  All: "#ffffff",
};

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks/completed");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError("Failed to fetch completed tasks");
        console.error("Error fetching completed tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, []);

  const handleDeleteClick = async (taskId) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${selectedTaskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== selectedTaskId));
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      setIsModalOpen(false);
      setSelectedTaskId(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTaskId(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner />
        <p>Loading completed tasks, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className='completed-tasks-content'>
      <h1 className="main-heading">Completed Tasks</h1>
      <div className="completed-tasks-page">
        <div className="tasks-container">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="task-card styled-card"
                style={{
                  backgroundColor: categoryColors[task.category] || "#ffffff",
                }}
              >
                <div className="task-card-header">
                  <h2 className="task-name">{task.taskName}</h2>
                  <div className="task-card-icons">
                    <FaTrashAlt
                      className="task-delete-icon"
                      onClick={() => handleDeleteClick(task._id)}
                    />
                  </div>
                </div>
                <div className="task-card-body">
                  <button
                    className="task-category"
                    style={{
                      backgroundColor: buttonColors[task.category] || "#ffffff",
                      color: "#fff",
                    }}
                  >
                    {task.category}
                  </button>
                  <p className="task-date-time">
                    {new Date(task.date).toLocaleDateString()} | {task.startTime} - {task.endTime}
                  </p>
                  <p className="task-description">{task.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No completed tasks available</p>
          )}
        </div>
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this task?"
        />
      </div>
    </div>
  );
}

export default CompletedTasks;
