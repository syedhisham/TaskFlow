import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaSignOutAlt,FaPlus } from 'react-icons/fa';
import { FaCalendarCheck } from "react-icons/fa6";
import { SiGoogletasks } from 'react-icons/si';
import '../styles/leftSideBar.css';
import Logo from '../assets/Logo.png'

const LeftSideBar = () => {
  return (
    <div className="sidebar">
      <NavLink to={'/home'} className="logo">
      <img src={Logo} alt="" />
      </NavLink>
      <div className="menu-icons">
        {[
          { to: "/home", icon: <FaHome /> },
          { to: "/user", icon: <FaUser /> },
          { to: "/createTask", icon: <FaPlus /> },
          { to: "/completed-tasks", icon: <SiGoogletasks /> },
          { to: "/calendar", icon: <FaCalendarCheck /> },
          { to: "/settings", icon: <FaCog /> },
        ].map(({ to, icon }, index) => (
          <NavLink
            key={index}
            to={to}
            className={({ isActive }) => `icon ${isActive ? 'active-icon' : ''}`}
          >
            {icon}
          </NavLink>
        ))}
      </div>
      <div className="logout-icon">
        <NavLink
          to="/logout"
          className={({ isActive }) => `icon ${isActive ? 'active-icon' : ''}`}
        >
          <FaSignOutAlt />
        </NavLink>
      </div>
    </div>
  );
};

export default LeftSideBar;
