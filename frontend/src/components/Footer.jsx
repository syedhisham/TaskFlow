import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/footer.css";

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation happens only once
    threshold: 0.2, // 20% of the section needs to be visible
  });

  return (
    <footer className="footer">
      <motion.div
        className="footer-content"
        ref={ref}
        initial={{ opacity: 0, y: 50, boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 50,
          boxShadow: inView
            ? "0 4px 10px rgba(0, 0, 0, 0.2)"
            : "0 0 0 rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-logo">
          <h1>Task Flow</h1>
          <p>Streamline Your Workflow</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/createTask">Create Task</a>
            </li>
            <li>
              <a href="/completed-tasks">Completed Tasks</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </motion.div>
      <div className="footer-bottom">
        <p>&copy; 2024 Task Flow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
