import { filterSends, handleMouseEnter, handleMouseLeave } from '../utils/functionsHelpers';
import styles from './ComponentStyles.module.css';
const { rankedEuropeanGrades } = require('../utils/rankedGrades');


function ChronologicalSends(props) {
    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender, props.filter.limit);
    const discipline = props.filter.discipline;
    const highestGrade = rankedEuropeanGrades[discipline][0];


    return (
        <div>
            {filteredSends.map((send, index) => (
                <p key={index}>
                    <span className={(send.route.europeanGrade === highestGrade) ? styles.highestGrade : ''}>
                        {send.route.name}&nbsp;
                    </span>
                    <span
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={`
                            ${styles.grade}     
                            ${(send.route.europeanGrade.includes(' or ')) && styles.underlineForPopup}                             
                            ${(send.route.europeanGrade === highestGrade) && styles.highestGrade}
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