import React, { useState, useContext } from 'react';
import ListSendsChronological from './sendsPagesComp/ListSendsChronological';
import ListSendsClimberGrouped from './sendsPagesComp/ListSendsClimberGrouped';
import PopupInstructions from './sendsPagesComp/PopupInstructions';
import Subtitle from './sendsPagesComp/Subtitle';
import FAQ from './sendsPagesComp/FAQ';
import Toggle from './ui/Toggle';
import NavBar from './ui/NavBar';
import styles from './SendsPagesLayout.module.css'
import { FAQcontext } from '../App.js';


function SendsPagesLayout(props) {
    const faqData = useContext(FAQcontext);

    // State variable to control the display of the data, either grouped by climber or in chronological order.
    const [isDisplayData, setIsDisplayData] = useState('byClimber');

    // Function to toggle the display of the data when the related button is clicked
    const toggleDisplayData = () => {
        setIsDisplayData(isDisplayData === 'chronological' ? 'byClimber' : 'chronological');
    };

    // State variable to keep track of the grading system being used, either European or American.
    const [isGradingSystem, setIsGradingSystem] = useState('european');

    // Function to toggle the grading system when the related button is clicked
    const toggleGradeDisplay = () => {
        setIsGradingSystem(isGradingSystem === 'european' ? 'american' : 'european');
    };

    // Generate the title of the page based on the filter props
    const title = `Hardest ${props.filter.discipline} climbs (${props.filter.gender})`;

    // Variable for styling the banner based on the discipline
    const banner = `${props.filter.discipline}Banner`;

    // Returns in JSX the layout for the sends pages
    return (
        <div>
            <div className={styles[banner]}>
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

            <div>
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