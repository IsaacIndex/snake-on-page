import { Joystick } from 'react-joystick-component'
import { useState } from "react";

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

  const [isMoving, setIsMoving] = useState(false);

  // const handleMove = (event) => {
  //   if (!isMoving) {
  //     setIsMoving(true);

  //     // Call the move function immediately
  //     console.log(event)
  //     onDirectionChange(event.direction)

  //     // Set a timeout to reset the isMoving flag after a specific delay
  //     setTimeout(() => {
  //       setIsMoving(false);
  //     }, 0);
  //   }
  // }

  const handleButtonClick = (direction) => {
    onDirectionChange(direction);
  }

  const handleMove = (event) => {
    console.log(event)
    onDirectionChange(event.direction)
  }

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


      <Joystick minDistance={50} move={handleMove} />

    </div>
  )
}
export default MobileControl