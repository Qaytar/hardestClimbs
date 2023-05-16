import { filterSends, rankClimbers } from '../utils/functionsHelpers';
import styles from './ComponentStyles.module.css';
import RouteNameGrade from './sends-elements/RouteNameGrade';



function RankedClimberSends(props) {
    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender)
    //calls rankClimbers to obtain the ranking of the climbers included in the filteredSends
    const rankedClimbers = rankClimbers(filteredSends);
    console.log('rankedClimbers:', rankedClimbers);

    return (
        <div className={`container ${styles.send}`}>
            {rankedClimbers.map((rankedClimber, index) => (
                <div key={index}>
                    <div className={`row ${styles.rankClimber}`}>
                        <span>{rankedClimber.climber.name}</span>
                    </div>
                    <div className={`row ${styles.rankSend}`}>
                        {rankedClimber.sends[props.filter.discipline].map((route, index) => (
                            <div className='col-12' key={index}>
                                <RouteNameGrade
                                    EUGrade={route.europeanGrade}
                                    USGrade={route.americanGrade}
                                    isGradingSystem={props.isGradingSystem}
                                    discipline={props.filter.discipline}
                                    gender={props.filter.gender}
                                    note={route.note}
                                    routeName={route.name}
                                />
                                {index !== rankedClimber.sends[props.filter.discipline].length - 1 ? ', ' : ''}&nbsp;&nbsp;
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )

}

export default RankedClimberSends;