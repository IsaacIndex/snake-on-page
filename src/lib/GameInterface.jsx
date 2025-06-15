import SnakeGame from './SnakeGame'
import LoadingScreen from '../LoadingScreen'
import { useState, useEffect } from 'react'
import "./GameInterface.css"

// import MyImage from "/mountain.png"

const GameInterface = () => {
  const [mapIndex, setMapIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  console.log(score)
  const maps = {
    0: "forest_map",
    1: "desert_map",
  }

  const basePath = window.location.pathname.split("/")[1]
  const baseURL = (basePath) ? ("/" + basePath + "/") : ("")

  useEffect(() => {
    const mapList = Object.values(maps)
    const types = [
      'normal',
      'achromatopsia',
      'deuteranopia',
      'protanopia',
      'tritanopia',
    ]

    const totalImages = mapList.length * types.length
    let loadedCount = 0

    mapList.forEach(name => {
      types.forEach(type => {
        const img = new Image()
        const suffix = type === 'normal' ? '' : `_${type}`
        img.src = `${baseURL}maps/${name}/map${suffix}.png`
        img.onload = img.onerror = () => {
          loadedCount += 1
          if (loadedCount === totalImages) {
            setLoading(false)
          }
        }
      })
    })
  }, [baseURL])

  const addScore = () => {
    console.log(score)
    setScore(prevScore => prevScore + 1)
    console.log(score)

  }

  return (
    <>
      {loading && <LoadingScreen />}
      <div className='game-interface'>
        <div className='score-board'>Score: {score}</div>
        {/* <img src={`${(baseURL)}mountain.jpg`} alt="My Image" /> */}
        <SnakeGame
          mapImporterName={maps[mapIndex]}
          nextMap={() => setMapIndex(mapIndex + 1)}
          addScore={() => setScore(prev => prev + 1)}
        />
      </div>
    </>
  );
}

export default GameInterface;
