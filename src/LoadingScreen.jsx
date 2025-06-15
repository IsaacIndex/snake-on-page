import PropTypes from 'prop-types'
import styles from './LoadingScreen.module.css'

const ASCII_SNAKE = `
 ___ _  _   _   _  _____
/ __| \\| | /_\\ | |/ / __|
\\__ \\ .\` |/ _ \\| ' <| _|
|___/_|\\_/_/ \\_\\_|\\_\\___|

   /^\\/^\\
 _|__|  O|
/     \\_/~
\\_____/|
   V  V
`

const LoadingScreen = ({ item, loaded, total }) => (
  <div className={styles.loadingDiv}>
    <pre className={styles.asciiArt} aria-hidden="true">{ASCII_SNAKE}</pre>
    <div className={styles.spinner} />
    <div className={styles.loadingText}>
      Loading {item} ({total - loaded} left) <span role="img" aria-label="snake">🐍</span>
    </div>
    <div className={styles.progressBar}>
      <div
        className={styles.progressFill}
        style={{ width: `${(loaded / total) * 100}%` }}
      />
    </div>
    <div className={styles.loadingInfo}>
      <span role="img" aria-label="eye">👁️</span> color-blind friendly
    </div>
  </div>
)

export default LoadingScreen

LoadingScreen.propTypes = {
  item: PropTypes.string.isRequired,
  loaded: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}
