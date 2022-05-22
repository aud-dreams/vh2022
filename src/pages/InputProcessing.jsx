import axios from 'axios';
import { React, useState } from 'react';


const convertTime = (time_str) => {
    let x = '';
    if (time_str[time_str.length - 1] === 'p'){
        x = time_str.substring(0, time_str.length - 1).split('-');
    } else {
        x = time_str.split('-');
    }
    let start = x[0];
    let end = x[1];
    let start_num = Number.parseInt((start.split(':')[0].trim()), 10);
    let start_min = Number.parseInt((start.split(':')[1].trim()), 10);
    let end_num = Number.parseInt((end.split(':')[0].trim()), 10);
    let end_min = Number.parseInt((end.split(':')[1].trim()), 10);

    if (time_str.substring(0, time_str.length - 1)){
        if (start_num <= end_num){
            start_num += 12;
        }
        end_num += 12;

    return [start_num*60 + start_min, end_num*60 + end_min];
    }
}

export const dataStructure = (coursedata) => { 
    // given coursedata JSON dict, return condensed data structure of relevant info
    // returned data structure is [[Lec A dict, [Dis1, Dis2, Dis3, ...]], [Lec B dict, [Dis1, Dis2,...]], more letter lecs]
    let course_sections = [];

    console.log('coursedata', coursedata)
    let sections = coursedata['schools'][0]['departments'][0]['courses'][0]['sections'];
    let inner = [];
    let secondary = [];
    let starting_section = 'A';

    sections.forEach(function(section){
        let section_num = section['sectionNum'];
        let section_code = section['sectionCode'];
        let section_type = section['sectionType'];
        let days = section['meetings'][0]['days'];
        let times = convertTime(section['meetings'][0]['time']);
        if (!isNaN(section)){
            section_num = starting_section + section_num
        }
        let details = {
            'sectionNum': section_num,
            'sectionCode': section_code,
            'sectionType': section_type,
            'days': days,
            'times': times
        }

        if (/^[a-zA-Z]+$/.test(section_num)){
            if (secondary.length !== 0){
                inner.push(secondary);
                course_sections.push(inner);
                inner = [];
            }
            starting_section = section_num;
            inner.push(details);
            secondary = [];
        } else {
            secondary.push(details);
        }
    
    })
    if (course_sections.length === 0){
        course_sections.push([inner[0], []])
    }
    console.log(course_sections);
    return course_sections;
    // successful return: [[, ], ...]
    //test for errors here, if it returns [[], []], it did not work
};

//api_data is [result.data of class 1, result.data of class 2, result.data of class 3]
export const makeSchedule = (api_data) => {
    let my_course_data = [dataStructure(api_data[0]), dataStructure(api_data[1]), dataStructure(api_data[2])]
    //if any element in my_course_data is [[], []], it did not work, don't proceed with the rest of this function
    let all_course_combos = createCourseCombos(my_course_data)
    let all_possible_schedules = possibleSchedules(all_course_combos)
    return all_possible_schedules
}; //returns a list of all the possible schedules in the format [schedule1, schedule2, schedule3, ...]
//each schedule is a nested list and looks like [course1 lec and dis pair, course2 lec and dis pair, course3 lec and dis pair]
//each course lec and dis pair looks like [lec, dis], sometimes there's no discussion so it would be empty and look like [lec, []]
//you can access the section code of lec and dis by doing lec['sectionCode'] and dis['sectionCode']



//this function takes as input [dataStructure(result.data of class 1), dataStructure(result.data of class 2), dataStructure(result.data of class 3)]
// function createCourseCombos(course_sections){ //this uses special data structure i made
const createCourseCombos = (course_sections) => { //this uses special data structure i made
    //returns a list [combos of class1, combos of class2, combos of class3] and combos of class 1 would be like [[lecA, dis1], [lecA, dis2],... and so on]
    let course_combos = [];
    course_sections.forEach(function(course_sec){
        let possibles = [];
        course_sec.forEach(function(my_tuple){
            let lec = my_tuple[0];
            let discussions_list = my_tuple[1];
            if (discussions_list.length !== 0){
                discussions_list.forEach(function(discussion){
                    possibles.push([lec, discussion]);
            })
            } else {
                possibles.push([lec]);
            }
        })
        course_combos.push(possibles);
    });
    return course_combos;
};

//given two courses checks if times overlap
const timeOverlap = (course1, course2) => {
    console.log('c1', course1)
    console.log('c2', course2)
    if (!course1 || !course2){
        return false
    }
    let [s1, e1] = course1['times'];
    let [s2, e2] = course2['times'];
    return (s1 <= s2 <= e1 || s2 <= s1 <= e2);
};

const product = (...params) => {
    let args = Array.prototype.slice.call(params); // makes array from arguments
    return args.reduce(function tl (accumulator, value) {
      let tmp = [];
      accumulator.forEach(function (a0) {
        value.forEach(function (a1) {
          tmp.push(a0.concat(a1));
        });
      });
      return tmp;
    }, [[]]);
  };
/* Solution from cybercase on github, Javscript equivalent of Python's itertools.product
https://gist.github.com/cybercase/db7dde901d7070c98c48
*/

//given all the coursecombos from createCourseCombos(course_sections)
const possibleSchedules = (coursecombos) => {
    let possible = [];
    let cartesian_combos = product(coursecombos[0], coursecombos[1], coursecombos[2]);
    cartesian_combos.forEach(function(schedule){
        if (schedule[0].length === 1) {
            schedule[0].push([]);
        }
        if (schedule[1].length === 1) {
            schedule[1].push([]);
        }
        if (schedule[2].length === 1) {
            schedule[2].push([]);
        }
        if (!(timeOverlap(schedule[0][0], schedule[1][0])
            || timeOverlap(schedule[0][0], schedule[1][1])
            || timeOverlap(schedule[0][0], schedule[2][0])
            || timeOverlap(schedule[0][0], schedule[2][1])

            || timeOverlap(schedule[0][1], schedule[1][0])
            || timeOverlap(schedule[0][1], schedule[1][1])
            || timeOverlap(schedule[0][1], schedule[2][0])
            || timeOverlap(schedule[0][1], schedule[2][1])
            
            || timeOverlap(schedule[1][0], schedule[2][0])
            || timeOverlap(schedule[1][0], schedule[2][1])

            || timeOverlap(schedule[1][1], schedule[2][0])
            || timeOverlap(schedule[1][1], schedule[2][1]))){
                possible.push(schedule);
            }   
    });
    return possible
};