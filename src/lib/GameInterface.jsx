import SnakeGame from './SnakeGame'
import { useState, useEffect } from 'react'
import "./GameInterface.css"

// import MyImage from "/mountain.png"

const GameInterface = () => {
  const [mapIndex, setMapIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [animateScore, setAnimateScore] = useState(false)
  const maps = {
    0: "forest_map",
    1: "desert_map",
  }


  const addScore = () => {
    setScore(prev => prev + 1)
    setAnimateScore(true)
  }

  useEffect(() => {
    if (!animateScore) return
    const timeout = setTimeout(() => setAnimateScore(false), 300)
    return () => clearTimeout(timeout)
  }, [animateScore])

  return (
    <div className='game-interface'>
      <div className={`score-board${animateScore ? ' animate' : ''}`}>Score: {score}</div>
      <SnakeGame
        mapImporterName={maps[mapIndex]}
        nextMap={() => setMapIndex(mapIndex + 1)}
        addScore={addScore}
      />
    </div>
  );
}

export default GameInterface;