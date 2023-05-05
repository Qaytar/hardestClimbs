import { filterSends, handleMouseEnter, handleMouseLeave } from '../utils/functionsHelpers';
import styles from './ComponentStyles.module.css';




function PopupInstructions(props) {
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender, props.filter.limit);

    function checkIfNotes() {
        return (filteredSends.filter(send => send.route.note).length > 0) ? true : false;
    }

    console.log('checkIfNotes', checkIfNotes());
    return (
        <div className={styles.wrapper}>
            {checkIfNotes() ? (
                <p className={styles.send}>
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
            ) : null
            }
        </div >
    )
}

export default PopupInstructions;