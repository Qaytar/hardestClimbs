import { handleMouseEnter, handleMouseLeave } from '../utils/functionsHelpers';
import styles from './ComponentStyles.module.css';


function PopupInstructions() {
    return (
        <div className={styles.wrapper}>
            <p>
                <i className={styles.noteInstructions}>
                    <span
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={`${styles.grade} ${styles.underlineForPopup}`}
                    >
                        underlined grades
                        <span className={`${styles.instrPopup} ${styles.gradeNotePopup}`}>Yup, just like that :).</span>
                    </span>&nbsp;hide extra info

                </i>
            </p>
        </div>
    )
}

export default PopupInstructions;