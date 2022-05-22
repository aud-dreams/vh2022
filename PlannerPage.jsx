// This is the page that will display all the options for picking classes
// & showing the resulting schedules.

import axios from 'axios';
import { React, useState } from 'react';
import styles from './PlannerPage.module.css';
import CourseSelectionComponent from '../components/CourseSelectionComponent/CourseSelectionComponent';
import ScheduleComponent from '../components/ScheduleComponent/ScheduleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';

import { makeSchedule, dataStructure} from './InputProcessing.jsx';
// import CourseInputComponent from './components/courseInputComponent/CourseInputComponent';


const PlannerPage = () => {
    const [courses, setCourses] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [courseData, setCourseData] = useState([]);

    // Helper functions for API call
    // schedules = makeSchedule(courses)

    const getCourse = (courseDept, courseNum) => {
        let url = 'https://api.peterportal.org/rest/v0/schedule/soc';
    
        const params = new URLSearchParams({
            term: "2022 Fall", //this is a constant
            department: courseDept, //this depends on user input
            courseNumber: courseNum //this depends on user input
        });
    
        url = url + '?' + params.toString();
        url = url.replace("+", "%20");
        console.log(url);
    
        axios.get(url)
            .then(result => {
                console.log(result.data);
                setCourseData([...courseData, result.data]);
                // append?
            })
    };
    

    return (
        <div className={styles['Home']}>
            <div className={styles['title']}>
            commutr course
            </div>

            <div className={styles['boxes']}>
                <div className={styles['left']}>
                    <div className={styles['description']}>
                    welcome to commutr course, the perfect planning
                    tool for Petr the Commutr and his friends.
                    just enter your classes and we'll help you
                    find the best schedule for minimizing days
                    on campus and time between classes!
                    
                    </div>

                    <div className={styles['title-tag']}>
                        enter your classes:
                    </div>
                    
                    <div className={styles['course-selection']}>
                        <CourseSelectionComponent
                            courses={courses}
                            setCourses={setCourses} 
                        />
                    </div>
                    
                    <button
                        type="button"
                        className={styles['get-schedule-button']}
                        onClick={() => {
                            courses.forEach(function(course){
                                getCourse(course[0], c)
                            })

                            console.log(courses);
                            setSchedules(makeSchedule(courses));
                            console.log(schedules);
                            // console.log(getCourse(courses[0][0], courses[0][1]));
                        }}
                    >
                        get schedule
                        <FontAwesomeIcon icon={faArrowPointer} className={styles['arrow-pointer']} />
                    </button>
                </div>

                <div className={styles['schedule']}>
                    <ScheduleComponent scheduleNum={1} />
                </div>
            </div>
        </div>
    );
};

export default PlannerPage;
