import { filterSends, rankClimbers, handleMouseEnter, handleMouseLeave } from '../utils/functionsHelpers';
import styles from './ComponentStyles.module.css';
const { highestGrades } = require('../utils/rankedGrades');


function RankedClimberSends(props) {
    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender)
    //calls rankClimbers to obtain the ranking of the climbers included in the filteredSends
    const rankedClimbers = rankClimbers(filteredSends);

    return (
        <div>
            {rankedClimbers.map((rankedClimber, index) => (
                <div key={index}>
                    <p className={styles.rankClimber}>{rankedClimber.climber.name}</p>
                    <p className={styles.rankSend}>
                        {rankedClimber.sends[props.filter.discipline].map((route, index) => (
                            <span key={index}>
                                <span className={(highestGrades[props.filter.discipline][props.filter.gender].includes(route.europeanGrade)) && styles.highestGrade}>
                                    {route.name}
                                </span>&nbsp;
                                <span
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className={` 
                                        ${styles.grade} 
                                        ${(highestGrades[props.filter.discipline][props.filter.gender].includes(route.europeanGrade)) && styles.highestGrade}
                                        ${(route.europeanGrade.includes(' or ')) && styles.underlineForPopup} 
                                    `}
                                >
                                    ({props.isGradingSystem === 'american' ? route.americanGrade : route.europeanGrade})
                                    {route.note && (<span className={styles.gradeNotePopup}>{route.note}</span>)}
                                </span>
                                {index !== rankedClimber.sends[props.filter.discipline].length - 1 ? ', ' : ''}&nbsp;&nbsp;
                            </span>
                        ))}
                    </p>
                </div>
            ))}
        </div>
    )

}

export default RankedClimberSends;