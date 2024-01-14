// import './App.css'
import SnakeGameGrid from './SnakeGameGrid'
import SnakeGame from './SnakeGame'
import Snake from './Snake'
import './App.css'
import Map from './assets/map/map.png'

function App() {

  return (
    <>
      <Snake />
      <img src={Map} style={{ maxWidth: '100%' }} />
    </>
  )
}

export default App
