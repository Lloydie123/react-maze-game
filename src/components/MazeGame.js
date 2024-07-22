import React, { useState, useEffect } from 'react';
import './App.css';
// Create a meta element
const viewportMeta = document.createElement('meta');

// Set attributes for the viewport meta tag
viewportMeta.name = 'viewport';
viewportMeta.content = 'width=device-width, initial-scale=1.0';

// Get the head element and append the meta tag to it
const head = document.head || document.getElementsByTagName('head')[0];
head.appendChild(viewportMeta);


const levels = [
   {
    rows: 8,
    cols: 8,
    walls: [
      [2, 0], [1, 2], [0, 2], [0, 1],
      [1, 4], [0, 6], [3, 1], [3, 2], [4, 3],
      [4, 5], [5, 5], [4, 6], [5, 7],
      [5, 1], [7, 2], [6, 2], [6, 4], [7, 2], [7, 6],
      [2, 5], [2, 6],
      [2, 5], [2, 6],
      [2, 7],
    ]
  },   // Level 1 (with a wall at (1, 1))

  {
    rows: 16,
    cols: 16,
    walls: [
      [1, 1], [2, 1], [12, 10],
      [1, 2], [2, 1], [5, 2], [6, 3], [12, 10],
      [1, 3], [2, 1], [12, 10], [3, 3],
      [3, 4], [4, 4], [7, 4],
      [0, 5], [1, 5], [1, 5], [2, 5], [3, 5], [5, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [6, 6], [11, 6], [12, 6], [13, 6],
      [7, 7], [8, 7], [9, 7], [14, 7],
      [11, 8], [12, 8], [14, 8], [1, 9],
      [9, 9], [12, 9], [1, 10], [11, 9], [3, 11], [4, 11], [5, 11], [6, 11], [14, 9],
      [8, 10], [9, 10], [14, 10],
      [12, 11], [14, 11], [11, 11],
      [12, 12], [13, 12], [14, 12], [9, 13], [9, 11], [4, 13], [3, 13], [2, 8], [1, 11], [1, 12],
      [15, 14], [13, 14], [14, 14],
      [2, 13], [4, 14], [6, 12], [8, 14], [10, 13], [12, 14], [14, 12], [16, 14],
      [1, 11], [3, 10], [5, 9], [7, 8], [9, 7], [11, 6], [13, 5], [15, 4],
      [1, 8], [3, 7], [5, 6], [7, 5], [9, 4], [11, 3], [13, 2], [15, 1],
      [1, 5], [3, 4], [5, 14], [7, 14], [6, 14], [5, 3], [7, 2], [9, 1], [10, 14], [10, 14], [11, 14], [13, 1], [15, 1],
      [0, 15], [0, 14], [1, 15], [2, 15],
    ]
  }, // Level 2 (example walls)
  {
    rows: 32,
    cols: 32,
    walls: [
      [1, 1], [2, 1], [12, 10],
      [1, 2], [2, 1], [5, 2], [6, 3], [12, 10],
      [1, 3], [2, 1], [12, 10], [3, 3],
      [3, 4], [4, 4], [7, 4],
      [0, 5], [1, 5], [2, 5], [3, 5], [5, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [6, 6], [11, 6], [12, 6], [13, 6],
      [7, 7], [8, 7], [9, 7], [14, 7],
      [11, 8], [12, 8], [14, 8],
      [9, 9], [12, 9], [14, 9],
      [8, 10], [9, 10], [14, 10],
      [12, 11], [14, 11], [11, 11],
      [12, 12], [13, 12], [14, 12],
      [15, 14],
      [2, 2], [4, 3], [10, 4], [6, 5], [13, 5], [4, 8], [7, 9], [10, 11], [5, 13], [9, 14],
      [15, 15], [16, 15], [17, 15], [20, 15], [23, 15], [26, 15], [29, 15], [30, 15], [31, 15],
      [18, 16], [19, 16], [22, 16], [27, 16], [28, 16], [31, 16],
      [21, 17], [24, 17], [25, 17], [28, 17], [30, 17],
      [19, 18], [20, 18], [25, 18], [26, 18], [27, 18],
      [20, 19], [21, 19], [22, 19], [25, 19], [29, 19],
      [17, 20], [18, 20], [23, 20], [25, 20],
      [20, 21], [21, 21], [26, 21], [28, 21],
      [17, 22], [22, 22], [25, 22], [29, 22],
      [18, 23], [19, 23], [23, 23], [26, 23], [30, 23],
      [17, 24], [20, 24], [21, 24], [24, 24], [29, 24],
      [18, 25], [22, 25], [27, 25], [30, 25],
      [17, 26], [19, 26], [21, 26], [26, 26], [28, 26],
      [23, 27], [24, 27], [25, 27], [28, 27],
      [17, 28], [20, 28], [21, 28], [22, 28], [27, 28], [30, 28],
      [18, 29], [23, 29], [25, 29], [26, 29],
      [17, 30], [19, 30], [21, 30], [24, 30], [28, 30],
      [29, 1], [27, 3], [25, 1], [23, 2], [21, 1],
      [19, 2], [17, 1], [15, 2], [13, 1], [11, 2],
      [9, 1], [7, 3], [5, 1], [3, 2], [1, 1],
      [31, 3], [26, 2], [24, 4], [22, 3],
      [20, 2], [18, 4], [16, 3], [14, 2], [12, 4],
      [10, 3], [8, 4], [6, 2], [4, 4], [2, 3],
      [30, 2], [29, 3], [27, 5], [26, 6],
      [25, 7], [24, 8], [23, 9], [22, 10], [21, 11],
      [20, 12], [19, 13], [18, 14], [17, 15], [16, 16],
      [0, 29], [3, 28], [5, 30], [7, 29], [9, 30],
      [11, 29], [13, 30], [15, 29], [17, 30], [19, 29],
      [21, 30], [23, 29], [25, 30], [27, 29], [29, 30], [14, 28], [12, 28], [10, 28], [9, 28], [9, 27], [10, 27],
      [10, 26], [12, 27], [14, 27], [15, 28], [13, 25], [13, 24], [14, 24], [13, 24],
      [1, 27], [4, 26], [6, 25], [8, 24], [10, 23],
      [29, 4], [30, 4], [30, 5], [30, 6], [30, 7], [30, 8], [29, 8], [28, 8], [28, 9], [28, 10], [29, 10], [26, 10],
      [27, 11], [28, 12], [29, 13], [30, 13], [31, 13],
      // Additional random coordinates at the bottom-left
      [14, 29],
      [2, 30], [4, 31], [6, 29], [8, 31], [10, 30], [12, 31], [14, 30], [18, 30],
      [22, 30], [26, 29], [30, 30],
      [1, 28], [3, 27], [5, 26], [7, 25], [9, 24], [11, 23], [13, 22], [15, 21], [17, 20], [19, 19],
      // Additional random coordinates on the left side
      [1, 25], [3, 24], [5, 23], [7, 22], [9, 21], [11, 20], [13, 19], [15, 18], [17, 17], [19, 16],
      [1, 22], [3, 21], [5, 20], [7, 19], [9, 18], [11, 17], [13, 16], [15, 15], [17, 14], [19, 13],
      [1, 19], [3, 18], [5, 17], [7, 16], [9, 15], [11, 14], [13, 13], [15, 12], [17, 11], [19, 10],
      [1, 16], [3, 15], [5, 14], [7, 13], [9, 12], [11, 11], [13, 10], [15, 9], [17, 8], [19, 7],
      [1, 13], [3, 12], [5, 11], [7, 10], [9, 9], [11, 8], [13, 7], [15, 6], [17, 5], [19, 4],
      // Additional random coordinates at the top-right
      [30, 2], [28, 1], [26, 3], [24, 1], [22, 2], [20, 1], [18, 2], [16, 1], [14, 2], [12, 1],
      [10, 2], [8, 1], [6, 3], [4, 1], [2, 2], [31, 29],
      [1, 27], [4, 26], [6, 25], [8, 24], [10, 23],
      [0, 29], [3, 28], [5, 30], [7, 29], [9, 30],
      [11, 29], [13, 30], [15, 29], [17, 30], [19, 29],
      [21, 30], [23, 29], [25, 30], [27, 29], [29, 30],
      [1, 27], [4, 26], [6, 25], [8, 24], [10, 23],
      [12, 22], [14, 21], [16, 20], [18, 19], [20, 18],
      [2, 24], [5, 23], [7, 22], [9, 21], [11, 20],
      [13, 19], [15, 18], [17, 17], [19, 16], [21, 15],
      [3, 21], [6, 20], [8, 19], [10, 18], [12, 17],
      [14, 16], [16, 15], [18, 14], [20, 13], [22, 12],
      [4, 18], [7, 17], [9, 16], [11, 15], [13, 14],
      [15, 13], [17, 12], [19, 11], [21, 10], [23, 9],
      [5, 15], [8, 14], [10, 13], [12, 12], [14, 11],
      [16, 10], [18, 9], [20, 8], [22, 7], [24, 6],
      [6, 12], [9, 11], [11, 10], [13, 9], [15, 8],
      [17, 7], [19, 6], [21, 5], [23, 4], [25, 3],
      [7, 9], [10, 8], [12, 7], [14, 6], [16, 5],
      [18, 4], [20, 3], [22, 2], [24, 1], [26, 2],
      [8, 6], [11, 5], [13, 4], [15, 3], [17, 2],
      [19, 1], [21, 2], [23, 3], [25, 4], [27, 5],
      // ... (Add more unique random coordinates as needed)
    ]
  }, // Level 3 (example walls)
];
const styles = {
  mazeRow: {
    display: 'flex',
  },
  mazeCell: {
    flex: 1,

  },

  // New style for smaller maze cells
  smallerMazeCell: {
    flex: 1,
    maxWidth: '15px',
    maxHeight: '20px',
    display: 'inline-block',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },

  GameOverContainer: {
    margin: 'auto',
    width: '50%',
    padding: '10px',
    alignItems:'center',
    color: 'white',
  },
  aboutUsContainer: {
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
    
    color: 'white',
  },
  instructionText: {
    fontSize: '1.2em',
    marginBottom: '20px',
    color: 'white',
  },
  backButton: {
    fontSize: '1em',
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    marginTop: '50px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    font: 'Chiller',
  },



};

const Maze = ({ onLevelChange }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [goal, setGoal] = useState({ x: 0, y: 0 });
  const [isGameWon, setIsGameWon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
 
    // Check if the device is a mobile device
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    // Set initial goal position
    setGoal({ x: levels[currentLevel].cols - 1, y: levels[currentLevel].rows - 1 });
    // eslint-disable-next-line
    const handleKeyDown = (e) => {
      if (isGameWon || isMobile) return; // Game is won or mobile device, no need to handle key events

      switch (e.key) {
        case 'ArrowUp':
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
          movePlayer(1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    movePlayer(); // Include movePlayer here
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };


    
  }, [position, goal, isGameWon, isMobile, currentLevel, movePlayer]);

  const movePlayer = (dx, dy) => {
    const newPosition = { x: position.x + dx, y: position.y + dy };
  
    if (
      newPosition.x >= 0 &&
      newPosition.x < levels[currentLevel].cols &&
      newPosition.y >= 0 &&
      newPosition.y < levels[currentLevel].rows &&
      !isWall(newPosition.x, newPosition.y)
    ) {
      setPosition(newPosition);

      if (newPosition.x === goal.x && newPosition.y === goal.y) {
        setIsGameWon(true);

        if (currentLevel < levels.length - 1) {
          setCurrentLevel((prevLevel) => {
            const nextLevel = prevLevel + 1;
            setGoal({ x: levels[nextLevel].cols - 1, y: levels[nextLevel].rows - 1 });
            setPosition({ x: 0, y: 0 });
            setIsGameWon(false);
            onLevelChange(nextLevel);
          
            if (nextLevel < levels.length) {
             
              return nextLevel;
            } else {
              alert('Congratulations! You completed all levels!');
              return prevLevel;
            }
          });
          
        } else {
          alert('Congratulations! You completed all levels!');
          setIsGameOver(true);
          // Hide the maze screen, just display a game over screen
          // Redirect to a game over screen 
        }
      }
    }
  };

  const isWall = (x, y) => {
    return (
      levels[currentLevel].walls &&
      levels[currentLevel].walls.some(([wallX, wallY]) => wallX === x && wallY === y)
    );
  };

  const handleButtonClick = (direction) => {
    if (isGameWon) return;

    switch (direction) {
      case 'up':
        movePlayer(0, -1);
        break;
      case 'down':
        movePlayer(0, 1);
        break;
      case 'left':
        movePlayer(-1, 0);
        break;
      case 'right':
        movePlayer(1, 0);
        break;
      default:
        break;
    }
  };

  const renderMaze = () => {
    if (isGameOver) {
      return <div style={styles.GameOverContainer}>
        <center>
        <h2 style={styles.title}>Game Over!</h2>
        <p> Congratulations! The relentless zombie has triumphed in its insatiable quest to reach its victim. With cunning and determination, it navigated through the maze, overcoming obstacles and devouring challenges. The taste of victory is sweet, and the zombie's plan to feast on its victim has been successfully realized. </p>
        <button style={styles.backButton}  onClick={() => window.location.reload()}>Return to Title</button>
        </center>
        </div>;


      
    }
    const mazeRows = Array.from({ length: levels[currentLevel].rows }, (_, rowIndex) => (
      <div className="maze-row" key={rowIndex}>
        {Array.from({ length: levels[currentLevel].cols }, (_, colIndex) => {
          const cellStyle = currentLevel === 2 ? styles.smallerMazeCell : styles.mazeCell;
          const cellClass = isWall(colIndex, rowIndex)
            ? 'wall'
            : position.x === colIndex && position.y === rowIndex
            ? 'player'
            : goal.x === colIndex && goal.y === rowIndex
            ? 'goal'
            : '';
  
          return (
            <div key={colIndex} className={`maze-cell ${cellClass}`} style={cellStyle}></div>
          );
        })}
      </div>
    ));
  
    return mazeRows;
  };

  const renderControls = () => {
    if (isMobile) {
      return (
        <div className="mobile-controls">
          <div className="control-row">
            <button onClick={() => handleButtonClick('up')}>↑</button>
          </div>
          <div className="control-row">
            <button onClick={() => handleButtonClick('left')}>←</button>
            <button onClick={() => handleButtonClick('down')}>↓</button>
            <button onClick={() => handleButtonClick('right')}>→</button>
          </div>
        </div>
      );
    }
  
    return null;
  };
  
  return (
    <div className="maze-container">
      <div className="maze">{renderMaze()}</div>

      {renderControls()}
    </div>
  );
};
function App() {
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleLevelChange = (newLevel) => {
    if (newLevel <= levels.length) {
      setCurrentLevel(newLevel + 1);
    } else {
      setIsGameCompleted(true);
      setIsGameOver(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentLevel(1);
    setIsGameCompleted(false);
    setIsGameOver(false);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isGameCompleted ? (
          <div>
            <h1>Congratulations!</h1>
            <p>You completed all levels!</p>
            <button onClick={handleRestartGame}>Restart Game</button>
          </div>
        ) : isGameOver ? (
          <div>
            <h1>Game Over</h1>
            <p>You reached the end of the game.</p>
            <button onClick={handleRestartGame}>Restart Game</button>
          </div>
        ) : (
          <>
            <center><h1> Zombie Maze Game - Level {currentLevel}</h1></center>
            {currentLevel <= levels.length ? (
              <Maze onLevelChange={handleLevelChange} onGameOver={handleGameOver} />
            ) : (
              <div>
                <h1>Congratulations!</h1>
                <p>You successfully completed all levels!</p>
                <button onClick={handleRestartGame}>Restart Game</button>
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}



export default App;
