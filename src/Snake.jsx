import { useRef, useEffect } from "react";
import {
  SNAKE,
  SIZE,
  FRAME
} from "./constants";

const Snake = () => {
  const boardRef = useRef();
  const timeRef = useRef(0);
  const snakeRef = useRef(SNAKE);
  const directionRef = useRef([1, 0]); // [x, y]


  const moveSnake = () => {
    // snakeRef.current.unshift(
    //   [snakeRef.current[0][0] + Math.round(directionRef.current[0] * VELOCITY * delta) * SIZE,
    //   snakeRef.current[0][1] + Math.round(directionRef.current[1] * VELOCITY * delta) * SIZE]
    // );
    snakeRef.current.unshift(
      [snakeRef.current[0][0] + directionRef.current[0] * SIZE,
      snakeRef.current[0][1] + directionRef.current[1] * SIZE]
    );

    // offset for centre
    console.log("before:", snakeRef.current)
    if (directionRef.current[1] = 1) {
      snakeRef.current.forEach(s => s[1] -= SIZE)
      // scrollBy(0, SIZE)
    } else if (directionRef.current[1] = -1) {
      snakeRef.current.forEach(s => s[1] += SIZE)
      // scrollBy(0, -SIZE)
    }
    console.log("after:", snakeRef.current)

    snakeRef.current.pop()
  }

  // Game Loop
  useEffect(() => {
    let animationId
    const renderer = time => {
      if (time - timeRef.current >= FRAME) {
        // changes
        moveSnake(time - timeRef.current)


        // start to draw the objects
        const canvas = boardRef.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillStyle = "lightblue";
        snakeRef.current.forEach(s => context.fillRect(s[0], s[1], SIZE, SIZE))

        timeRef.current = time;
      }
      animationId = window.requestAnimationFrame(renderer)
    }
    renderer()

    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [moveSnake])

  // Check key input
  useEffect(() => {
    const keyUpdate = e => {
      switch (e.key) {
        case "ArrowLeft":
          if (directionRef.current[0] != 1) directionRef.current[0] = -1
          directionRef.current[1] = 0
          break;
        case "ArrowRight":
          if (directionRef.current[0] != -1) directionRef.current[0] = 1
          directionRef.current[1] = 0
          break;
        case "ArrowUp":
          if (directionRef.current[1] != 1) directionRef.current[1] = -1
          directionRef.current[0] = 0
          break;
        case "ArrowDown":
          if (directionRef.current[1] != -1) directionRef.current[1] = 1
          directionRef.current[0] = 0
          break;
      }
      console.log(e.key, directionRef.current)
    }

    window.addEventListener("keydown", keyUpdate);
    return () => window.removeEventListener("keydown", keyUpdate);
  }, [])

  return (
    <canvas id="board" ref={boardRef} width={window.innerWidth} height={window.innerHeight} />
  )
}
export default Snake;