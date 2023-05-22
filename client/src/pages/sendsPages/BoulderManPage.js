import React, { useEffect } from 'react';
import SendsPagesLayout from '../../components/SendsPagesLayout';

function BoulderManPage(props) {
    // Scrolls to the top of the page when the component is mounted
    // This is helpful if the user has scrolled down on the previous page and then navigates to this one
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filter object to pass as props to the SendsPagesLayout component
    const filter = { discipline: 'boulder', gender: 'man' }

    return (
        <div>
            // SendsPagesLayout component handles the display of the sends data
            <SendsPagesLayout data={props.data} filter={filter} />
        </div>
    );
}

export default BoulderManPage;
