import React, { useState, useEffect } from 'react';
import ChronologicalSends from '../components/ChronologicalSends';
import RankedClimberSends from '../components/RankedClimberSends';
import Toggle from '../components/ui/Toggle';
import styles from './fourMainPages.module.css'
import popupStyles from '../components/Sends.module.css'
import { handleMouseEnter, handleMouseLeave } from '../utils/functionsHelpers';

function SportManPage(props) {
    //Scrolls to the top of the page when the component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //Create a state variavle to display sends chronologicaly or grouped be ranked climbers
    const [isDisplayData, setIsDisplayData] = useState('chronological');
    //Creates a function to toggle the display of the data, it's called when the button is clicked
    const toggleDisplayData = () => {
        setIsDisplayData(isDisplayData === 'chronological' ? 'byClimber' : 'chronological');
    };

    //Creates a state variable to track whether the grading system is European or American
    const [isGradingSystem, setIsGradingSystem] = useState('european');
    //Creates a function to toggle the grading system, it's called when the button is clicked
    const toggleGradeDisplay = () => {
        setIsGradingSystem(isGradingSystem === 'european' ? 'american' : 'european');
    };

    const filter = { discipline: 'sport', gender: 'man' }
    return (
        <div>
            <Toggle
                onClickFunction={toggleGradeDisplay}
                isState={isGradingSystem}
                checkState={'american'}
                options={['european grades', 'american grades']}
            />
            <Toggle
                onClickFunction={toggleDisplayData}
                isState={isDisplayData}
                checkState={'chronological'}
                options={['grouped by climber', 'chronological order']}
            />
            <div className={styles.wrapper}>
                <p>
                    <i className={styles.noteInstructions}>
                        <span
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={`${popupStyles.grade} ${popupStyles.underlineForPopup}`}
                        >
                            underlined grades
                            <span className={`${popupStyles.instrPopup} ${popupStyles.gradeNotePopup}`}>Yup, just like that :).</span>
                        </span> &nbsp; hide extra info

                    </i>
                </p>
            </div>

            <h1>Hard Sport Climbs (Man)</h1>
            {isDisplayData === 'chronological' ? (
                <ChronologicalSends filter={filter} data={props.data} isGradingSystem={isGradingSystem} />
            ) : (
                <RankedClimberSends filter={filter} data={props.data} isGradingSystem={isGradingSystem} />
            )}
        </div>
    );
}

export default SportManPage;

