import { useRef, useEffect } from "react";
import {
  SNAKE_BODY,
  VELOCITY,
  SIZE
} from "./constants";

const Snake = () => {
  const boardRef = useRef();
  const timeRef = useRef(null);
  const snakeBodyRef = useRef();

  const moveSnake = (delta, count) => {
    // console.log(delta)
    const canvas = boardRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = 'grey'
    const d = count % 800
    context.fillRect(10 + count, 10, 100, 100)
  }
  // const update = (time) => {
  //   if (timeRef.current != null) {
  //     moveSnake(time - timeRef.current)
  //   }
  //   timeRef.current = time;
  //   requestAnimationFrame(update)
  // }


  useEffect(() => {

    let count = 0
    let animationId

    const renderer = (time) => {
      if (timeRef.current != null) {
        count++
        moveSnake(time - timeRef.current, count)
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