import PropTypes from 'prop-types'
import styles from './LoadingScreen.module.css'

const ASCII_SNAKE = `
 ____  _   _    _    _  _______
/ ___|| \\ | |  / \\  | |/ / ____|
\\___ \\|  \\| | / _ \\ | ' /|  _|
 ___) | |\\  |/ ___ \\| . \\| |___
|____/|_| \\_/_/   \\_\\_|\\_\\_____|

         ____
       / . .\\
       \\  ---<
        \\  /
  ______/ /
 <______/
`

const LoadingScreen = ({ item, loaded, total }) => (
  <div className={styles.loadingDiv}>
    <pre className={styles.asciiArt} aria-hidden="true">{ASCII_SNAKE}</pre>
    <div className={styles.spinner} />
    <div className={styles.loadingText}>
      Loading {item} ({total - loaded} left)
    </div>
    <div className={styles.progressBar}>
      <div
        className={styles.progressFill}
        style={{ width: `${(loaded / total) * 100}%` }}
      />
    </div>
  </div>
)

export default LoadingScreen

LoadingScreen.propTypes = {
  item: PropTypes.string.isRequired,
  loaded: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}
