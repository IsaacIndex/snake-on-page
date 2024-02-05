import { Joystick } from 'react-joystick-component'

const MobileControl = ({ onDirectionChange }) => {
  const componentStyle = {
    position: 'fixed',
    bottom: 0,
    right: 0,
    // width: '100%',
    width: '20%',
    height: '10%',
    // backgroundColor: 'blue',
    color: 'white',
    fontSize: '16px',
    padding: '10px',
    borderRadius: '4px'
  }

  const handleButtonClick = (direction) => {
    onDirectionChange(direction);
  }

  const handleMove = (event) => {
    console.log(event)
    switch (event.direction) {
      case "FORWARD":
        onDirectionChange("up")
        break;
      case "BACKWARD":
        onDirectionChange("down")
        break;
      case "LEFT":
        onDirectionChange("left")
        break;
      case "RIGHT":
        onDirectionChange("right")
        break;
    }
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