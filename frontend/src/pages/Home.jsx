import React, { useState, useEffect, useCallback, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEllipsisH,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import "../styles/home.css";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RightSideBar from "../components/RightSideBar";
import ConfirmationModal from "../components/ConfirmationModal";
import '../styles/homeResponsiveness.css'
import LeftSideBar from "../components/LeftSideBar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorToast from "../components/ErrorToast";
import SuccessToast from "../components/SuccessToast";


const categories = [
  "All",
  "Work",
  "Personal Development",
  "Health & Fitness",
  "Household",
  "Social",
  "Finance",
];

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

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCompleteButton, setShowCompleteButton] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [atBottom, setAtBottom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedTaskId, setHighlightedTaskId] = useState(null);
  const containerRef = useRef(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const navigate = useNavigate();

  // Update this function in your code
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
  
      const isScrollable = scrollHeight > clientHeight;
  
      if (!isScrollable) {
        setAtBottom(true);
      } else {
        setAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
      }
    }
  };
  

  const handleScrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: 300, behavior: "smooth" });
    }
  };


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const scrollToTask = (taskId) => {
    const taskElement = document.getElementById(taskId);
    if (taskElement) {
      taskElement.scrollIntoView({ behavior: "smooth", block: "center" });
      taskElement.classList.add("highlight");
      setTimeout(() => {
        taskElement.classList.remove("highlight");
      }, 2000);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const lowercasedQuery = searchQuery.toLowerCase();
    const matchedTask = tasks.find(
      (task) =>
        task.taskName.toLowerCase().includes(lowercasedQuery)
    );
    if (matchedTask) {
      setHighlightedTaskId(matchedTask._id);
      scrollToTask(matchedTask._id);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data.filter((task) => task.status !== "Completed"));
      } catch (err) {
        setError("Failed to fetch tasks");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const matchedTask = tasks.find(
        (task) =>
          task.taskName.toLowerCase().includes(lowercasedQuery)
      );
      if (matchedTask) {
        setHighlightedTaskId(matchedTask._id);
        scrollToTask(matchedTask._id);
      }
    } else {
      setHighlightedTaskId(null);
    }
  }, [searchQuery, tasks]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Initial check for scrollable content
      handleScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    setFilteredTasks(
      category === "All"
        ? tasks.filter((task) => task.status !== "Completed")
        : tasks.filter(
            (task) => task.category === category && task.status !== "Completed"
          )
    );
  };

  const handleShowCompleteButton = (taskId) => {
    setShowCompleteButton((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleCompleteClick = useCallback(
    async (taskId) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/tasks/${taskId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Completed" }),
          }
        );
        if (!response.ok) throw new Error("Failed to update task status");

        const updatedTasks = tasks.map((task) =>
          task._id === taskId ? { ...task, status: "Completed" } : task
        );
        setTasks(updatedTasks);
        setFilteredTasks(
          updatedTasks.filter((task) => task.status !== "Completed")
        );
      } catch (err) {
        console.error("Error updating task status:", err);
      }
    },
    [tasks]
  );

  const openModal = (taskId) => {
    console.log(taskId);

    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };

  const confirmDelete = useCallback(async () => {
    if (taskToDelete) {
      setDeletingTaskId(taskToDelete);
      setTimeout(async () => { 
        try {
          const response = await fetch(
            `http://localhost:5000/api/tasks/${taskToDelete}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) throw new Error("Failed to delete task");
  
          const updatedTasks = tasks.filter((task) => task._id !== taskToDelete);
          setTasks(updatedTasks);
          setFilteredTasks(
            updatedTasks.filter((task) => task.status !== "Completed")
          );
  
          // Display success toast
          SuccessToast("Task Deleted Successfully");
        } catch (error) {
          console.error("Error deleting task:", error);
        } finally {
          closeModal();
          setDeletingTaskId(null); 
        }
      }, 500);
    }
  }, [taskToDelete, tasks]);
  
  

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  const handleEditClick = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  const completedTasksCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const ongoingTasksCount = tasks.filter(
    (task) => task.status === "Ongoing"
  ).length;
  const totalTasksCount = tasks.length;

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner />
        <p>Loading tasks, please wait...</p>
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
    <>
    <div className="home-page">
    <ToastContainer
      />
      <LeftSideBar/>

      <div className="content">
        <div className="navbar">
        <div className="search-bar">
    <form onSubmit={handleSearchSubmit} className="search-form">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        <FaSearch className="search-icon" />
      </button>
    </form>
  </div>
          <div className="navbar-right">
            <NavLink to="/createTask" className="create-task-button">
              <FaPlus className="plus-icon" />
              <span>Create a New Task</span>
            </NavLink>
            {/* <IoIosNotificationsOutline className="notification-icon" /> */}
          </div>
        </div>

        <div className="main-content">
          <div className="cards-content">
            <div className="filter-container">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-button ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="tasks-container" ref={containerRef}>
             
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <div
                    key={task._id}
                    id={task._id}
                    className={`task-card ${
                      highlightedTaskId === task._id ? "highlight" : ""
                    } ${deletingTaskId === task._id ? "deleting" : ""}`}
                    style={{
                      backgroundColor:
                        categoryColors[task.category] || "#ffffff",
                    }}
                  >
                    <FaEllipsisH
                      className="task-menu-icon"
                      onClick={() => handleShowCompleteButton(task._id)}
                    />
                    <button
                      className="complete-button"
                      style={{
                        display: showCompleteButton[task._id]
                          ? "block"
                          : "none",
                      }}
                      onClick={() => handleCompleteClick(task._id)}
                    >
                      Task Completed
                    </button>
                    <FaTrashAlt
                      className="task-delete-icon"
                      onClick={() => openModal(task._id)}
                    />
                    <FaEdit
                      className="task-edit-icon"
                      onClick={() => handleEditClick(task._id)}
                    />
                    <h2 className="task-name">{task.taskName}</h2>
                    <button
                      className="task-category"
                      style={{
                        backgroundColor:
                          buttonColors[task.category] || "#ffffff",
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
                ))
              ) : (
                <p>No tasks available</p>
              )}
              {!atBottom && (
                <button
                className={`scroll-down-button ${atBottom ? "hidden" : ""}`}
                  onClick={handleScrollDown}
                >
                  <FaArrowDown />
                </button>
              )}
            </div>
          </div>
          <div className="right-side-bar">
          <RightSideBar
            completedTasksCount={completedTasksCount}
            ongoingTasksCount={ongoingTasksCount}
            totalTasksCount={totalTasksCount}
          />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={confirmDelete}
          onClose={closeModal}
          message="Are you sure you want to delete this task?"
        />
      )}
      
    </div>
    <Footer/>
    </>
  );
}

export default Home;
