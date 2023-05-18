import React, { useState, useEffect } from 'react';
import ListSendsChronological from '../../components/sendsPagesComp/ListSendsChronological';
import ListSendsClimberGrouped from '../../components/sendsPagesComp/ListSendsClimberGrouped';
import Toggle from '../../components/ui/Toggle';
import PopupInstructions from '../../components/sendsPagesComp/PopupInstructions';
import NavBar from '../../components/ui/NavBar';
import styles from './bannerPage.module.css';
import Subtitle from '../../components/sendsPagesComp/Subtitle';
import FAQ from '../../components/sendsPagesComp/FAQ';

function SportManPage(props) {
    //Scrolls to the top of the page when the component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    //Create a state variavle to display sends chronologicaly or grouped be ranked climbers
    const [isDisplayData, setIsDisplayData] = useState('byClimber');
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
            <div className={styles.sportBanner}>
                <NavBar />
            </div>
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
                <PopupInstructions />
                <h1>Hard Sport Climbs (Man)</h1>
                <Subtitle filter={filter} data={props.data} isGradingSystem={isGradingSystem} />
            </div>
            {isDisplayData === 'chronological' ? (
                <ListSendsChronological filter={filter} data={props.data} isGradingSystem={isGradingSystem} />
            ) : (
                <ListSendsClimberGrouped filter={filter} data={props.data} isGradingSystem={isGradingSystem} />
            )}

            <div>
                <FAQ filter={filter} isGradingSystem={isGradingSystem} />
            </div>

        </div>
    );
}

export default SportManPage;

