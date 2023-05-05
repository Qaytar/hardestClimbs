import { filterSends, rankClimbers } from '../utils/functionsHelpers';
import styles from './ComponentStyles.module.css';
import RouteNameGrade from './sends-elements/RouteNameGrade';



function RankedClimberSends(props) {
    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender)
    //calls rankClimbers to obtain the ranking of the climbers included in the filteredSends
    const rankedClimbers = rankClimbers(filteredSends);

    return (
        <div>
            {rankedClimbers.map((rankedClimber, index) => (
                <div key={index}>
                    <p className={styles.rankClimber}>
                        {rankedClimber.climber.name}
                    </p>
                    <p className={styles.rankSend}>
                        {rankedClimber.sends[props.filter.discipline].map((route, index) => (
                            <span key={index}>
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
                            </span>
                        ))}
                    </p>
                </div>
            ))}
        </div>
    )

}

export default RankedClimberSends;