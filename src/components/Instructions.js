import React from 'react';


const Instructions = ({ onBack }) => {
  return (
    <div style={styles.instructionsContainer}>
      <h1>Instructions</h1>
      <p>This is where you provide instructions for the maze game.</p>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

const styles = {
  instructionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    padding: '20px',
  },
};

export default Instructions;
