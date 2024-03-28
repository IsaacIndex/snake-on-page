import SnakeGame from './SnakeGame'
import { useState, useEffect, useRef } from 'react'

const GameInterface = () => {
  const [mapIndex, setMapIndex] = useState(0)
  const maps = {
    0: "forestImages",
    1: "desertImages",
  }

  return (
    <div>
      <SnakeGame mapImporterName={maps[mapIndex]} nextMap={() => setMapIndex(mapIndex + 1)} />
    </div>
  );
}

export default GameInterface;