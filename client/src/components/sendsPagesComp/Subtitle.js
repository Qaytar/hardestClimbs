import styles from './Subtitle.module.css'
import { filterSends, countClimbers } from '../../utils/functionsHelpers';
import { highestGrades, AmericanHighestGrades, cutOffGrades, AmericanCutOffGrades } from '../../utils/rankedGrades';


function Subtitle(props) {

    const filteredSends = filterSends(props.data, props.filter.discipline, props.filter.gender);
    const climbersCount = countClimbers(filteredSends);
    const topClimbersCount = countClimbers(filteredSends, highestGrades[props.filter.discipline][props.filter.gender]);

    //storing values in variables to make JSX cleaner
    const HighestGrade = props.isGradingSystem === 'american' ? AmericanHighestGrades[props.filter.discipline][props.filter.gender][0] : highestGrades[props.filter.discipline][props.filter.gender][0];
    const CutOffGrade = props.isGradingSystem === 'american' ? AmericanCutOffGrades[props.filter.discipline][props.filter.gender][0] : cutOffGrades[props.filter.discipline][props.filter.gender][0];

    return (
        <div className={styles.subTitles}>
            <p>
                <i>
                    {`only ${climbersCount} athletes have climbed ${CutOffGrade} or harder,
                     of which, just ${topClimbersCount} climbed`}
                    <span className={styles.highestGrade}> {HighestGrade} </span>
                </i>
            </p>
        </div>
    );
}

export default Subtitle;