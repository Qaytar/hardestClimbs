import React, { useEffect } from 'react';
import SendsPagesLayout from '../../components/SendsPagesLayout';

function BoulderManPage(props) {

    //Scrolls to the top of the page when the component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filter = { discipline: 'boulder', gender: 'man' }

    return (
        <div>
            <SendsPagesLayout data={props.data} filter={filter} />
        </div>
    );
}

export default BoulderManPage;