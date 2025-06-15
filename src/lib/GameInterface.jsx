import SnakeGame from './SnakeGame'
import LoadingScreen from '../LoadingScreen'
import { useState, useEffect, useMemo } from 'react'
import "./GameInterface.css"

// import MyImage from "/mountain.png"

const GameInterface = () => {
  const [mapIndex, setMapIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({ loaded: 0, total: 0, item: '' })
  const maps = useMemo(() => ({
    0: 'forest_map',
    1: 'desert_map',
  }), [])

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

    const items = mapList.flatMap(name =>
      types.map(type => ({ name, type })))

    const totalImages = items.length
    setStatus({ loaded: 0, total: totalImages, item: '' })
    let loadedCount = 0

    const loadImage = ({ name, type }) => {
      const suffix = type === 'normal' ? '' : `_${type}`
      const img = new Image()
      img.src = `${baseURL}maps/${name}/map${suffix}.png`
      return new Promise(resolve => {
        img.onload = img.onerror = () => {
          loadedCount += 1
          setStatus({
            loaded: loadedCount,
            total: totalImages,
            item: `${name}${suffix}`,
          })
          resolve()
        }
      })
    }

    Promise.all(items.map(loadImage)).then(() => setLoading(false))
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
