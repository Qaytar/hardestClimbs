import { filterSends, rankClimbers, handleMouseEnter, handleMouseLeave } from '../utils/functionsHelpers';
import classes from './Sends.module.css';


function RankedClimberSends(props) {
    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender)
    //calls rankClimbers to obtain the ranking of the climbers included in the filteredSends
    const rankedClimbers = rankClimbers(filteredSends);

    return (
        <div>
            {
                rankedClimbers.map((rankedClimber, index) => (
                    <p key={index}>
                        {rankedClimber.climber.name} - {
                            rankedClimber.sends.sport.map((route, index) => (
                                <span key={index}>
                                    {route.name}
                                    <span className={classes.grade} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                        ({props.isGradingSystem === 'american' ? route.americanGrade : route.europeanGrade})
                                        {route.note && (<span className={classes.gradeNotePopup}>{route.note}</span>)}
                                    </span>
                                </span>))
                        }
                    </p>
                ))
            }
        </div>
    )

}

export default RankedClimberSends;