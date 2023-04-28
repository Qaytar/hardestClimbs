import { filterSends } from '../utils/functionsHelpers';
function SportWomanPage(props) {
    return (
        <div>
            <h1>SportWomanPage</h1>
            {filterSends(props.data, 'sport', 'woman').map((send, index) => (
                <p key={index}>
                    {send.route.name} ({send.route.europeanGrade}), by {send.climber.name} on {send.date}
                </p>
            ))}
        </div>
    )
}

export default SportWomanPage;