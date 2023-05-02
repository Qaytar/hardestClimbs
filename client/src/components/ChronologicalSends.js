import { filterSends, handleMouseEnter, handleMouseLeave } from '../utils/functionsHelpers';
import classes from './Sends.module.css';


function ChronologicalSends(props) {
    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender)

    return (
        <div>
            {
                filteredSends.map((send, index) => (
                    <p key={index}>
                        {send.route.name}
                        (<span className={classes.grade} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {props.isGradingSystem === 'american' ? send.route.americanGrade : send.route.europeanGrade}
                            {send.route.note && (<span className={classes.gradeNotePopup}>{send.route.note}</span>)}
                        </span>)
                        , by {send.climber.name} on {send.date}
                    </p>
                ))
            }
        </div>
    )

}

export default ChronologicalSends;