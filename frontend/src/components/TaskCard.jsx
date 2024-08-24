import React from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaEllipsisH,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";
import "../styles/home.css";

function TaskCard({
  tasks,
  category,
  buttonColors,
  filteredTasks,
  selectedCategory,
  highlightedTaskId,
  categoryColors,
  handleFilterChange,
  handleScrollUp,
  handleScrollDown,
  atTop,
  atBottom,
  containerRef,
  handleShowCompleteButton,
  showCompleteButton,
  handleCompleteClick,
  openModal,
  handleEditClick,
}) {
  return (
    <div className="main-content">
      <div className="cards-content">
        <div className="filter-container">
          {Object.keys(categoryColors).map((cat) => (
            <button
              key={cat}
              className={`filter-button ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => handleFilterChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="tasks-container" ref={containerRef}>
          {!atTop && (
            <button className="scroll-up-button" onClick={handleScrollUp}>
              <FaArrowUp />
            </button>
          )}
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                id={task._id}
                className={`task-card ${
                  highlightedTaskId === task._id ? "highlight" : ""
                }`}
                style={{
                  backgroundColor: categoryColors[task.category] || "#ffffff",
                }}
              >
                <FaEllipsisH
                  className="task-menu-icon"
                  onClick={() => handleShowCompleteButton(task._id)}
                />
                <button
                  className="complete-button"
                  style={{
                    display: showCompleteButton[task._id] ? "block" : "none",
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
                    backgroundColor: buttonColors[task.category] || "#ffffff",
                    color: "#fff",
                  }}
                >
                  {task.category}
                </button>
                <p className="task-date-time">
                  {new Date(task.date).toLocaleDateString()} | {task.startTime}{" "}
                  - {task.endTime}
                </p>
                <p className="task-description">{task.description}</p>
              </div>
            ))
          ) : (
            <p>No tasks available</p>
          )}
          {!atBottom && (
            <button className="scroll-down-button" onClick={handleScrollDown}>
              <FaArrowDown />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
