const CANVAS_SIZE = [window.innerWidth, window.innerHeight];
const SNAKE_START = [
  [8, 7],
  [7, 7]
];
const APPLE_START = [8, 3];
const SCALE = 30;
const SPEED = 100;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

// New ==============================
const VELOCITY = 0.25
const SIZE = 50
// [x, y]
const SNAKE = [
  [Math.round(window.innerWidth / 2), Math.round(window.innerHeight / 2)],
  [Math.round(window.innerWidth / 2) - SIZE - 1, Math.round(window.innerHeight / 2)],
];

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,

  VELOCITY,
  SNAKE,
  SIZE
};