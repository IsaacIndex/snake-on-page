import SnakeGame from './SnakeGame'
import { useState } from 'react'

// import MyImage from "/mountain.png"

const GameInterface = () => {
  const [mapIndex, setMapIndex] = useState(0)
  const [score, setScore] = useState(0)
  console.log(score)
  const maps = {
    0: "forestImages",
    1: "desertImages",
  }

  const addScore = () => {
    console.log(score)
    setScore(prevScore => prevScore + 1)
    console.log(score)

    // console.log("public:", process.env.PUBLIC_URL)
    // console.log("origin:", window.location.origin)
  }

  return (
    <div>
      <span style={{ position: 'fixed', zIndex: 999, top: 0, backgroundColor: "white" }}>{score}</span>
      <img src="/mountain.jpg" alt="My Image" />
      {/* <SnakeGame mapImporterName={maps[mapIndex]} nextMap={() => setMapIndex(mapIndex + 1)} addScore={() => setScore(prev => prev + 1)} /> */}
    </div>
  );
}

export default GameInterface;