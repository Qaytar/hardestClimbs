import { filterSends } from '../../utils/functionsHelpers';
import styles from './ListSendsChronological.module.css';
import RouteNameGrade from './sendsItems/RouteNameGrade';
import Date from './sendsItems/Date';

function ListSendsChronological(props) {
    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender, props.filter.limit);

    return (
        <div className="container">
            {filteredSends.map((send, index) => (
                <div key={index} className={`row ${styles.chronoRow}`}>
                    <div className={`col-md-6 ${styles.chronoNameGrade} ${styles.send}`}>
                        <RouteNameGrade
                            EUGrade={send.route.europeanGrade}
                            USGrade={send.route.americanGrade}
                            isGradingSystem={props.isGradingSystem}
                            discipline={props.filter.discipline}
                            gender={props.filter.gender}
                            note={send.route.note}
                            routeName={send.route.name}
                        />
                    </div>
                    <div className={`col-md-6 ${styles.chronoAuthorDate} ${styles.send}`}>
                        by {send.climber.name} on <Date date={send.date} />
                    </div>
                </div>
            ))}
        </div>
    )

}

export default ListSendsChronological;