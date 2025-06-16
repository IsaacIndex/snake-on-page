import PropTypes from 'prop-types'
import styles from './EndScreen.module.css'

const formatMapName = name => name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const EndScreen = ({ scores, maps }) => (
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
  </div>
)

EndScreen.propTypes = {
  scores: PropTypes.object.isRequired,
  maps: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default EndScreen
