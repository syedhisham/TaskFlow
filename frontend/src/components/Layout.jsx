import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="layout">
      <div className="main-content">
        <LeftSideBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
