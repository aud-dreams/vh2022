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
    const [topSchedules, setTopSchedules] = useState();
    const [topSchedCodes, setTopSchedCodes] = useState();

    // Helper functions for API call
    // schedules = makeSchedule(courses)

    const getCourse = async (courseDept, courseNum) => {
        let url = 'https://api.peterportal.org/rest/v0/schedule/soc';
    
        const params = new URLSearchParams({
            term: "2022 Fall", //this is a constant
            department: courseDept, //this depends on user input
            courseNumber: courseNum //this depends on user input
        });
    
        url = url + '?' + params.toString();
        url = url.replace("+", "%20");
        console.log(url);
    
        const res = await axios.get(url);
        return await res.data;
        // axios.get(url)
        //     .then(result => {
        //         console.log(result.data);
        //         setCourseData([...courseData, result.data]);
        //         setSchedules(makeSchedule(courseData));
        //     })
    };

    const convertToCourseCodes = (scheduleList) => {
        return scheduleList.map(scheduleArray => {
            return scheduleArray[0].map(section => {
                return section.sectionCode;
            })});
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
                    tool for Petr the Commutr and any of his friends.
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
                        onClick={async () => {
                            const loadedCourseData = await courses.map(async function(course){
                                return await getCourse(course[0], course[1])
                            })

                            Promise.all(loadedCourseData).then((values) => {
                                console.log('values', values);
                                const sched = makeSchedule(values);
                                console.log('made schedule', sched);
                                setSchedules(sched);
                                setTopSchedules(sched.slice(0, 3));
                                console.log('top schedyle', topSchedules);
                                console.log('top scheds', sched.slice(0, 3));
                                console.log('codes', convertToCourseCodes(sched.slice(0, 3)));
                                console.log('TOP SCHED', sched[0]);
                                // setTopSchedCodes(sched[0]);
                                setTopSchedCodes(sched.slice(0, 3));
                            });
                            // console.log('shedules', schedules);
                            console.log('TOP SCHEDULE', topSchedules);
                            // console.log('top 3', schedules.slice(0, 3));
                            // setTopSchedules(schedules[0:3]);
                        }}
                    >
                        get schedule
                        <FontAwesomeIcon icon={faArrowPointer} className={styles['arrow-pointer']} />
                    </button>
                </div>

                <div className={styles['schedule']}>
                    <ScheduleComponent
                        topCodes={topSchedCodes}
                        setTopCodes={setTopSchedCodes}
                        scheduleNum={1}
                        scheduleData={schedules}/>
                </div>
            </div>
        </div>
    );
};

export default PlannerPage;
