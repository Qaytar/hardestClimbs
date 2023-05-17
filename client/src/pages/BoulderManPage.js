import React, { useState, useEffect } from 'react';
import ChronologicalSends from '../components/ChronologicalSends';
import RankedClimberSends from '../components/RankedClimberSends';
import Toggle from '../components/ui/Toggle';
import PopupInstructions from '../components/ui/PopupInstructions';
import NavBar from '../components/layout/NavBar';
import styles from './bannerPage.module.css';
import PagesSubtitles from '../components/PagesSubtitles';
import FAQ from '../components/FAQ';

function BoulderManPage(props) {
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

    const filter = { discipline: 'boulder', gender: 'man' }


    return (
        <div>
            <div className={styles.boulderBanner}>
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
            </div>
            <h1>Hard Boulder Climbs (Man)</h1>
            <PagesSubtitles filter={filter} data={props.data} isGradingSystem={isGradingSystem} />
            {isDisplayData === 'chronological' ? (
                <ChronologicalSends filter={filter} data={props.data} isGradingSystem={isGradingSystem} />
            ) : (
                <RankedClimberSends filter={filter} data={props.data} isGradingSystem={isGradingSystem} />
            )}
            <div>
                <FAQ filter={'boulderMan'} isGradingSystem={isGradingSystem} />
            </div>
        </div>
    );
}

export default BoulderManPage;