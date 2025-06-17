import SnakeGame from './SnakeGame'
import LoadingScreen from '../LoadingScreen'
import EndScreen from '../EndScreen'
import { useState, useEffect, useMemo } from 'react'
import "./GameInterface.css"

// import MyImage from "/mountain.png"

const GameInterface = () => {
  const [mapIndex, setMapIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [mapScores, setMapScores] = useState({})
  const [animateScore, setAnimateScore] = useState(false)
  const [showEnd, setShowEnd] = useState(false)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({ loaded: 0, total: 0, item: '' })
  const [deficiency, setDeficiency] = useState('normal')
  const maps = useMemo(() => ({
    0: 'forest_map',
    1: 'desert_map',
    2: 'beach_map',
  }), [])

  const basePath = window.location.pathname.split("/")[1]
  const baseURL = (basePath) ? ("/" + basePath + "/") : ("")

  const formatMapName = name =>
    name
      .split('_')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')

  const addScore = () => {
    setScore(prev => prev + 1)
    setMapScores(prev => ({
      ...prev,
      [maps[mapIndex]]: (prev[maps[mapIndex]] || 0) + 1,
    }))
    setAnimateScore(true)
  }

  const handleNextMap = () => {
    if (mapIndex + 1 >= Object.keys(maps).length) {
      setShowEnd(true)
    } else {
      setMapIndex(mapIndex + 1)
    }
  }

  const handleRestart = () => {
    setMapIndex(0)
    setScore(0)
    setMapScores({})
    setShowEnd(false)
    setDeficiency('normal')
    window.scrollTo(0, 0)
  }

  const handleDeficiencyChange = type => setDeficiency(type)

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
      {showEnd ? (
        <EndScreen
          scores={mapScores}
          maps={Object.values(maps)}
          onRestart={handleRestart}
          deficiency={deficiency}
        />
      ) : (
        <div className='game-interface'>
          <div className="score-board">
            <span className="score-label">Score:</span>
            <span className={`score-value${animateScore ? ' animate' : ''}`}>{score}</span>
          </div>
          <div className="map-name-box">{formatMapName(maps[mapIndex])}</div>
          {/* <img src={`${(baseURL)}mountain.jpg`} alt="My Image" /> */}
          <SnakeGame
            mapImporterName={maps[mapIndex]}
            nextMap={handleNextMap}
            addScore={addScore}
            onDeficiencyChange={handleDeficiencyChange}
          />
        </div>
      )}
    </>
  );
}

export default GameInterface;
