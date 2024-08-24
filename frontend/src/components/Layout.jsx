import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSideBar from '../components/LeftSideBar'; // Import the LeftSideBar component
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="layout">
      <div className="main-content">
        <LeftSideBar /> {/* Render the LeftSideBar component */}
        <div className="content">
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
