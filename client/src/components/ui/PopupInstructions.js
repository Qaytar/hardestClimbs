import { filterSends, handleMouseEnter, handleMouseLeave, handleClick } from '../../utils/functionsHelpers';
import styles from '../ComponentStyles.module.css';




function PopupInstructions(props) {
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender, props.filter.limit);

    function checkIfNotes() {
        return (filteredSends.filter(send => send.route.note).length > 0) ? true : false;
    }

    console.log('checkIfNotes', checkIfNotes());
    return (
        <div className={styles.wrapper}>
            {checkIfNotes() ? (
                <i className={styles.noteInstructions}>
                    <span
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}
                        className={`${styles.grade} ${styles.underlineForPopup}`}
                    >
                        underlined grades
                        <span className={`${styles.gradeNotePopup}`}>Yup, just like that :).</span>
                    </span>&nbsp;hide extra info
                </i>
            ) : null
            }
        </div >
    )
}

export default PopupInstructions;