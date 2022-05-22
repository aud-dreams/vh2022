import { React } from 'react';
import { PropTypes } from 'prop-types';
import styles from './CourseInfoComponent.module.css'

const CourseInfoComponent = ({courseTitle, instructor, when, where, sectionCode, sectionType, changing}) => {
    return (
        <div className={ !changing ?
            styles['course-info-component-container'] : styles['course-info-component-container-changing']}>
            <div className={styles['course-logistics']}>
                <div className={styles['individual-info']}><b>course title: </b>{sectionType}: {courseTitle}</div> 
                <div className={styles['individual-info']}><b>instructor: </b>{instructor}</div>
                <div className={styles['individual-info']}><b>when: </b>{when}</div>
                <div className={styles['individual-info']}><b>where: </b>{where}</div>
                <div className={styles['individual-info']}><b>course code: </b>{sectionCode}</div>
            </div>
        </div>
    )
}

CourseInfoComponent.propTypes = {
    courseTitle: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    when: PropTypes.string.isRequired,
    where: PropTypes.string.isRequired,
}

export default CourseInfoComponent;