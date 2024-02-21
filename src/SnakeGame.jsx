import styles from './SnakeGame.module.css'
import { useRef, useEffect, useState, useMemo } from "react";

import {
  SNAKE,
  // snakeSize,
  FRAME
} from "./constants";

import ImageLoader from "./ImageLoader";
import snakeImages from "./snakeImages";
import mapImages from "./mapImages";

const SnakeGame = () => {
  const snakeRef = useRef(SNAKE);
  const appleRef = useRef();

  const snakeCanvasRef = useRef();
  const snakeSpriteImgRef = useRef(null);
  const mapCanvasRef = useRef();
  const [mapDeficiency, setMapDeficiency] = useState("normal")
  const [loaded, setLoaded] = useState(false)

  const [isMobile, setIsMobile] = useState(false);
  const [spriteSize, setSpriteSize] = useState(window.innerWidth * 0.03)

  const onComplete = after(Object.keys(mapImages).length, () => {
    setLoaded(true);
    console.log("loaded");
  })

  function after(count, f) {
    let noOfCalls = 0;
    return function (...rest) {
      noOfCalls = noOfCalls + 1;
      if (count === noOfCalls) {
        f(...rest);
      }
    };
  }
  const hidden = useMemo(() => {
    return {
      normal: mapDeficiency !== 'normal',
      achromatopsia: mapDeficiency !== 'achromatopsia',
      deuteranopia: mapDeficiency !== 'deuteranopia',
      protanopia: mapDeficiency !== 'protanopia',
      tritanopia: mapDeficiency !== 'tritanopia',
    };
  }, [mapDeficiency]);

  // Setup useEffect
  useEffect(() => {
    console.log("setup")

    // apple position
    appleRef.current = [
      ["protanopia", [0.3, 0.3]],
      ["achromatopsia", [0.4, 0.35]],
      ["deuteranopia", [0.4, 0.45]],
      ["tritanopia", [0.4, 0.55]],
      ["normal", [0.4, 0.25]]
    ]

    appleRef.current.forEach(a => {
      a[1][0] *= mapCanvasRef.current.offsetWidth
      a[1][1] *= mapCanvasRef.current.offsetHeight
    })

    // snake image
    const SnakeSpriteImg = new Image()
    SnakeSpriteImg.src = snakeImages.normal
    snakeSpriteImgRef.current = SnakeSpriteImg

    // resize canvas
    const canvas = snakeCanvasRef.current;
    const resizeCanvas = () => {
      canvas.width = Math.min(window.innerWidth, 1920)
      canvas.height = window.innerHeight;
      setIsMobile(window.innerWidth <= 768)
      setSpriteSize(Math.round(window.innerWidth * 0.03))
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    // Key Update
    const keyUpdate = e => {
      switch (e.key) {
        case "ArrowLeft":
          if (directionRef.current != "right") directionRef.current = "left"
          break;
        case "ArrowRight":
          if (directionRef.current != "left") directionRef.current = "right"
          break;
        case "ArrowUp":
          if (directionRef.current != "down") directionRef.current = "up"
          break;
        case "ArrowDown":
          if (directionRef.current != "up") directionRef.current = "down"
          break;
      }
      // console.log(e.key, directionRef.current)
    }

    window.addEventListener("keydown", keyUpdate);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener("keydown", keyUpdate)
    };

  }, [loaded])

  return (
    <div className={styles.snakeGame}>
      <canvas className={styles.snakeCanvas} ref={snakeCanvasRef} />
      <canvas className={styles.mapCanvas} ref={mapCanvasRef} />
      <ImageLoader src={mapImages["normal"]} hidden={hidden.normal} alt="normal" onLoad={onComplete} />
    </div>
  )
}
export default SnakeGame
