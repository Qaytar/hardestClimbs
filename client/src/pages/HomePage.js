import React, { useState, useRef } from 'react';
import styles from './HomePage.module.css';
import ListSendsChronological from '../components/sendsPagesComp/ListSendsChronological';
import MainButton from '../components/ui/MainButton';
import Toggle from '../components/ui/Toggle';
import NavBar from '../components/ui/NavBar';

function HomePage(props) {
    // Tracks the grading system (European or American)
    const [isGradingSystem, setIsGradingSystem] = useState('european');

    // Toggles the grading system when clicked
    const toggleGradeDisplay = () => {
        setIsGradingSystem(isGradingSystem === 'european' ? 'american' : 'european');
    };

    // Ref for the Toggle component to scroll to when button is clicked
    const imageRef = useRef(null);

    // Scrolls down untill the main image is out of view
    const executeScroll = () => {
        // window.pageYOffset returns the number of pixels that the document has already been scrolled vertically from the top. 
        const currentScrollPosition = window.pageYOffset;

        // getBoundingClientRect().bottom provides the distance from the top of the viewport to the bottom of the element.
        const imageRefBottomPosition = imageRef.current.getBoundingClientRect().bottom;

        // adding the current scroll position and the position of the imageRef's
        const y = currentScrollPosition + imageRefBottomPosition;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }



    // Filter objects to pass as props to the ListSendsChronological component
    const SportWomanFilter = { discipline: 'sport', gender: 'woman', limit: 3 }
    const SportManFilter = { discipline: 'sport', gender: 'man', limit: 3 }
    const BouldertManFilter = { discipline: 'boulder', gender: 'man', limit: 3 }
    const BouldertWomanFilter = { discipline: 'boulder', gender: 'woman', limit: 3 }

    // Returns JSX elements to be rendered on the HomePage

    return (
        <div>
            <section ref={imageRef}>
                <div className={styles.image}>
                    <NavBar />
                    <button onClick={executeScroll} className={styles.landPageBtn}>discover</button>
                </div>
            </section>
            <div>
                <Toggle
                    onClickFunction={toggleGradeDisplay}
                    isState={isGradingSystem}
                    checkState={'american'}
                    options={['european grades', 'american grades']}
                />
            </div>
            <div className={styles.centerH1}>
                <h1>Up to date registry of the world's hardest climbs</h1>
            </div>
            <section className={styles.contentWrapper}>
                <div className="container text-center">
                    <h4>Sport Climbing</h4>
                    <div className="row">
                        <div className="col-md">
                            <div className={styles.summaryTable}>
                                <h5>Woman</h5>
                                <ListSendsChronological filter={SportWomanFilter} data={props.data} isGradingSystem={isGradingSystem} />
                            </div>
                            <MainButton to={'/SportWoman'}>view more</MainButton>
                        </div>
                        <div className={`col-md ${styles.secondTable}`}>
                            <div className={styles.summaryTable}>
                                <h5>Man</h5>
                                <ListSendsChronological filter={SportManFilter} data={props.data} isGradingSystem={isGradingSystem} />
                            </div>
                            <MainButton to={'/SportMan'}>view more</MainButton>
                        </div>
                    </div>

                    <h4>Bouldering</h4>
                    <div className="row">
                        <div className="col-md">
                            <div className={styles.summaryTable}>
                                <h5>Man</h5>
                                <ListSendsChronological filter={BouldertManFilter} data={props.data} isGradingSystem={isGradingSystem} />
                            </div>
                            <MainButton to={'/BoulderMan'}>view more</MainButton>
                        </div>
                        <div className={`col-md ${styles.secondTable}`}>
                            <div className={styles.summaryTable}>
                                <h5>Woman</h5>
                                <ListSendsChronological filter={BouldertWomanFilter} data={props.data} isGradingSystem={isGradingSystem} />
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
