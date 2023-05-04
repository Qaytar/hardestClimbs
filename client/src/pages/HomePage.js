import React, { useState } from 'react';
import styles from './HomePage.module.css';
import ChronologicalSends from '../components/ChronologicalSends';
import MainButton from '../components/ui/MainButton';
import Toggle from '../components/ui/Toggle';


function HomePage(props) {
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
            <Toggle
                onClickFunction={toggleGradeDisplay}
                isState={isGradingSystem}
                checkState={'american'}
                options={['european grades', 'american grades']}
            />

            <section className={styles.contentWrapper}>
                <div class="container text-center">
                    <h4 className='mt-5 mb-3'>Sport Climbing</h4>
                    <div class="row">
                        <div class="col-md">
                            <div className={styles.summaryTable}>
                                <h5>Woman</h5>
                                <ChronologicalSends filter={SportWomanFilter} data={props.data} isGradingSystem={isGradingSystem} />
                            </div>
                            <MainButton to={'/SportWoman'}>view more</MainButton>
                        </div>
                        <div class="col-md">
                            <div className={styles.summaryTable}>
                                <h5>Man</h5>
                                <ChronologicalSends filter={SportManFilter} data={props.data} isGradingSystem={isGradingSystem} />
                            </div>
                            <MainButton to={'/SportMan'}>view more</MainButton>
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
                            <MainButton to={'/BoulderMan'}>view more</MainButton>
                        </div>
                        <div class="col-md">
                            <div className={styles.summaryTable}>
                                <h5>Woman</h5>
                                <ChronologicalSends filter={BouldertWomanFilter} data={props.data} isGradingSystem={isGradingSystem} />
                            </div>
                            <MainButton to={'/BoulderWoman'}>view more</MainButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage;