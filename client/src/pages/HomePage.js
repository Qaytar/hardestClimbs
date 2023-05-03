import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { filterSends } from '../utils/functionsHelpers';
import styles from './HomePage.module.css';
import ChronologicalSends from '../components/ChronologicalSends';


function HomePage(props) {
    //Create a state variavle to display sends chronologicaly or grouped be ranked climbers
    const [isDisplayData, setIsDisplayData] = useState('chronological');
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

    const SportWomanFilter = { discipline: 'sport', gender: 'woman', limit: 3 }
    const SportManFilter = { discipline: 'sport', gender: 'man', limit: 3 }
    const BouldertManFilter = { discipline: 'boulder', gender: 'man', limit: 3 }
    const BouldertWomanFilter = { discipline: 'boulder', gender: 'woman', limit: 3 }
    return (
        <div>
            <section>
                <div className={styles.image}>
                    <img src='https://57hours.com/wp-content/uploads/2019/04/climbing-header-4-1920x600.jpg' />
                </div>
            </section>
            <button onClick={toggleGradeDisplay}>
                {isGradingSystem === 'american' ? 'Change to European Grades' : 'Change to American Grades'}
            </button>
            <section className={styles.contentWrapper}>
                <div class="container text-center">
                    <h4 className='mt-5 mb-3'>Sport Climbing</h4>
                    <div class="row">
                        <div class="col-md">
                            <div className={styles.summaryTable}>
                                <h5>Woman</h5>
                                <ChronologicalSends filter={SportWomanFilter} data={props.data} isGradingSystem={isGradingSystem} />
                            </div>
                        </div>
                        <div class="col-md">
                            <div className={styles.summaryTable}>
                                <h5>Man</h5>
                                <ChronologicalSends filter={SportManFilter} data={props.data} isGradingSystem={isGradingSystem} />
                            </div>
                        </div>
                    </div>
                    <hr className={styles.gradientLine} />
                    <h4 className='mt-5 mb-3'>Bouldering</h4>
                    <div class="row">
                        <div class="col-md">
                            <div className={styles.summaryTable}>
                                <h5>Man</h5>
                                <ChronologicalSends filter={BouldertManFilter} data={props.data} isGradingSystem={isGradingSystem} />
                            </div>
                        </div>
                        <div class="col-md">
                            <div className={styles.summaryTable}>
                                <h5>Woman</h5>
                                <ChronologicalSends filter={BouldertWomanFilter} data={props.data} isGradingSystem={isGradingSystem} />
                            </div>
                        </div>
                    </div>
                </div>





            </section>
        </div>
    )
}

export default HomePage;