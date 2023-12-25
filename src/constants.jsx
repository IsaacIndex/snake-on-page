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

// New
const VELOCITY = 0.025
// [x, y]
const SNAKE_BODY = [
  [window.innerWidth / 2, window.innerHeight / 2],
];
const SIZE = 10

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,

  VELOCITY,
  SNAKE_BODY,
  SIZE
};