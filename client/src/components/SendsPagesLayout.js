import React, { useState } from 'react';
import ListSendsChronological from './sendsPagesComp/ListSendsChronological';
import ListSendsClimberGrouped from './sendsPagesComp/ListSendsClimberGrouped';
import PopupInstructions from './sendsPagesComp/PopupInstructions';
import Subtitle from './sendsPagesComp/Subtitle';
import FAQ from './sendsPagesComp/FAQ';
import Toggle from './ui/Toggle';
import NavBar from './ui/NavBar';
import styles from '../pages/sendsPages/bannerPage.module.css'


function SendsPagesLayout(props) {

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

    const title = `Hard ${props.filter.discipline} climbs (${props.filter.gender})`;
    return (
        <div>
            <div className={styles.boulderBanner}>
                <NavBar />
            </div>

            <div className="ui">
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

            <div className="content">
                <h1>{title}</h1>
                <Subtitle filter={props.filter} data={props.data} isGradingSystem={isGradingSystem} />

                <div>
                    {isDisplayData === 'chronological' ? (
                        <ListSendsChronological filter={props.filter} data={props.data} isGradingSystem={isGradingSystem} />
                    ) : (
                        <ListSendsClimberGrouped filter={props.filter} data={props.data} isGradingSystem={isGradingSystem} />
                    )}
                </div>

                <div>
                    <FAQ filter={props.filter} isGradingSystem={isGradingSystem} />
                </div>
            </div>
        </div>
    )
}

export default SendsPagesLayout;