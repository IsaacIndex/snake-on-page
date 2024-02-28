import { Joystick } from 'react-joystick-component'
import { useRef, useEffect } from "react";

const MobileControl = ({ onDirectionChange }) => {
  const componentStyle = {
    position: 'fixed',
    bottom: "5%",
    right: "5%",
    // width: '100%',
    width: '20%',
    height: '10%',
    // backgroundColor: 'blue',
    color: 'white',
    fontSize: '16px',
    padding: '10px',
    borderRadius: '4px'
  }

  const FRAME = 60
  const movingRef = useRef(null);
  const controlRef = useRef();
  const timeRef = useRef(0);

  const handleButtonClick = (direction) => {
    onDirectionChange(direction);
  }

  const handleMove = (event) => {
    console
    movingRef.current = event.direction
  }

  const handleStop = () => {
    movingRef.current = null
  }

  useEffect(() => {
    let animationId
    const renderer = time => {
      if (time - timeRef.current >= FRAME) {
        if (movingRef.current != null) {
          onDirectionChange(movingRef.current)
        }
        timeRef.current = time;
      }
      animationId = window.requestAnimationFrame(renderer)
    }
    renderer()

    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div style={componentStyle}>
      {/* <div className={styles.container} style={componentStyle}>
        <div className={styles['arrow-key-container']}>
          <div className={`${styles['arrow-key']} ${styles.up}`} onClick={() => handleButtonClick('up')}></div>
          <div className={`${styles['arrow-key']} ${styles.down}`} onClick={() => handleButtonClick('down')}></div>
          <div className={`${styles['arrow-key']} ${styles.left}`} onClick={() => handleButtonClick('left')}></div>
          <div className={`${styles['arrow-key']} ${styles.right}`} onClick={() => handleButtonClick('right')}></div>
        </div>
      </div> */}


      <Joystick ref={controlRef} minDistance={50} move={handleMove} stop={handleStop} />

    </div>
  )
}
export default MobileControl