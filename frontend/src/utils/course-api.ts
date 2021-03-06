import Dropdown, { Option } from 'react-dropdown';
import Config from './config';
import { Course, CourseJsonObj } from '../components/pages/course-outline/course';
import CSection from '../components/pages/course-outline/csection';

interface BackendCourse {
    department: string;
    number: string;
    section: string;
    year: string;
    term: string;
}

class CourseApi {

    public getYears(): Promise<string[]> {
        let years: string[];

        return this.fetchUrl(Config.yearURL).then((data: string[]) => {
            return years = data;
        });
    }

    public getTerms(year: string): Promise<string[]> {
        let terms: string[];

        return this.fetchUrl(Config.termsURL + year).then((data: string[]) => {
            if (data !== undefined) {
                terms = data;
            }
            return terms;
        });
    }

    public getDepartments(year: string, term: string): Promise<string[]> {
        let departments: string[];

        return this.fetchUrl(Config.termsURL + year + '/' + term).then((data: string[]) => {
            if (data !== undefined) {
                departments = data;
            }
            return departments;
        });
    }

    public getCourses(year: string, term: string, department: string): Promise<Course[]> {
        let courses: Course[];

        return this.fetchUrl(Config.termsURL + year + '/' + term + '/' + department).then(data => {
            courses = new Array();
            if (data !== undefined) {
                for (var i = 0; i < data.length; i++) {
                    let course = new Course(department, data[i].value);
                    course.title = data[i].title;
                    courses.push(course);
                }
            }
            return courses;
        });
    }

    public getCourseSections(year: string, term: string, department: string, courseNum: string): Promise<CSection[]> {
        let sections: CSection[];

        return this.fetchUrl(Config.termsURL + year + '/' + term + '/' + department + '/' + courseNum).then(data => {
            sections = new Array();
            if (data !== undefined) {
                for (var i = 0; i < data.length; i++) {
                    let section = new CSection(data[i].text, data[i].value, data[i].title, data[i].classType, data[i].sectionCode, data[i].associatedClass);
                    sections.push(section);
                }
            }
            return sections;
        });
    }

    public getCourseOutline(year: string, term: string, department: string, courseNum: string, courseSec: string): Promise<Course> {
        let course: Course;
       
        return this.fetchUrl(Config.termsURL + year + '/' + term + '/' + department + '/' + courseNum + '/' + courseSec).then((data: CourseJsonObj) => {

            if (data.info !== undefined) {
                global.console.log('getting course data-outline info...');
                global.console.log(data);
                course = new Course(data.info.dept, data.info.number);

                // INFO:
                course.degreeLevel = data.info.degreeLevel;
                course.deliveryMethod = data.info.deliveryMethod;
                course.description = data.info.description;
                course.designation = data.info.designation;
                course.title = data.info.title;
                course.prerequisites =  data.info.prerequisites;
                course.units = data.info.units;
                course.term = data.info.term;
                course.sectionNum = courseSec;

                //// COURSE SCHEDULE:
                course.courseSchedule = data.courseSchedule;
            } else {
                global.console.log(data);
            }
           
            return course;
        });
    }

    public getCourse(id: string): Promise<BackendCourse> {
        return this.fetchUrl(`${Config.courseURL}${id}`)
            .then((data: BackendCourse) => data)
            .catch((err: Error) => {
                throw err;
            });
    }

    public getUserCourses(username: string): Promise<Course[]> {
        return this.fetchUrl(Config.userCourseURL + username)
            .then((ids: string[]) =>
                Promise.all(ids.map(id => this.getCourse(id))).then((courses: BackendCourse[]) =>
                    Promise.all(courses.map(c => this.getCourseOutline(c.year, c.term, c.department, c.number, c.section)))
                )
            ).catch(err => {
                global.console.log(err);
                return [];
            });
    }

    public getCourseOfUser(username: string, year: string, term: string, department: string, courseNum: string, courseSec: string): Promise<string> {
        return this.fetchUrl(`${Config.userCourseURL}${username}/${department}/${courseNum}/${courseSec}/${year}/${term}`)
            .then((id: string) => id)
            .catch(err => {
                global.console.log(err);
                return '';
            });
    }

    public deleteUserCourse(username: string, id: string): Promise<boolean> {
        global.console.log('deleting course for user');
        return this.fetchUrl(`${Config.userCourseURL}${username}/${id}`, 'DELETE')
            .then(() => true)
            .catch(err => {
                global.console.log(err);
                return false;
            });
    }

    private fetchUrl(urlString: string, m: string = 'GET') {
        return fetch(urlString, {
            method: m
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            global.console.log('Successfully fetched from server');
            throw new Error('Could not fetch from server');
          }
        })
        .then(data => {
            return data;
        }).catch((error) => {
            global.console.log('Error in fetching');
            global.console.log(error);
            return undefined;
    });
    }
}

export default CourseApi;