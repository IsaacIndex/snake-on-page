const MobileControl = ({ onDirectionChange }) => {
  const componentStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'blue',
    color: 'white',
    fontSize: '16px',
    padding: '10px',
    borderRadius: '4px'
  }

  const handleButtonClick = (direction) => {
    onDirectionChange(direction);
  }

  return (
    <div className="mobile-control" style={componentStyle}>
      <button onClick={() => handleButtonClick('up')}>up</button>
      <button onClick={() => handleButtonClick('down')}>down</button>
      <button onClick={() => handleButtonClick('left')}>left</button>
      <button onClick={() => handleButtonClick('right')}>right</button>
    </div>
  )
}
export default MobileControl