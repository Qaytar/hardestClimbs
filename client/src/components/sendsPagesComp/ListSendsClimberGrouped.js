import { filterSends, rankClimbers } from '../../utils/functionsHelpers';
import styles from './ListSendsClimberGrouped.module.css';
import RouteNameGrade from './sendsItems/RouteNameGrade';



function ListSendsClimberGrouped(props) {
    // calls filteredSend to obtain the sub set off all the sends relevant to the page
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender)
    // calls rankClimbers to obtain an array climbers ranked by their climbs
    const rankedClimbers = rankClimbers(filteredSends);

    //returns JSX rendering a list of climbers (and their sends) ranked by climber achievements
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
                                {index !== rankedClimber.sends[props.filter.discipline].length - 1 ? ', ' : ''}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )

}

export default ListSendsClimberGrouped;