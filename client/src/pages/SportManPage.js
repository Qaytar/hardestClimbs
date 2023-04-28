import React, { useState } from 'react';
import { filterSends } from '../utils/functionsHelpers';
import classes from './SportManPage.module.css';

function SportManPage(props) {
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


    return (
        <div>
            <button onClick={toggleGradeDisplay}>
                {isGradingSystem === 'american' ? 'Change to European Grades' : 'Change to American Grades'}
            </button>
            <h1>SportManPage</h1>
            {filterSends(props.data, 'sport', 'man').map((send, index) => (
                //this <p> needs to be a component <Send /> but I couldnt make it work because that file uses so many things: handleMouseEnter, handleMouseLeave,toggleGradeDisplay, etc.
                <p key={index}>
                    {send.route.name}
                    (<span className={classes.grade} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        {isGradingSystem === 'american' ? send.route.americanGrade : send.route.europeanGrade}
                        {send.route.note && (<span className={classes.gradeNotePopup}>{send.route.note}</span>)}
                    </span>)
                    , by {send.climber.name} on {send.date}
                </p>
            ))}
        </div>
    );
}

export default SportManPage;

