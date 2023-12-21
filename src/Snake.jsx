import { useRef, useEffect } from "react";

const Snake = () => {
  const boardRef = useRef();
  const timeRef = useRef(null);


  const update = (time) => {
    if (timeRef.current != null) {
      moveSnake(time - timeRef.current)
    }
    timeRef.current = time;
    requestAnimationFrame(update)
  }

  useEffect(() => {
    requestAnimationFrame(update)
  }, [])

  return (
    <canvas id="board" ref={boardRef} />
  )
}
export default Snake;