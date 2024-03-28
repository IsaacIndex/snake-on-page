import { useRef, useEffect, useState, useMemo } from "react";
import React from 'react';
import styles from './Snake.module.css'
import {
  SNAKE,
  // snakeSize,
  FRAME
} from "./constants";
import snakeImages from "./snakeImages";
import mapImages from "./image_importers/mapImages";
import ImageLoader from "./ImageLoader";
import MobileControl from "./MobileControl";

const Snake = () => {
  console.log("Snake")
  const snakeCanvasRef = useRef();
  const timeRef = useRef(0);
  const snakeRef = useRef(SNAKE);
  const appleRef = useRef();
  const directionRef = useRef("right");
  const snakeSpriteImgRef = useRef(null);
  const mapDivRef = useRef()

  const [spriteSize, setSpriteSize] = useState(window.innerWidth * 0.03)
  const [mapDeficiency, setMapDeficiency] = useState("normal")
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(false)
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

  // may be a overkill
  const hidden = useMemo(() => {
    return {
      normal: mapDeficiency !== 'normal',
      achromatopsia: mapDeficiency !== 'achromatopsia',
      deuteranopia: mapDeficiency !== 'deuteranopia',
      protanopia: mapDeficiency !== 'protanopia',
      tritanopia: mapDeficiency !== 'tritanopia',
    };
  }, [mapDeficiency]);

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

    const apples = appleRef.current;
    let appleEaten = false
    for (let index = 0; index < apples.length; index++) {
      const [deficiency, applePosition] = apples[index];

      // Check width and height
      // console.log(snakeRef.current[0][1], applePosition[1] * document.documentElement.scrollHeight)
      if (
        Math.abs(snakeRef.current[0][0] - applePosition[0] * document.documentElement.scrollWidth) < spriteSize &&
        Math.abs((snakeRef.current[0][1] + scrollY) - applePosition[1] * document.documentElement.scrollHeight) < (spriteSize)
      ) {
        console.log("eaten")
        appleEaten = true
        appleRef.current.splice(index, 1)
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
    if (directionRef.current == "down") {
      snakeRef.current.forEach(s => s[1] -= spriteSize)
      if (scrollY != document.documentElement.scrollHeight) {
        appleRef.current.forEach(s => s[1][1] -= spriteSize)
      }

      console.log(appleRef.current)
      scrollBy(0, spriteSize + 1)
      console.log(scrollY, spriteSize)
    } else if (directionRef.current == "up") {
      snakeRef.current.forEach(s => s[1] += spriteSize)
      if (scrollY != 0) {
        appleRef.current.forEach(s => s[1][1] += spriteSize)
      }
      scrollBy(0, -spriteSize + 1)
    }
  }

  const drawSnake = (context) => {
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
      if (i != 0) {
        if (["right", "left"].includes(directionRef.current)) {
          randomNumber = [0, Math.random() - 0.5]
        } else {
          randomNumber = [Math.random() - 0.5, 0]
        }
      }

      // Draw snake
      context.drawImage(snakeSpriteImgRef.current, clipx * 64, clipy * 64, 64, 64, snakeRef.current[i][0] + randomNumber[0], snakeRef.current[i][1] + randomNumber[1], spriteSize, spriteSize)
    }
  }

  const drawApple = (context) => {
    appleRef.current.forEach(([deficiency, applePosition]) => {
      context.drawImage(snakeSpriteImgRef.current, 0 * 64, 3 * 64, 64, 64, applePosition[0], applePosition[1], spriteSize, spriteSize)
      context.font = "20px Georgia";
      context.fillStyle = "white"
      context.fillText(deficiency, applePosition[0], applePosition[1] - scrollY + spriteSize)
    })
  }

  const handleDirectionChange = (direction) => {
    switch (direction) {
      case "left":
        if (directionRef.current != "right") directionRef.current = "left"
        break;
      case "right":
        if (directionRef.current != "left") directionRef.current = "right"
        break;
      case "up":
        if (directionRef.current != "down") directionRef.current = "up"
        break;
      case "down":
        if (directionRef.current != "up") directionRef.current = "down"
        break;
    }
  }

  // Game Loop
  useEffect(() => {
    if (loaded) {
      console.log("game loop")
      let animationId
      const renderer = time => {
        if (time - timeRef.current >= FRAME) {
          // changes
          moveSnake()

          // start to draw the objects
          const canvas = snakeCanvasRef.current
          const context = canvas.getContext('2d')
          context.clearRect(0, 0, context.canvas.width, context.canvas.height)
          // context.fillSclipyle = "lightblue";
          // snakeRef.current.forEach(s => context.fillRect(s[0], s[1], snakeSize, snakeSize))
          drawSnake(context)

          drawApple(context)

          timeRef.current = time;
        }
        animationId = window.requestAnimationFrame(renderer)
      }
      renderer()

      return () => {
        window.cancelAnimationFrame(animationId)
      }
    }
  }, [moveSnake, loaded])

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
    // console.log(mapDivRef.current.height)
    // console.log(document.documentElement.scrollWidth, document.documentElement.scrollHeight)
    appleRef.current.forEach(a => {
      a[1][0] *= document.documentElement.scrollWidth
      a[1][1] *= document.documentElement.scrollHeight
      // console.log(a)
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
    <>
      <div className={styles.mapDiv} ref={mapDivRef}>
        {!loaded && <span>Loading...</span>}
        <canvas id="snakeCanvas" ref={snakeCanvasRef} />
        <ImageLoader src={mapImages["normal"]} hidden={hidden.normal} alt="normal" onLoad={onComplete} />
        <ImageLoader src={mapImages["achromatopsia"]} hidden={hidden.achromatopsia} alt="achromatopsia" onLoad={onComplete} />
        <ImageLoader src={mapImages["deuteranopia"]} hidden={hidden.deuteranopia} alt="deuteranopia" onLoad={onComplete} />
        <ImageLoader src={mapImages["protanopia"]} hidden={hidden.protanopia} alt="protanopia" onLoad={onComplete} />
        <ImageLoader src={mapImages["tritanopia"]} hidden={hidden.tritanopia} alt="tritanopia" onLoad={onComplete} />
      </div>
      {isMobile && <MobileControl onDirectionChange={handleDirectionChange} />}
    </>
  )
}
export default Snake;