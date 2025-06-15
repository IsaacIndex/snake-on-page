import styles from './LoadingScreen.module.css'

const LoadingScreen = () => (
  <div className={styles.loadingDiv}>
    <div className={styles.spinner} />
    <div className={styles.loadingText}>Loading...</div>
  </div>
)
export default LoadingScreen

