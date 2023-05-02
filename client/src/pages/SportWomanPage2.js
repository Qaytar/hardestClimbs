import { filterSends, rankClimbers } from '../utils/functionsHelpers';


//React component
function SportWomanPage2(props) {
    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, 'sport', 'woman')
    //calls rankClimbers to obtain the ranking of the climbers included in the filteredSends
    //Attention! this will return an array of 'send.climber' since it only has access to an array of the model Send
    const rankedClimbers = rankClimbers(filteredSends);
    console.log('rankedClimbers', rankedClimbers)

    // //creates an array of the names of the climbers included in the rankedClimbers to be able to filter the sends by climber name
    // const rankedClimbersNames = rankedClimbers.map((rankedClimber) => (
    //     rankedClimber.climber.name
    // ))

    // //uses such array to filter the sends climbed in the ranked list of climber
    // //This may seem unnecessary but rankClimbers() returns an array of objects of the model Send, in other words an array of send.climber so I can't access send.climber.send.route.name
    // //That's the reason I am using the return of rankClimbers() just as a reference to filter the sends in the filteredSends array. Tho it's also used to render the climber in the right order
    // const rankedClimbersSends = filteredSends.filter((send) => (
    //     rankedClimbersNames.includes(send.climber.name)
    // ))

    return (
        < div >
            <h1>SportWomanPage</h1>
            {rankedClimbers.map((rankedClimber, index) => (
                <p key={index}>
                    {rankedClimber.climber.name} - {
                        rankedClimber.sends.sport.map((route, index) => (<span key={index}>{route.name} ({route.grade})</span>))
                    }

                    {/* {rankedClimbersSends.map((send, index) => (
                        send.climber.name === rankedClimber.climber.name ? (<span key={index}>
                            {send.route.name} ({send.route.europeanGrade}, {send.date})
                        </span>) : null
                    ))} */}
                </p>
            ))
            }
        </div >

    )
}

export default SportWomanPage2;