import SnakeGame from './SnakeGame'
import { useState } from 'react'
import "./GameInterface.css"

// import MyImage from "/mountain.png"

const GameInterface = () => {
  const [mapIndex, setMapIndex] = useState(0)
  const [score, setScore] = useState(0)
  console.log(score)
  const maps = {
    0: "forest_map",
    1: "desert_map",
  }

  const basePath = window.location.pathname.split("/")[1]
  const baseURL = (basePath) ? ("/" + basePath + "/") : ("")

  const addScore = () => {
    console.log(score)
    setScore(prevScore => prevScore + 1)
    console.log(score)

  }

  return (
    <div className='game-interface'>
      <div className='score-board'>Score: {score}</div>
      {/* <img src={`${(baseURL)}mountain.jpg`} alt="My Image" /> */}
      <SnakeGame
        mapImporterName={maps[mapIndex]}
        nextMap={() => setMapIndex(mapIndex + 1)}
        addScore={() => setScore(prev => prev + 1)}
      />
    </div>
  );
}

export default GameInterface;