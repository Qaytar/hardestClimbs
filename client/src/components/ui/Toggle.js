import styles from './Toggle.module.css';
function Toggle(props) {
    return (
        <section className={styles.gradeToggler}>
            <div className={styles.toggle}>
                <label className={styles.switch}>
                    <input onClick={props.onClickFunction} type="checkbox" id="toggle" />
                    <span className={styles.slider}></span>
                </label>
            </div>
            <div className={styles.toggleLabel}>
                <label for="toggle">
                    <i>switch to {props.isState === props.checkState ? props.options[0] : props.options[1]}</i>
                </label>
            </div>
        </section>
    )
}

export default Toggle;