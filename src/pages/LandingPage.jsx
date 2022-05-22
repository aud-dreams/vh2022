// This is the landing page that will be shown when you
// first reach the page w/ a short description
import { React } from 'react';
// import { JournalBookmark } from 'react-bootstrap-icons';
import styles from './LandingPage.module.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import "fa-rocket from '@fortawesome/free-solid-svg-icons'
import { faRocket } from '@fortawesome/free-solid-svg-icons'

const LandingPage = () => {
    return (
        <div className={styles['landing-page-container']}>
            {/* <FontAwesomeIcon icon={faRocket} className={styles['rocket']}/> */}
            <div className={styles['page-title']}>commutr course</div>
            <div className={styles['peter-planner-desc']}>
                hi there! welcome to commutr course, the perfect planning tool for Petr the Commutr and any of his friends. just enter your classes and we’ll help you find the best schedule for minimizing days on campus and time between classes.
            </div>
            <div className={styles['peter-planner-link-container']}>
                {/* <JournalBookmark /> */}
                <Link to="/planner" className={styles['peter-planner-link']} src='images/petr_spaceship.png'>
                    <div className={styles['link-text']}>go to commutr course</div>
                    <FontAwesomeIcon icon={faRocket} className={styles['rocket']}/>
                    {/* <FontAwesomeIcon icon={faRocket} /> */}
                </Link>
            </div>
        </div>
    );     
};

export default LandingPage;