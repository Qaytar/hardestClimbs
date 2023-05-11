import { handleMouseEnter, handleMouseLeave, handleClick } from '../../utils/functionsHelpers';
import styles from '../ComponentStyles.module.css';

function PopupInstructions() {
    return (
        <div className={styles.wrapper}>
            <i className={styles.noteInstructions}>
                <span
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    className={`${styles.grade} ${styles.underlineForPopup}`}
                >
                    underlined text
                    <span className={`${styles.gradeNotePopup}`}>Yup, just like that :).</span>
                </span>&nbsp;hides extra info
            </i>
        </div >
    )
}

export default PopupInstructions;