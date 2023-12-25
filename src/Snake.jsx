import { useRef, useEffect } from "react";
import {
  SNAKE,
  VELOCITY,
  SIZE
} from "./constants";

const Snake = () => {
  const boardRef = useRef();
  const timeRef = useRef(null);
  const snakeRef = useRef(SNAKE);
  const directionRef = useRef("left");


  const moveSnake = (delta, count) => {
    console.log(snakeRef.current)
    snakeRef.current.forEach(s => {
      switch (directionRef.current) {
        case "left":
          s[0] -= Math.round(VELOCITY * delta)
          break;
        case "right":
          s[0] += Math.round(VELOCITY * delta)
          break;
        case "up":
          s[1] -= Math.round(VELOCITY * delta)
          break;
        case "down":
          s[1] += Math.round(VELOCITY * delta)
          break;
      }
    })
  }

  useEffect(() => {

    let animationId

    const renderer = time => {
      if (timeRef.current != null) {
        // changes
        moveSnake(time - timeRef.current)

        // render
        const canvas = boardRef.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillStyle = "lightblue";
        snakeRef.current.forEach(s => context.fillRect(s[0], s[1], SIZE, SIZE))
      }
      timeRef.current = time;
      animationId = window.requestAnimationFrame(renderer)
    }
    renderer()

    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [moveSnake])

  return (
    <canvas id="board" ref={boardRef} width={window.innerWidth} height={window.innerHeight} />
  )
}
export default Snake;