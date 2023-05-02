import React, { useState } from 'react';
import ChronologicalSends from '../components/ChronologicalSends';
import RankedClimberSends from '../components/RankedClimberSends';

function SportManPage(props) {
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
            <button onClick={toggleGradeDisplay}>
                {isGradingSystem === 'american' ? 'Change to European Grades' : 'Change to American Grades'}
            </button>
            <button onClick={toggleDisplayData}>
                {isDisplayData === 'chronological' ? 'Change to grouped by climber' : 'Change to chronological order'}
            </button>
            <h1>SportManPage</h1>
            {
                isDisplayData === 'chronological' ? (
                    <ChronologicalSends filter={filter} data={props.data} isGradingSystem={isGradingSystem} />
                ) : (
                    <RankedClimberSends filter={filter} data={props.data} isGradingSystem={isGradingSystem} />
                )
            }

        </div>
    );
}

export default SportManPage;

