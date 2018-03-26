import Dropdown, { Option } from 'react-dropdown';
import Config from './config';
import Course from '../components/course-outline/course';

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
                let course = new Course(data[i].value, data[i].title);
                courses.push(course);
            }

            return courses;
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
}

export default CourseApi;