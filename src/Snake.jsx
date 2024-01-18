import { useRef, useEffect, useState } from "react";
import React from 'react';
import {
  SNAKE,
  SIZE,
  FRAME,
  APPLE
} from "./constants";
import snakeImages from "./snakeImages";
import mapImages from "./mapImages";
import ImageLoader from "./ImageLoader";

const Snake = () => {
  console.log("Snake")
  const boardRef = useRef();
  const timeRef = useRef(0);
  const snakeRef = useRef(SNAKE);
  const appleRef = useRef(APPLE);
  const directionRef = useRef("right");
  const snakeSpriteImgRef = useRef(null);
  const mapRef = useRef("normal")


  const moveSnake = () => {
    const dirMap = {
      "right": [1, 0],
      "left": [-1, 0],
      "up": [0, -1],
      "down": [0, 1],
    }

    // add new head
    snakeRef.current.unshift(
      [snakeRef.current[0][0] + dirMap[directionRef.current][0] * SIZE,
      snakeRef.current[0][1] + dirMap[directionRef.current][1] * SIZE]
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
      console.log((snakeRef.current[0][1] + scrollY), (applePosition[1] * document.documentElement.scrollHeight + scrollY))
      if (
        Math.abs(snakeRef.current[0][0] - applePosition[0] * document.documentElement.scrollWidth) < SIZE &&
        Math.abs(snakeRef.current[0][1] - applePosition[1] * document.documentElement.scrollHeight) < (SIZE + scrollY)
      ) {
        console.log("eaten")
        appleEaten = true
        appleRef.current.splice(index, 1)
        const SnakeSpriteImg = new Image()
        SnakeSpriteImg.src = snakeImages[deficiency]
        snakeSpriteImgRef.current = SnakeSpriteImg
        mapRef.current = mapImages[deficiency]
        index--
      }
    }

    if (!appleEaten) {
      snakeRef.current.pop()
    }

    // offset to stay in the centre
    if (directionRef.current == "down") {
      snakeRef.current.forEach(s => s[1] -= SIZE)
      scrollBy(0, SIZE)
    } else if (directionRef.current == "up") {
      snakeRef.current.forEach(s => s[1] += SIZE)
      scrollBy(0, -SIZE)
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
      context.drawImage(snakeSpriteImgRef.current, clipx * 64, clipy * 64, 64, 64, snakeRef.current[i][0] + randomNumber[0], snakeRef.current[i][1] + randomNumber[1], SIZE, SIZE)
    }
  }

  const drawApple = (context) => {
    appleRef.current.forEach(([deficiency, applePosition]) => {
      context.drawImage(snakeSpriteImgRef.current, 0 * 64, 3 * 64, 64, 64, applePosition[0] * document.documentElement.scrollWidth, applePosition[1] * document.documentElement.scrollHeight - scrollY, SIZE, SIZE)
      context.font = "20px Georgia";
      context.fillStyle = "white"
      context.fillText(deficiency, applePosition[0] * document.documentElement.scrollWidth, applePosition[1] * document.documentElement.scrollHeight - scrollY + SIZE)
    })
  }

  // Game Loop
  useEffect(() => {
    let animationId
    const renderer = time => {
      if (time - timeRef.current >= FRAME) {
        // changes
        moveSnake()

        // start to draw the objects
        const canvas = boardRef.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        // context.fillSclipyle = "lightblue";
        // snakeRef.current.forEach(s => context.fillRect(s[0], s[1], SIZE, SIZE))
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
  }, [moveSnake])

  // Setup useEffect
  useEffect(() => {
    console.log("setup")

    // snake image
    const SnakeSpriteImg = new Image()
    SnakeSpriteImg.src = snakeImages.normal
    snakeSpriteImgRef.current = SnakeSpriteImg

    // resize canvas
    const canvas = boardRef.current;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Additional logic for redrawing or updating the canvas content
      // should go here if necessary
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
  }, [])

  return (
    <>
      <canvas id="board" ref={boardRef} />
      <ImageLoader src={mapImages["normal"]} hidden={mapRef.current == "normal" ? false : true} alt="Normal" />
      <ImageLoader src={mapImages["achromatopsia"]} hidden={mapRef.current == "achromatopsia" ? false : true} alt="Normal" />
      <ImageLoader src={mapImages["deuteranopia"]} hidden={mapRef.current == "deuteranopia" ? false : true} alt="Normal" />
      <ImageLoader src={mapImages["protanopia"]} hidden={mapRef.current == "protanopia" ? false : true} alt="Normal" />
      <ImageLoader src={mapImages["tritanopia"]} hidden={mapRef.current == "tritanopia" ? false : true} alt="Normal" />
    </>
  )
}
export default Snake;