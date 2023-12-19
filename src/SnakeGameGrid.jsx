import React, { useState, useEffect } from 'react';
import './SnakeGameGrid.css';

const ROWS = 20;
const COLS = 20;
const INITIAL_SNAKE = [
  { row: 10, col: 10 },
  { row: 10, col: 9 },
  { row: 10, col: 8 },
];
const INITIAL_APPLE = { row: 15, col: 15 };
const MOVEMENTS_PER_SECOND = 5;

const SnakeGameGrid = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState('right');
  const [apple, setApple] = useState(INITIAL_APPLE);
  const [gameOver, setGameOver] = useState(false);
  const [lastMovementTime, setLastMovementTime] = useState(Date.now());

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { keyCode } = event;
      if (keyCode === 37 && direction !== 'right') {
        setDirection('left');
      } else if (keyCode === 38 && direction !== 'down') {
        setDirection('up');
      } else if (keyCode === 39 && direction !== 'left') {
        setDirection('right');
      } else if (keyCode === 40 && direction !== 'up') {
        setDirection('down');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    const gameLoop = () => {
      const currentTime = Date.now();
      const timeSinceLastMovement = currentTime - lastMovementTime;

      if (timeSinceLastMovement >= 1000 / MOVEMENTS_PER_SECOND) {
        moveSnake();
        setLastMovementTime(currentTime);
      }

      if (!gameOver) {
        requestAnimationFrame(gameLoop);
      }
    };

    requestAnimationFrame(gameLoop);
  }, [snake, lastMovementTime, gameOver]);

  const moveSnake = () => {
    if (gameOver) {
      return;
    }

    const head = { ...snake[0] };

    switch (direction) {
      case 'up':
        head.row--;
        break;
      case 'down':
        head.row++;
        break;
      case 'left':
        head.col--;
        break;
      case 'right':
        head.col++;
        break;
      default:
        break;
    }

    const newSnake = [head, ...snake.slice(0, -1)];
    setSnake(newSnake);

    if (isCollision(newSnake)) {
      setGameOver(true);
    }

    if (isEatingApple(head)) {
      setApple(generateRandomApplePosition(newSnake));
      setSnake([...newSnake, snake[snake.length - 1]]);
    }
  };

  const isCollision = (snake) => {
    const head = snake[0];
    return (
      head.row < 0 ||
      head.row >= ROWS ||
      head.col < 0 ||
      head.col >= COLS ||
      snake.slice(1).some((segment) => segment.row === head.row && segment.col === head.col)
    );
  };

  const isEatingApple = (head) => {
    return head.row === apple.row && head.col === apple.col;
  };

  const generateRandomApplePosition = (snake) => {
    let newApplePosition;
    do {
      newApplePosition = {
        row: Math.floor(Math.random() * ROWS),
        col: Math.floor(Math.random() * COLS),
      };
    } while (snake.some((segment) => segment.row === newApplePosition.row && segment.col === newApplePosition.col));

    return newApplePosition;
  };

  return (
    <div>
      <h1>Snake Game</h1>
      <div className="game-board">
        {Array.from({ length: ROWS }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: COLS }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${snake.some((segment) => segment.row === rowIndex && segment.col === colIndex) ? 'snake' : ''} ${apple.row === rowIndex && apple.col === colIndex ? 'apple' : ''
                  }`}
              />
            ))}
          </div>
        ))}
      </div>
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
};

export default SnakeGameGrid