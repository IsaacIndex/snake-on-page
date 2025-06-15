import SnakeGame from './SnakeGame'
import LoadingScreen from '../LoadingScreen'
import { useState, useEffect } from 'react'
import "./GameInterface.css"

// import MyImage from "/mountain.png"

const GameInterface = () => {
  const [mapIndex, setMapIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({ loaded: 0, total: 0, item: '' })
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

    const items = []
    mapList.forEach(name => {
      types.forEach(type => {
        items.push({ name, type })
      })
    })

    const totalImages = items.length
    setStatus({ loaded: 0, total: totalImages, item: '' })

    const loadNext = (index) => {
      if (index >= items.length) {
        setLoading(false)
        return
      }
      const { name, type } = items[index]
      const suffix = type === 'normal' ? '' : `_${type}`
      const img = new Image()
      img.src = `${baseURL}maps/${name}/map${suffix}.png`
      setStatus({ loaded: index, total: totalImages, item: `${name}${suffix}` })
      img.onload = img.onerror = () => {
        loadNext(index + 1)
      }
    }

    loadNext(0)
  }, [baseURL, maps])


  return (
    <>
      {loading && (
        <LoadingScreen item={status.item} loaded={status.loaded} total={status.total} />
      )}
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
