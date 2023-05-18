import Popup from '../../ui/Popup';
const { highestGrades } = require('../../../utils/rankedGrades');


function RouteNameGrade(props) {
    const popupContent = props.note
    const className = (highestGrades[props.discipline][props.gender].includes(props.EUGrade)) && 'highestGrade'

    return (
        <Popup
            popupContent={popupContent}
            styles={className}
        >
            {/* //Displays name and grade like: 'La Rambla(9a+)' or 'La Rambla(5.15a)' */}
            {props.routeName} ({props.isGradingSystem === 'american' ? props.USGrade : props.EUGrade})
        </Popup>
    )
}

export default RouteNameGrade;