import PropTypes from 'prop-types'
import styles from './EndScreen.module.css'

const formatMapName = name => name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const EndScreen = ({ scores, maps, onRestart }) => (
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
    <button className={styles.restartButton} onClick={onRestart}>
      Start Over
    </button>
  </div>
)

EndScreen.propTypes = {
  scores: PropTypes.object.isRequired,
  maps: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRestart: PropTypes.func.isRequired,
}

export default EndScreen
