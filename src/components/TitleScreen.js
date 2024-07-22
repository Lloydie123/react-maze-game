// TitleScreen.js
import React from 'react';

const TitleScreen = ({ onStartGame, onInstructions, onAboutUs }) => {
  return (
    <div style={styles.titleScreenContainer}>
      <h1 style={styles.title}>Zombie Maze Game</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.actionButton} onClick={onStartGame}>
          Start Game
        </button>
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.actionButton} onClick={onInstructions}>
          Instructions
        </button>
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.actionButton} onClick={onAboutUs}>
          About Us
        </button>
      </div>
    </div>
  );
};

const styles = {
  titleScreenContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Set to 100% of the viewport height for full-screen effect
    animation: 'fadeIn 1s ease-in-out', // Add fadeIn animation
  },
  title: {
    fontSize: '3em', // Increase font size
    marginBottom: '20px',
    animation: 'blinking 1.5s infinite', // Add blinking animation
    color: 'white',
    fontFamily: 'Zombie, cursive',
  },
  buttonContainer: {
    margin: '10px 0', // Increase margin for better spacing
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButton: {
    fontSize: '1.8em', // Increase font size
    padding: '15px 30px', // Increase padding for larger buttons
    cursor: 'pointer',
    backgroundColor: '#4caf50', // Green background color
    color: 'white',
    border: 'none',
    borderRadius: '8px', // Rounder corners
    transition: 'transform 0.3s ease, background-color 0.3s ease', // Add background-color transition
    fontFamily: 'Zombie, cursive',
  },
  // Define keyframes for fadeIn and blinking animations
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  '@keyframes blinking': {
    '50%': {
      opacity: 0,
    },
  },
};

export default TitleScreen;
