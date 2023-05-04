import { filterSends, handleMouseEnter, handleMouseLeave } from '../utils/functionsHelpers';
import styles from './ComponentStyles.module.css';
const { highestGrades } = require('../utils/rankedGrades');


function ChronologicalSends(props) {
    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender, props.filter.limit);

    return (
        <div>
            {filteredSends.map((send, index) => (
                <p key={index}>
                    {console.log('a', highestGrades[props.filter.discipline][props.filter.gender])}
                    <span className={(highestGrades[props.filter.discipline][props.filter.gender].includes(send.route.europeanGrade)) && styles.highestGrade}>
                        {send.route.name}&nbsp;
                    </span>
                    <span
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={`
                            ${styles.grade}     
                            ${(send.route.europeanGrade.includes(' or ')) && styles.underlineForPopup}                             
                            ${(highestGrades[props.filter.discipline][props.filter.gender].includes(send.route.europeanGrade)) && styles.highestGrade}
                        `}
                    >
                        ({props.isGradingSystem === 'american' ? send.route.americanGrade : send.route.europeanGrade})
                        {send.route.note && (<span className={styles.gradeNotePopup}>{send.route.note}</span>)}
                    </span>
                    &nbsp; - &nbsp;&nbsp;
                    by {send.climber.name} on <span className={styles.chronoDate}>{send.date}</span>
                </p>
            ))}
        </div>
    )

}

export default ChronologicalSends;