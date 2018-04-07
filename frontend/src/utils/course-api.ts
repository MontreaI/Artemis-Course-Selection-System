import Dropdown, { Option } from 'react-dropdown';
import Config from './config';
import { Course, CourseJsonObj } from '../components/pages/course-outline/course';
import CSection from '../components/pages/course-outline/csection';

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
            return terms = data;
        });
    }

    public getDepartments(year: string, term: string): Promise<string[]> {
        let departments: string[];

        return this.fetchUrl(Config.termsURL + year + '/' + term).then((data: string[]) => {
            return departments = data;
        });
    }

    public getCourses(year: string, term: string, department: string): Promise<Course[]> {
        let courses: Course[];

        return this.fetchUrl(Config.termsURL + year + '/' + term + '/' + department).then(data => {
            courses = new Array();
            for (var i = 0; i < data.length; i++) {
                let course = new Course(department, data[i].value);
                course.title = data[i].title;
                courses.push(course);
            }

            return courses;
        });
    }

    public getCourseSections(year: string, term: string, department: string, courseNum: string): Promise<CSection[]> {
        let sections: CSection[];

        return this.fetchUrl(Config.termsURL + year + '/' + term + '/' + department + '/' + courseNum).then(data => {
            sections = new Array();
            for (var i = 0; i < data.length; i++) {
                let section = new CSection(data[i].text, data[i].value, data[i].title, data[i].classType, data[i].sectionCode, data[i].associatedClass);
                sections.push(section);
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

                //// COURSE SCHEDULE:
                course.courseSchedule = data.courseSchedule;
            } else {
                global.console.log(data);
                throw new Error('Data is perhaps corrupted');
            }
           
            return course;
        });
    }

    private fetchUrl(urlString: string) {
        return fetch(urlString)
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
        });
    }

    public getCourse(id: number): Course {

    }

    public getUserCourses(username: string) {
        return this.fetchUrl(Config.userCourseURL + username)
                   .then((data: number[]) => {
                       data.map(id => {
                           this.fetchUrl()
                       })
        });
    }
}

export default CourseApi;