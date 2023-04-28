import React, { useState } from 'react';
import filterSends from '../utils/filterSends';
import classes from './SportManPage.module.css';

function SportManPage(props) {
    //re write it in terms of european-american instead of american true or false
    const [isAmericanGrade, setIsAmericanGrade] = useState(false);

    //this 3 functions need to shipped to utils>helperFunctions.js (where filterSends should be too)
    const toggleGradeDisplay = () => {
        setIsAmericanGrade(!isAmericanGrade);
    };

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
                {isAmericanGrade ? 'Display European Grade' : 'Display American Grade'}
            </button>
            <h1>SportManPage</h1>
            {filterSends(props.data, 'sport', 'man').map((send, index) => (
                //this <p> needs to be a component
                <p key={index}>
                    {send.route.name}
                    (
                    <span className={classes.grade} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        {isAmericanGrade ? send.route.americanGrade : send.route.europeanGrade}
                        {send.route.note && (<span className={classes.gradeNotePopup}>{send.route.note}</span>)}
                    </span>
                    ), by {send.climber.name} on {send.date}
                </p>
            ))}
        </div>
    );
}

export default SportManPage;

