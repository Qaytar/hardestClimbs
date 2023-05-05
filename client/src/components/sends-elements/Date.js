import styles from '../ComponentStyles.module.css';

function Date(props) {
    return (
        <span className={styles.chronoDate}>{props.date}</span>
    )
}

export default Date;