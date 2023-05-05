import { filterSends } from '../utils/functionsHelpers';
import styles from './ComponentStyles.module.css';
import RouteNameGrade from './sends-elements/RouteNameGrade';
import Date from './sends-elements/Date';

function ChronologicalSends(props) {
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
                        by {send.climber.name} on <Date date={send.date} className={styles.chronoDate} />
                    </div>
                </div>
            ))}
        </div>
    )

}

//to do for next day. Style this component by having those 2 div-col have the size match exactly its content, then place them side by side also same height and u should be good. And then let it break to the next line on phones
//will have to get rid of the current styles of those 2 divs, they make it seem like differnt heights
//because they're no long <p> they lost their styling (color, font-wieght, etc.)

export default ChronologicalSends;