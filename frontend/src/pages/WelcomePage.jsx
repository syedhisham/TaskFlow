import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcomePage.css'; 
import WelcomPageImage from '../assets/TodoAppImg1.png';
import HomePageContent from '../components/HomePageContent';

function WelcomePage() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStartClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/home');
    }, 500); 
  };

  return (
    <>
    <div className={`welcome-page ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="background-container">
        <div className="background-gradient">
          <img 
            src={WelcomPageImage} 
            alt="Welcome"
            className="welcome-image" 
          />
        </div>
        <div className="welcome-content">
          <h1>Welcome to TaskFlow!</h1>
          <p>Simplify Your Tasks</p>
          <p>Easily manage and organize your to-dos with TaskFlow. Start now and experience seamless task management!</p>
          <button onClick={handleStartClick} className="start-button">Let's Start</button>
        </div>
      </div>
    </div>
      <HomePageContent/>
    </>
  );
}

export default WelcomePage;
