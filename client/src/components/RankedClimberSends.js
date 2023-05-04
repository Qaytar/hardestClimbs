import { filterSends, rankClimbers, handleMouseEnter, handleMouseLeave } from '../utils/functionsHelpers';
import styles from './Sends.module.css';
const { rankedEuropeanGrades } = require('../utils/rankedGrades');


function RankedClimberSends(props) {
    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender)
    //calls rankClimbers to obtain the ranking of the climbers included in the filteredSends
    const rankedClimbers = rankClimbers(filteredSends);

    const discipline = props.filter.discipline;
    const highestGrade = rankedEuropeanGrades[discipline][0];
    return (
        <div>
            {rankedClimbers.map((rankedClimber, index) => (
                <div key={index}>
                    <p className={styles.rankClimber}>{rankedClimber.climber.name}</p>
                    <p className={styles.rankSend}>
                        {rankedClimber.sends.sport.map((route, index) => (
                            <span key={index}>
                                <span className={(route.europeanGrade === highestGrade) ? styles.highestGrade : ''}>
                                    {route.name}
                                </span>&nbsp;
                                <span
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className={` 
                                        ${styles.grade} 
                                        ${(route.europeanGrade === highestGrade) && styles.highestGrade}
                                        ${(route.europeanGrade.includes(' or ')) && styles.underlineForPopup} 
                                    `}
                                >
                                    ({props.isGradingSystem === 'american' ? route.americanGrade : route.europeanGrade})
                                    {route.note && (<span className={styles.gradeNotePopup}>{route.note}</span>)}
                                </span>
                                {index !== rankedClimber.sends.sport.length - 1 ? ', ' : ''}&nbsp;&nbsp;
                            </span>
                        ))}
                    </p>
                </div>
            ))}
        </div>
    )

}

export default RankedClimberSends;