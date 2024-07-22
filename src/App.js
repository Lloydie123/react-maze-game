// App.js
import React, { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import MazeGame from './components/MazeGame';
import './App.css';
const App = () => {
  const [currentPage, setCurrentPage] = useState('title');
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleStartGame = () => {
    setCurrentPage('game');
  };

  const handleInstructions = () => {
    setCurrentPage('instructions');
  };

  const handleAboutUs = () => {
    setCurrentPage('aboutUs');
  };

  const handleLevelComplete = () => {
    if (currentLevel < 3) {
      setCurrentLevel((prev) => prev + 1);
    } else {
      // All levels complete, redirect to the title screen
      setCurrentLevel(1);
      setCurrentPage('title');
    }
  };
  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
 

    },
    instructionsContainer: {
      textAlign: 'center',
      marginTop: '300px',
      padding: '10px',
      Width: '50%',
      margin: 'auto',

 
    },
    aboutUsContainer: {
      textAlign: 'center',
      padding: '20px',
    },
    title: {
      fontSize: '2em',
      marginBottom: '20px',
      color: '#4caf50',
    },
    instructionText: {
      fontSize: '1.2em',
      marginBottom: '20px',
      color: 'white',
    },
    backButton: {
      fontSize: '1.5em',
      padding: '10px 20px',
      cursor: 'pointer',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    },

    // Media queries
  '@media (max-width: 600px)': {
    container: {
      backgroundColor: 'red',
    },
    text: {
      fontSize: '1.2em',
    },
  },
  '@media (min-width: 1200px)': {
    container: {
      backgroundColor: 'blue',
    },
    text: {
      fontSize: '1.8em',
    },
  },
  };

  const renderPage = () => {
    if (currentPage === 'title') {
      return (
        <TitleScreen
          onStartGame={handleStartGame}
          onInstructions={handleInstructions}
          onAboutUs={handleAboutUs}
        />
      );
    } else if (currentPage === 'instructions') {
      return (
        <div style={styles.instructionsContainer}>
   
          <h2 style={styles.title}>Instructions</h2>

          <div className='instruction_bg'>
            
          </div>
          <p style={styles.instructionText}>
          Welcome to the Zombie Maze Game! </p>   
          <p style={styles.instructionText}> PC/laptop users can use the arrow keys to move around.  </p>   <p style={styles.instructionText}> Mobile users can use the mobile floating control buttons on the screen.  </p>
          <p style={styles.instructionText}>
          Evade zombies, reach the exit, and survive! Good luck!
          </p>
                 
          <button style={styles.backButton} onClick={() => setCurrentPage('title')}>
            Back to Title
          </button>
        </div>
      );
    } else if (currentPage === 'aboutUs') {
      return (
        <div style={styles.aboutUsContainer}>
        <h2 style={styles.title}>About Us</h2>
        <p style={styles.instructionText}></p>
        <button style={styles.backButton} onClick={() => setCurrentPage('title')}>
          Back to Title
        </button>
      </div>
      );
    } else if (currentPage === 'game') {
      return <MazeGame onLevelComplete={handleLevelComplete} />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default App;
