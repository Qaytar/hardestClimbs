import React, { useState } from 'react';
import { filterSends, rankClimbers } from '../utils/functionsHelpers';
import classes from './SportManPage.module.css';

function SportManPage(props) {
    //Create a state variavle to display sends chronologicaly or grouped be ranked climbers
    const [isDisplayData, setDisplayData] = useState('chronological');
    //Creates a function to toggle the display of the data, it's called when the button is clicked
    const toggleDisplayData = () => {
        setDisplayData(isDisplayData === 'chronological' ? 'byClimber' : 'chronological');
    };

    //Creates a state variable to track whether the grading system is European or American
    const [isGradingSystem, setisGradingSystem] = useState('european');
    //Creates a function to toggle the grading system, it's called when the button is clicked
    const toggleGradeDisplay = () => {
        setisGradingSystem(isGradingSystem === 'european' ? 'american' : 'european');
    };

    //two functions to handle the hover effect over the grade to display the note
    const handleMouseEnter = (event) => {
        const popup = event.target.querySelector(`.${classes.gradeNotePopup}`);
        if (popup) {
            popup.style.display = 'block';
        }
    };
    const handleMouseLeave = (event) => {
        const popup = event.target.querySelector(`.${classes.gradeNotePopup}`);
        if (popup) {
            popup.style.display = 'none';
        }
    };

    //calls filteredSend to obtain the sub set off all the sends relevant to this page
    const filteredSends = filterSends(props.data, 'sport', 'man')
    //calls rankClimbers to obtain the ranking of the climbers included in the filteredSends
    const rankedClimbers = rankClimbers(filteredSends);
    console.log('rankedClimbers', rankedClimbers)
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
                    filteredSends.map((send, index) => (
                        <p key={index}>
                            {send.route.name}
                            (<span className={classes.grade} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                {isGradingSystem === 'american' ? send.route.americanGrade : send.route.europeanGrade}
                                {send.route.note && (<span className={classes.gradeNotePopup}>{send.route.note}</span>)}
                            </span>)
                            , by {send.climber.name} on {send.date}
                        </p>
                    ))
                ) : (
                    rankedClimbers.map((rankedClimber, index) => (
                        <p key={index}>
                            {rankedClimber.climber.name} - {
                                rankedClimber.sends.sport.map((route, index) => (
                                    <span key={index}>
                                        {route.name}
                                        <span className={classes.grade} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                            ({isGradingSystem === 'american' ? route.americanGrade : route.europeanGrade})
                                            {route.note && (<span className={classes.gradeNotePopup}>{route.note}</span>)}
                                        </span>
                                    </span>))
                            }
                        </p>
                    ))
                )
            }

        </div>
    );
}

export default SportManPage;

