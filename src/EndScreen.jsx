import PropTypes from 'prop-types'
import styles from './EndScreen.module.css'

const formatMapName = name => name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const descriptions = {
  normal: 'You experienced normal colour vision.',
  protanopia:
    'Protanopia reduces sensitivity to red light, making red and green hard to tell apart.',
  deuteranopia:
    'Deuteranopia diminishes green light perception, also affecting red–green distinction.',
  tritanopia:
    'Tritanopia lowers sensitivity to blue light and shifts blue–yellow hues.',
  achromatopsia:
    'Achromatopsia removes all colour, showing only shades of grey.',
}

const EndScreen = ({ scores, maps, onRestart, deficiency }) => (
  <div className={styles.endScreen}>
    <div className={styles.title}>Game Over</div>
    <ul className={styles.scoreList}>
      {maps.map(name => (
        <li key={name} className={styles.scoreItem}>
          <span className={styles.mapName}>{formatMapName(name)}:</span>
          <span>{scores[name] || 0}</span>
        </li>
      ))}
    </ul>
    {descriptions[deficiency] && (
      <p className={styles.description}>{descriptions[deficiency]}</p>
    )}
    <button className={styles.restartButton} onClick={onRestart}>
      Start Over
    </button>
  </div>
)

EndScreen.propTypes = {
  scores: PropTypes.object.isRequired,
  maps: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRestart: PropTypes.func.isRequired,
  deficiency: PropTypes.string,
}

export default EndScreen
