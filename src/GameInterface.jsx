import SnakeGame from './SnakeGame'

const GameInterface = () => {
  const maps = {
    1: "desertImages",
  }
  return (
    <div>
      <SnakeGame mapImporterName={"forestImages"} />
    </div>
  );
}

export default GameInterface;