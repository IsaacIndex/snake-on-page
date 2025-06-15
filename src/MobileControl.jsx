import { Joystick } from 'react-joystick-component'
import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

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
  }, [onDirectionChange])

  return (
    <div style={componentStyle}>
      {/* Mobile directional buttons could go here if needed */}


      <Joystick ref={controlRef} minDistance={50} move={handleMove} stop={handleStop} />

    </div>
  )
}

MobileControl.propTypes = {
  onDirectionChange: PropTypes.func.isRequired,
}

export default MobileControl