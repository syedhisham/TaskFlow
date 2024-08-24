import React, { useState, useEffect } from "react";
import "../styles/homePageContent.css";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HomePageContent = () => {
  const { ref: achievementsRef, inView: achievementsInView } = useInView({
    triggerOnce: true, // Animation happens only once
    threshold: 0.5, // 50% of the section needs to be visible
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="home-page-section">
      <div className="container">
        <motion.h1
          className="heading"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to TaskFlow
        </motion.h1>

        <div className="card-grid">
          <motion.div
            className="card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h2 className="card-title">Task Management</h2>
            <p className="card-content">
              Efficiently organize your tasks with TaskFlow’s intuitive task
              management system. Create, categorize, and prioritize tasks to
              stay on top of your responsibilities.
            </p>
          </motion.div>

          <motion.div
            className="card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h2 className="card-title">Deadline Reminders</h2>
            <p className="card-content">
              Never miss a deadline again. Set reminders for upcoming deadlines
              and receive timely notifications to ensure you stay on track.
            </p>
          </motion.div>

          <motion.div
            className="card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h2 className="card-title">Collaborative Lists</h2>
            <p className="card-content">
              Work seamlessly with others by sharing task lists. Assign tasks,
              track progress, and collaborate effectively with your team or
              family.
            </p>
          </motion.div>

          <motion.div
            className="card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h2 className="card-title">Progress Tracking</h2>
            <p className="card-content">
              Monitor your progress with visual indicators and detailed reports.
              Track completed tasks and overall productivity to stay motivated.
            </p>
          </motion.div>

          <motion.div
            className="card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h2 className="card-title">Customizable Interface</h2>
            <p className="card-content">
              Tailor your TaskFlow experience to fit your needs. Customize
              themes, layouts, and notifications to match your personal
              workflow.
            </p>
          </motion.div>

          <motion.div
            className="card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h2 className="card-title">Cross-Platform Sync</h2>
            <p className="card-content">
              Access your tasks from any device with TaskFlow’s cross-platform
              synchronization. Stay updated with real-time changes across all
              your devices.
            </p>
          </motion.div>
        </div>

        {/* New Testimonials Section */}
        <section className="testimonials-section">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <motion.div
              className="testimonial"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
            >
              <p className="testimonial-text">
                "TaskFlow has revolutionized the way we manage our projects. The
                interface is intuitive and the features are incredibly helpful."
              </p>
              <span className="testimonial-author">
                Jane Doe, Project Manager
              </span>
            </motion.div>

            <motion.div
              className="testimonial"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
            >
              <p className="testimonial-text">
                "With TaskFlow, staying organized has never been easier. The
                deadline reminders and collaborative features are a
                game-changer."
              </p>
              <span className="testimonial-author">
                John Smith, Freelance Developer
              </span>
            </motion.div>

            <motion.div
              className="testimonial"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
            >
              <p className="testimonial-text">
                "The customizable interface of TaskFlow allows me to tailor the
                app to my workflow. I couldn’t ask for a better task management
                tool."
              </p>
              <span className="testimonial-author">
                Emily Johnson, Entrepreneur
              </span>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="achievements-section" ref={achievementsRef}>
          <h2 className="section-title">Our Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement">
              <img
                src="path/to/your/graphic1.png"
                alt="Achievement 1"
                className="achievement-icon"
              />
              <h3 className="achievement-title">
                {achievementsInView && (
                  <CountUp end={100000} prefix="+" duration={2} />
                )}
                <span> Users</span>
              </h3>
              <p className="achievement-description">
                Join a thriving community of over 100,000 users who trust
                TaskFlow for their task management needs.
              </p>
            </div>

            <div className="achievement">
              <img
                src="path/to/your/graphic2.png"
                alt="Achievement 2"
                className="achievement-icon"
              />
              <h3 className="achievement-title">
                {achievementsInView && (
                  <CountUp end={1000000} prefix="+" duration={2} />
                )}
                <span> Tasks Completed</span>
              </h3>
              <p className="achievement-description">
                Celebrate the completion of over 1 million tasks managed
                efficiently through TaskFlow.
              </p>
            </div>

            <div className="achievement">
              <img
                src="path/to/your/graphic3.png"
                alt="Achievement 3"
                className="achievement-icon"
              />
              <h3 className="achievement-title">Top Rated on App Stores</h3>
              <p className="achievement-description">
                Recognized as one of the top task management apps on major app
                stores with stellar user ratings.
              </p>
            </div>
          </div>
        </section>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        )}
      </div>
    </section>
  );
};

export default HomePageContent;
