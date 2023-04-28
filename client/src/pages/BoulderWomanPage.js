import { filterSends } from '../utils/functionsHelpers';
function BoulderWomanPage(props) {
    return (
        <div>
            <h1>BoulderWomanPage</h1>
            {filterSends(props.data, 'boulder', 'woman').map((send, index) => (
                <p key={index}>
                    {send.route.name} ({send.route.europeanGrade}), by {send.climber.name} on {send.date}
                </p>
            ))}
        </div>
    )
}

export default BoulderWomanPage;