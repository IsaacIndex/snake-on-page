import styles from './SnakeGame.module.css'
import { useRef, useEffect, useState, useMemo } from "react";
import MobileControl from "../MobileControl";
import LoadingScreen from '../LoadingScreen';
import ImageLoader from "../ImageLoader";
import snakeImages from "../snakeImages";
// import mapImages from "./mapImages";

const SnakeGame = ({ mapImporterName, nextMap, addScore }) => {

  const [mapImages, setMapImages] = useState("")
  const snakeRef = useRef();
  const appleRef = useRef();
  const tunnelRef = useRef()
  const directionRef = useRef("right");

  const snakeCanvasRef = useRef();
  const snakeSpriteImgRef = useRef();
  const mapCanvasRef = useRef();
  const [mapDeficiency, setMapDeficiency] = useState("normal")
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef()
  const spriteRef = useRef()

  const [isMobile, setIsMobile] = useState(false);
  const [spriteSize, setSpriteSize] = useState(30)

  const onComplete = after(5, () => {
    console.log(loaded)
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

  // Key Update
  const keyUpdate = e => {
    if (typeof e === 'object') {
      const keyboardMapping = {
        "ArrowLeft": "left",
        "ArrowRight": "right",
        "ArrowUp": "up",
        "ArrowDown": "down",
      }
      if (keyboardMapping[e.key] == "right" && directionRef.current != "left") {
        directionRef.current = "right"
      } else if (keyboardMapping[e.key] == "left" && directionRef.current != "right") {
        directionRef.current = "left"
      } else if (keyboardMapping[e.key] == "up" && directionRef.current != "down") {
        directionRef.current = "up"
      } else if (keyboardMapping[e.key] == "down" && directionRef.current != "up") {
        directionRef.current = "down"
      } else if (e.key == "m") {
        addScore()
        console.log(addScore)
      } else {
        console.log(e.key)
        return
      }

    } else {
      // Mobile Control
      // console.log(e)
      if (e == "RIGHT" && directionRef.current != "left") {
        directionRef.current = "right"
      } else if (e == "LEFT" && directionRef.current != "right") {
        directionRef.current = "left"
      } else if (e == "FORWARD" && directionRef.current != "down") {
        directionRef.current = "up"
      } else if (e == "BACKWARD" && directionRef.current != "up") {
        directionRef.current = "down"
      } else {
        return
      }
    }
    gameLoop()
  }

  // move snake
  const moveSnake = () => {
    const dirMap = {
      "right": [1, 0],
      "left": [-1, 0],
      "up": [0, -1],
      "down": [0, 1],
    }

    // add new head
    snakeRef.current.unshift(
      [snakeRef.current[0][0] + dirMap[directionRef.current][0] * spriteSize,
      snakeRef.current[0][1] + dirMap[directionRef.current][1] * spriteSize]
    );

    // if collide with wall
    if (snakeRef.current[0][0] < 0) {
      snakeRef.current[0][0] = window.innerWidth
    } else if (snakeRef.current[0][0] > window.innerWidth) {
      snakeRef.current[0][0] = 0
    }

    // Check collide with tunnel
    const tunnel = tunnelRef.current
    if (
      Math.abs(snakeRef.current[0][0] - tunnel[0]) < (spriteSize) &&
      Math.abs((snakeRef.current[0][1] + scrollY) - tunnel[1]) < (spriteSize)
    ) {
      console.log("==========================tunnel")
      nextMap()
    }

    // Check collide with apple
    const apples = appleRef.current;
    let appleEaten = false
    for (let index = 0; index < apples.length; index++) {
      const [deficiency, applePosition] = apples[index];

      if (
        Math.abs(snakeRef.current[0][0] - applePosition[0]) < spriteSize * 0.75 &&
        Math.abs((snakeRef.current[0][1] + scrollY) - applePosition[1]) < spriteSize * 0.75
      ) {
        console.log("==========================eaten")
        addScore()
        appleEaten = true
        appleRef.current.splice(index, 1)
        drawMap()
        const SnakeSpriteImg = new Image()
        SnakeSpriteImg.src = snakeImages[deficiency]
        snakeSpriteImgRef.current = SnakeSpriteImg
        setMapDeficiency(deficiency)
        index--
      }
    }

    if (!appleEaten) {
      snakeRef.current.pop()
    }

    // offset to stay in the centre
    console.log(window.innerHeight + window.scrollY, containerRef.current.offsetHeight)
    if (directionRef.current == "down") {
      if (window.innerHeight + window.scrollY < containerRef.current.offsetHeight - spriteSize) {
        snakeRef.current.forEach(s => s[1] -= spriteSize)
      }
      scrollBy(0, spriteSize + 1)
    } else if (directionRef.current == "up") {
      if (window.scrollY > 0) {
        snakeRef.current.forEach(s => s[1] += spriteSize)
      }
      scrollBy(0, -spriteSize + 1)
    }
  }

  // Paint snake
  const drawSnake = () => {
    const snakeCanvas = snakeCanvasRef.current
    const snakeContext = snakeCanvas.getContext('2d')
    snakeContext.clearRect(0, 0, snakeContext.canvas.width, snakeContext.canvas.height)
    // credits to https://github.com/rembound/Snake-Game-HTML5/blob/master/snake.js
    for (var i = 0; i < snakeRef.current.length; i++) {
      var clipx = 0
      var clipy = 0
      var segment = snakeRef.current[i]
      var segx = segment[0];
      var segy = segment[1];

      if (i == 0) {
        // Head; Determine the correct image
        var nseg = snakeRef.current[i + 1]; // Next segment
        if (segy < nseg[1]) {
          // Up
          clipx = 3; clipy = 0;
        } else if (segx > nseg[0]) {
          // Right
          clipx = 4; clipy = 0;
        } else if (segy > nseg[1]) {
          // Down
          clipx = 4; clipy = 1;
        } else if (segx < nseg[0]) {
          // Left
          clipx = 3; clipy = 1;
        }
      } else if (i == snakeRef.current.length - 1) {
        // Tail; Determine the correct image
        var pseg = snakeRef.current[i - 1]; // Prev segment
        if (pseg[1] < segy) {
          // Up
          clipx = 3; clipy = 2;
        } else if (pseg[0] > segx) {
          // Right
          // TODO: problem when across board
          clipx = 4; clipy = 2;
        } else if (pseg[1] > segy) {
          // Down
          clipx = 4; clipy = 3;
        } else if (pseg[0] < segx) {
          // Left
          clipx = 3; clipy = 3;
        }
      } else {
        // Body; Determine the correct image
        var pseg = snakeRef.current[i - 1]; // Previous segment
        var nseg = snakeRef.current[i + 1]; // Next segment
        if (pseg[0] < segx && nseg[0] > segx || nseg[0] < segx && pseg[0] > segx) {
          // Horizontal Left-Right
          clipx = 1; clipy = 0;
        } else if (pseg[0] < segx && nseg[1] > segy || nseg[0] < segx && pseg[1] > segy) {
          // Angle Left-Down
          clipx = 2; clipy = 0;
        } else if (pseg[1] < segy && nseg[1] > segy || nseg[1] < segy && pseg[1] > segy) {
          // Vertical Up-Down
          clipx = 2; clipy = 1;
        } else if (pseg[1] < segy && nseg[0] < segx || nseg[1] < segy && pseg[0] < segx) {
          // Angle Top-Left
          clipx = 2; clipy = 2;
        } else if (pseg[0] > segx && nseg[1] < segy || nseg[0] > segx && pseg[1] < segy) {
          // Angle Right-Up
          clipx = 0; clipy = 1;
        } else if (pseg[1] > segy && nseg[0] > segx || nseg[1] > segy && pseg[0] > segx) {
          // Angle Down-Right
          clipx = 0; clipy = 0;
        } else {
          // when across board
          clipx = 1; clipy = 0;
        }
      }

      // wiggle animation
      var randomNumber = [0, 0]
      // if (i != 0) {
      //   if (["right", "left"].includes(directionRef.current)) {
      //     randomNumber = [0, Math.random() - 0.5]
      //   } else {
      //     randomNumber = [Math.random() - 0.5, 0]
      //   }
      // }

      // Draw snake
      snakeContext.drawImage(spriteRef.current, clipx * 64, clipy * 64, 64, 64, snakeRef.current[i][0] + randomNumber[0], snakeRef.current[i][1] + randomNumber[1], spriteSize, spriteSize)
    }
  }

  const drawMap = () => {
    const mapCanvas = mapCanvasRef.current
    const mapContext = mapCanvas.getContext('2d')
    mapContext.clearRect(0, 0, mapContext.canvas.width, mapContext.canvas.height)
    mapContext.textAlign = "center"
    mapContext.font = "20px Georgia";
    mapContext.fillStyle = "white"
    appleRef.current.forEach(([deficiency, applePosition]) => {
      mapContext.drawImage(spriteRef.current, 0 * 64, 3 * 64, 64, 64, applePosition[0], applePosition[1], spriteSize, spriteSize)
      mapContext.fillText(deficiency, applePosition[0] + spriteSize / 2, applePosition[1] + spriteSize)
    })
    mapContext.drawImage(spriteRef.current, 1 * 64, 3 * 64, 64, 64, tunnelRef.current[0], tunnelRef.current[1], spriteSize * 2, spriteSize * 2)
    mapContext.fillText("Next Map", tunnelRef.current[0] + spriteSize, tunnelRef.current[1] + 64)
  }

  // Game Loop (triggered after directionRef updated)
  const gameLoop = () => {
    console.log("gameLoop")

    // // move snake
    moveSnake()

    // draw; apple only redraws when collision
    drawSnake()
  }

  // Reset States when change map
  useEffect(() => {
    setLoaded(false)
  }, [mapImporterName])

  // Setup useEffect
  useEffect(() => {
    console.log("setup")

    // Resize after change map
    // containerRef.current.style.height = '100%'
    // mapCanvasRef.current.style.height = containerRef.current.style.height

    // load map images
    // const loadMapImages = async () => {
    //   try {
    //     const module = await import(`/assets/${mapImporterName}/..`);
    //     console.log(module)
    //     setMapImages(module.default);
    //   } catch (error) {
    //     console.error(`Failed to dynamically load component`);
    //   }
    // };

    // loadMapImages();

    // apple position
    appleRef.current = [
      ["protanopia", [0.3, 0.3]],
      ["achromatopsia", [0.4, 0.35]],
      ["deuteranopia", [0.4, 0.45]],
      ["tritanopia", [0.4, 0.55]],
      ["normal", [0.4, 0.65]]
    ]

    appleRef.current.forEach(a => {
      a[1][0] *= containerRef.current.offsetWidth
      a[1][1] *= containerRef.current.offsetHeight
    })

    // snake image
    snakeRef.current = [
      [Math.round(window.innerWidth / 2), Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - spriteSize, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - spriteSize * 2, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - spriteSize * 3, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - spriteSize * 4, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - spriteSize * 5, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - spriteSize * 6, Math.round(window.innerHeight / 2)],
    ]


    const SnakeSpriteImg = new Image()
    SnakeSpriteImg.src = snakeImages.normal
    snakeSpriteImgRef.current = SnakeSpriteImg

    // Tunnel
    tunnelRef.current = [
      Math.floor(Math.random() * ((document.documentElement.offsetWidth - 64 * 2) - 64 * 2 + 1)) + 64 * 2,
      Math.ceil(document.documentElement.offsetHeight * 0.9)
    ]

    // resize canvas
    const resizeCanvas = () => {
      const snakeCanvas = snakeCanvasRef.current
      const mapCanvas = mapCanvasRef.current
      const container = containerRef.current

      snakeCanvas.width = Math.min(window.innerWidth, 1920)
      snakeCanvas.height = window.innerHeight;

      mapCanvas.width = container.offsetWidth
      mapCanvas.height = container.offsetHeight

      setIsMobile(window.innerWidth <= 768)
      // setSpriteSize(Math.round(window.innerWidth * 0.03))

      // TODO: Conversion from position a (screen size 1) to position b (screen size 2)

      drawSnake()
      drawMap()
    };
    resizeCanvas();

    // Draw
    drawSnake()
    drawMap()

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener("keydown", keyUpdate);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener("keydown", keyUpdate)
    }
  }, [loaded, mapImporterName])

  // change snakesprite use Effect
  useEffect(() => {
    console.log("snakesprite")
    const spriteImg = spriteRef.current
    spriteImg.src = snakeSpriteImgRef.current.src
    spriteImg.onload = () => {
      drawMap()
      drawSnake()
    }

  }, [snakeSpriteImgRef.current])

  return (
    <div ref={containerRef} className={styles.snakeGame}>
      {/* TODO: Loading full screen + no key input */}
      {/* {!loaded && <LoadingScreen />} */}
      <img src="" hidden style={{ position: "fixed" }} ref={spriteRef} />
      <canvas className={styles.mapCanvas} ref={mapCanvasRef} />
      <canvas className={styles.snakeCanvas} ref={snakeCanvasRef} />

      <img src={`/maps/${mapImporterName}/map.png`} hidden={hidden.normal} alt="normal" onLoad={onComplete} />
      <img src={`/maps/${mapImporterName}/map_achromatopsia.png`} hidden={hidden.achromatopsia} alt="normal" onLoad={onComplete} />
      <img src={`/maps/${mapImporterName}/map_deuteranopia.png`} hidden={hidden.deuteranopia} alt="normal" onLoad={onComplete} />
      <img src={`/maps/${mapImporterName}/map_protanopia.png`} hidden={hidden.protanopia} alt="normal" onLoad={onComplete} />
      <img src={`/maps/${mapImporterName}/map_tritanopia.png`} hidden={hidden.tritanopia} alt="normal" onLoad={onComplete} />

      {isMobile && <MobileControl onDirectionChange={keyUpdate} />}
    </div>
  )
}
export default SnakeGame
