import { filterSends } from '../utils/functionsHelpers';
import React, { useState, useEffect } from 'react';
function BoulderWomanPage(props) {
    //Scrolls to the top of the page when the component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <h1>BoulderWomanPage</h1>
            {filterSends(props.data, 'boulder', 'woman').map((send, index) => (
                <p key={index}>
                    {send.route.name} ({send.route.europeanGrade}), by {send.climber.name} on {send.date}
                </p>
            ))}
        </div>
    )
}

export default BoulderWomanPage;