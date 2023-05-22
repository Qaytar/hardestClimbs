import Popup from '../../ui/Popup';
const { highestGrades } = require('../../../utils/rankedGrades');


function RouteNameGrade(props) {
    // some routes have a note, which is displayed in a popup
    const popupContent = props.note

    // if the grade is the highest grade, add a class to style it differently
    const className = (highestGrades[props.discipline][props.gender].includes(props.EUGrade)) && 'highestGrade'

    return (
        <Popup
            popupContent={popupContent}
            styles={className}
        >
            {props.routeName} ({props.isGradingSystem === 'american' ? props.USGrade : props.EUGrade})
        </Popup>
    )
}

export default RouteNameGrade;