import styles from './Badge.module.css';

export const Badge = ({ text, number }) => {
    return (
        <div className={styles.badge}>
            <span className={`${styles.left}`}>{text}</span>
            <span className={styles.right}>{number}</span>
        </div>
    )
}