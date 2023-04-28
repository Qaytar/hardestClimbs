import filterSends from '../utils/filterSends';
function BoulderManPage(props) {
    return (
        <div>
            <h1>BoulderManPage</h1>
            {filterSends(props.data, 'boulder', 'man').map((send, index) => (
                <p key={index}>
                    {send.route.name} ({send.route.europeanGrade}), by {send.climber.name} on {send.date}
                </p>
            ))}
        </div>
    )
}

export default BoulderManPage;