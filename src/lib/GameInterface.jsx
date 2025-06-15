import SnakeGame from './SnakeGame'
import LoadingScreen from '../LoadingScreen'
import { useState, useEffect, useMemo } from 'react'
import "./GameInterface.css"

// import MyImage from "/mountain.png"

const GameInterface = () => {
  const [mapIndex, setMapIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [animateScore, setAnimateScore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({ loaded: 0, total: 0, item: '' })
  const maps = useMemo(() => ({
    0: 'forest_map',
    1: 'desert_map',
  }), [])

  const basePath = window.location.pathname.split("/")[1]
  const baseURL = (basePath) ? ("/" + basePath + "/") : ("")
  
  const addScore = () => {
    setScore(prev => prev + 1)
    setAnimateScore(true)
  }
  
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

  useEffect(() => {
    if (!animateScore) return
    const timeout = setTimeout(() => setAnimateScore(false), 300)
    return () => clearTimeout(timeout)
  }, [animateScore])

  return (
    <>
      {loading && (
        <LoadingScreen item={status.item} loaded={status.loaded} total={status.total} />
      )}
      <div className='game-interface'>
        <div className="score-board">
          <span className="score-label">Score:</span>
          <span className={`score-value${animateScore ? ' animate' : ''}`}>{score}</span>
        </div>
        <div className="map-name-box">{maps[mapIndex]}</div>
        {/* <img src={`${(baseURL)}mountain.jpg`} alt="My Image" /> */}
        <SnakeGame
          mapImporterName={maps[mapIndex]}
          nextMap={() => setMapIndex(mapIndex + 1)}
          addScore={addScore}
        />
      </div>
    </>
  );
}

export default GameInterface;
