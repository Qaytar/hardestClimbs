import styles from '../ComponentStyles.module.css';
import { handleMouseEnter, handleMouseLeave } from '../../utils/functionsHelpers';
const { highestGrades } = require('../../utils/rankedGrades');

function RouteNameGrade(props) {
    return (
        <span
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`
                ${styles.grade}     
                ${(props.EUGrade.includes(' or ')) && styles.underlineForPopup}                             
                ${(highestGrades[props.discipline][props.gender].includes(props.EUGrade)) && styles.highestGrade}
            `}
        >
            {/* //Displays: route.name(route.grade) e.g. 'La Rambla(9a+)' or 'La Rambla(5.15a)' */}
            {props.routeName} ({props.isGradingSystem === 'american' ? props.USGrade : props.EUGrade})

            {/* //Displays a popup with the note if there is one */}
            {props.note && (<span className={styles.gradeNotePopup}>{props.note}</span>)}
        </span>
    )
}

export default RouteNameGrade;