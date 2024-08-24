
import React from "react";
import { NavLink } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import CircularProgressBar from "./CircularProgressBar";
import '../styles/rightSideBar.css';

const RightSideBar = ({ completedTasksCount, ongoingTasksCount, totalTasksCount }) => {
  return (
    <div className="right-sidebar">
      <div className="blue-container">
        <h3
          style={{
            display: "inline-flex",
            alignItems: "center",
            margin: 0,
          }}
        >
          Completed Tasks
          <FaCheckCircle style={{ color: "#fff", marginLeft: "8px" }} />
        </h3>
        <CircularProgressBar
          completed={completedTasksCount}
          total={totalTasksCount}
        />
      </div>
      <div className="task-stats-container">
        <div className="task-stat">
          <h4>Total</h4>
          <p>{totalTasksCount}</p>
        </div>
        <NavLink to="/completed-tasks" className="task-stat">
          <h4>Completed</h4>
          <p>{completedTasksCount}</p>
        </NavLink>
        <div className="task-stat">
          <h4>In Progress</h4>
          <p>{ongoingTasksCount}</p>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
