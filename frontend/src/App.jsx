import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WelcomePage from "./pages/WelcomePage";
import CreateTask from "./components/CreateTask";
import CompletedTasks from "./pages/CompletedTasks";
import EditTask from "./pages/EditTask";
import Layout from "./components/Layout"; // Import the Layout component
import Footer from "./components/Footer";
import HomePageContent from "./components/HomePageContent";
import CalendarComponent from "./components/CalendarComponent";
import RegisterForm from "./pages/RegisterForm";

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Routes that don't use the Layout component */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/footer" element={<Footer />} />

        {/* Routes that use the Layout component */}
        <Route element={<Layout />}>
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path="/completed-tasks" element={<CompletedTasks />} />
          <Route path="/home-page-content" element={<HomePageContent />} />
          <Route path="/calendar" element={<CalendarComponent />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
