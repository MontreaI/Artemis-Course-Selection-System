import * as React from 'react';
import { Year, Term, Department } from '../../../types/interface';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import './course-selection-form.css';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Router } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import CourseApi from '../../../utils/course-api';
import Course from '../course-outline/course';

interface State {
    selected: number;
    mYearSelected: string;
    mTermSelected: string;
    mDepartmentSelected: string;
    mCourseSelected: string;
    terms: string[];
    years: string[];
    departments: string[];
    courses: string[];
    api: CourseApi;
}

class CourseSelectionForm extends React.Component<{}, State> {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
          selected: 0,
          mYearSelected: 'School Year',
          mTermSelected: 'Term',
          mDepartmentSelected: 'Department',
          mCourseSelected: 'Course',
          terms: [],
          years: [],
          departments: [],
          courses: [],
          api: new CourseApi(),
        };

        this.onSelectYear = this.onSelectYear.bind(this);
        this.onSelectTerm = this.onSelectTerm.bind(this);
        this.onSelectDepartment = this.onSelectDepartment.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.onSelectCourse = this.onSelectCourse.bind(this);
      }
      
      componentDidMount() {
        /*
         Upon loading page, the years must be always fetched because the most basic query requires at least the year...
         Furthermore, any query can be formed after getting the year.
         */
        this.state.api.getYears().then(data => {
            this.setState({years: data});
            global.console.log('call to year...');
        });
    }

    fetchUrl(urlString: string) {
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

    onSelectYear(option: Option): void {
        this.setState({mYearSelected: option.label});
        
        this.state.api.getTerms(option.label).then(data => {
            this.setState({terms: data});
        });
    }

    onSelectTerm(option: Option): void {
        this.setState({mTermSelected: option.label});

        this.state.api.getDepartments(this.state.mYearSelected, option.label).then(data => {
            this.setState({departments: data});
        });
    }

    onSelectDepartment(option: Option): void {
        this.setState({mDepartmentSelected: option.label});

        this.state.api.getCourses(this.state.mYearSelected, this.state.mTermSelected, option.label).then(data => {
            let options: string[] = [];
            for (var i = 0; i < data.length; i++) {
                options[i] = data[i].courseNum + ' - ' + data[i].name;
            }
            this.setState({courses: options});
        });
    }

    onSelectCourse(option: Option): void {
        this.setState({mCourseSelected: option.label});
        global.console.log('You selected course ' + option.label);
        /*
        this.fetchUrl('http://localhost:3376/terms/' + this.state.mYearSelected + '/' + this.state.mTermSelected + '/' + option.label).then(data => {
            let options: string[] = [];
            global.console.log('rayco' + data.length);
            for (var i = 0; i < data.length; i++) {
                options[i] = data[i].value + ' - ' + data[i].text;
                global.console.log('rayco' + options[i]);
            }
            this.setState({courses: options});
        });
        */
    }

    loadPage(): void {
       this.context.router.history.push({
        pathname: '/course-outline',
        state: {
            // insert props here, currently coursenumber coursesections not yet implemented, but will be by tomorrow.
          mYearSelected: this.state.mYearSelected,
          mTermSelected: this.state.mTermSelected,
          mDepartmentSelected: this.state.mDepartmentSelected,
          mCourseNumberSelected: this.state.mCourseSelected,
          // This last prop may not be required to be passed
          mCourseSectionSelected: 'd100'
        }
      });
    }

    render() {
        return (
            <div className="searchform">
                <br/><div id="year">
                    <label>Year</label><br/>
                    <Dropdown className="yeardropdown" options={this.state.years} onChange={this.onSelectYear} value={undefined} placeholder={this.state.mYearSelected}/>
                </div>
                <div id="term">
                    <label>Term</label><br/>
                    <Dropdown className="termdropdown" options={this.state.terms} onChange={this.onSelectTerm} value={undefined} placeholder={this.state.mTermSelected}/>
                </div>
                <div id="department">
                    <label>Department</label><br/>
                    <Dropdown className="departmentdropdown" options={this.state.departments} onChange={this.onSelectDepartment} value={undefined} placeholder={this.state.mDepartmentSelected}/>
                </div>
                <div id="course">
                    <label>Course</label><br/>
                    <Dropdown className="coursedropdown" options={this.state.courses} onChange={this.onSelectCourse} value={undefined} placeholder={this.state.mCourseSelected}/>
                </div>
                <div id="buttons">
                <RaisedButton className="clearbtn" label="Clear" primary={true}/>
                <RaisedButton className="searchbtn" label="Search" primary={true} onClick={this.loadPage}/>
                </div>
            </div>
        );
    }
}

export default CourseSelectionForm;