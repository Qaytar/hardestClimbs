import { filterSends, rankClimbers } from '../utils/functionsHelpers';


//React component
function SportWomanPage2(props) {
    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, 'sport', 'woman')
    //calls rankClimbers to obtain the ranking of the climbers included in the filteredSends
    //Attention! ChatGPT coded rankClimbers in a way that returns an array of objects with Climbers on it and then Sends. Within Sends, u got Sports and Boulders and then the details. I don't like it, I 'd rather put all send-details straight but will leave it like this for now.
    const rankedClimbers = rankClimbers(filteredSends);
    console.log('rankedClimbers', rankedClimbers)

    return (
        < div >
            <h1>SportWomanPage</h1>
            {rankedClimbers.map((rankedClimber, index) => (
                <p key={index}>
                    {rankedClimber.climber.name} - {
                        rankedClimber.sends.sport.map((route, index) => (<span key={index}>{route.name} ({route.europeanGrade})</span>))
                    }
                </p>
            ))
            }
        </div >

    )
}

export default SportWomanPage2;