import SnakeGame from './SnakeGame'
import { useState, useEffect, useRef } from 'react'

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
  }

  return (
    <div>
      <span style={{ position: 'fixed', zIndex: 999, top: 0, backgroundColor: "white" }}>{score}</span>
      <SnakeGame mapImporterName={maps[mapIndex]} nextMap={() => setMapIndex(mapIndex + 1)} addScore={() => setScore(prev => prev + 1)} />
    </div>
  );
}

export default GameInterface;