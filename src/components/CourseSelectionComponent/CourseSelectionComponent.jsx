import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styles from './CourseSelectionComponent.module.css';
import CourseInputComponent from '../courseInputComponent/CourseInputComponent';

const CourseSelectionComponent = ({ courses, setCourses}) => {
    // courses will be an array of 3 nested arrays of all the courses
    // ex: [["ICS", "45C"], ["ICS", "6D"], ["SOCIOL", "1"]]
    const [course1, setCourse1] = useState(['', '']);
    const [course2, setCourse2] = useState(['', '']);
    const [course3, setCourse3] = useState(['', '']);

    // const [courseUpdated, setCourseUpdated] = useState(0);

    useEffect(() => {
        setCourses([course1, course2, course3]);
        // (course1, course2, course3);console.log
    }
    ,[course1, course2, course3, setCourses]);

    // setCourses([course1, course2, course3]);

    return (
        <div className={styles['course-selection-component-container']}>
            <CourseInputComponent
                classNum={1}
                course={course1}
                setCourse={setCourse1}
                // courseUpdated={courseUpdated}
                // setCourseUpdated={setCourseUpdated}
                className={styles['course-1']}
            />
            <CourseInputComponent
                classNum={2}
                course={course2}
                setCourse={setCourse2}
                // courseUpdated={courseUpdated}
                // setCourseUpdated={setCourseUpdated}
                className={styles['course-2']}
            />
            <CourseInputComponent
                classNum={3}
                course={course3}
                setCourse={setCourse3}
                // courseUpdated={courseUpdated}
                // setCourseUpdated={setCourseUpdated}
                className={styles['course-3']}
            />
        </div>
    );
}

CourseSelectionComponent.propTypes ={
    courses: PropTypes.array.isRequired,
    setCourses: PropTypes.func.isRequired,
}

export default CourseSelectionComponent;