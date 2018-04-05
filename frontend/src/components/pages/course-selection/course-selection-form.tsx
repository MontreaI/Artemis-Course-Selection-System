import * as React from 'react';
import { Year, Term, Department } from '../../../types/interface';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import './course-selection-form.css';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Router } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import CourseApi from '../../../utils/course-api';
import CourseOutline from '../course-outline/course';
import CSection from '../course-outline/csection';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import TextField from 'material-ui/TextField';

var rowSizeArray: boolean[] = new Array(1);
var mCourseSectionsSelected: CSection[];
var courseSectionDataEmpty: CSection[] = [];
  
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
    mCourseSection: CSection[];
    api: CourseApi;
    username: string;
    height: string;
    fixedHeader: boolean;
    fixedFooter: boolean;
    stripedRows: boolean;
    showRowHover: boolean;
    selectable: boolean;
    multiSelectable: boolean;
    enableSelectAll: boolean;
    deselectOnClickaway: boolean;
    showCheckboxes: boolean;
    courseSectionData: CSection[];
    rowsSelected: boolean[];
    isLECSelected: boolean;
    isSECSelected: boolean;
}

// dropdown titles
var yearDropdownTitle: string = 'School Year';
var termDropdownTitle: string = 'Term';
var departmentDropdownTitle: string = 'Department';
var courseDropdownTitle: string = 'Course';

class CourseSelectionForm extends React.Component<{}, State> {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
          selected: 0,
          mYearSelected: yearDropdownTitle,
          mTermSelected: termDropdownTitle,
          mDepartmentSelected: departmentDropdownTitle,
          mCourseSelected: courseDropdownTitle,
          terms: [],
          years: [],
          departments: [],
          courses: [],
          mCourseSection: [],
          api: new CourseApi(),
          username: 'rca71',
          height: '238px',
          fixedHeader: true,
          fixedFooter: true,
          stripedRows: false,
          showRowHover: false,
          selectable: true,
          multiSelectable: false,
          enableSelectAll: false,
          deselectOnClickaway: false,
          showCheckboxes: true,
          courseSectionData: courseSectionDataEmpty,
          rowsSelected: [false],
          isLECSelected: true,
          isSECSelected: true,
        };

        this.onSelectYear = this.onSelectYear.bind(this);
        this.onSelectTerm = this.onSelectTerm.bind(this);
        this.onSelectDepartment = this.onSelectDepartment.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.onSelectCourse = this.onSelectCourse.bind(this);
        this.onChangeClearChildOptions = this.onChangeClearChildOptions.bind(this);
        this.generalFetch = this.generalFetch.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.onSectionSelect = this.onSectionSelect.bind(this);
        this.clearForm = this.clearForm.bind(this);
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

        this.onChangeClearChildOptions(yearDropdownTitle);
    }

    onSelectTerm(option: Option): void {
        this.setState({mTermSelected: option.label});

        this.state.api.getDepartments(this.state.mYearSelected, option.label).then(data => {
            this.setState({departments: data});
        });

        this.onChangeClearChildOptions(termDropdownTitle);
    }

    onSelectDepartment(option: Option): void {
        this.setState({mDepartmentSelected: option.label});

        this.state.api.getCourses(this.state.mYearSelected, this.state.mTermSelected, option.label).then(data => {
            let options: string[] = [];
            for (var i = 0; i < data.length; i++) {
                options[i] = data[i].number + ' - ' + data[i].title;
            }
            this.setState({courses: options});
        });

        this.onChangeClearChildOptions(departmentDropdownTitle);
    }

    onSelectCourse(option: Option): void {
        this.setState({mCourseSelected: option.label}, () => {
            this.state.api.getCourseSections(this.state.mYearSelected, this.state.mTermSelected, this.state.mDepartmentSelected, this.state.mCourseSelected.split('-')[0].trim()).then(data => {
                rowSizeArray = new Array(data.length);
                for (var i = 0; i < data.length; i++) {
                    rowSizeArray[i] = false;
                }
                this.setState({mCourseSection: data, courseSectionData: data, rowsSelected: rowSizeArray});
            });
        });
    }

    loadPage(): void {
       global.console.log('enter here');
       this.context.router.history.push({
        pathname: '/course-outline',
        state: {
            // insert props here, currently coursenumber coursesections not yet implemented, but will be by tomorrow.
          mYearSelected: this.state.mYearSelected,
          mTermSelected: this.state.mTermSelected,
          mDepartmentSelected: this.state.mDepartmentSelected,
          mCourseNumberSelected: this.state.mCourseSelected.split('-')[0].trim(),
          mCourseSection: this.state.mCourseSection,
          // courseSectionData: this.state.courseSectionData,
        }
      });
    }

    onChangeClearChildOptions(dropdown: string): void {
        switch (dropdown) {
            case yearDropdownTitle:
                global.console.log('Clearing child dropdowns of year dropdown');
                this.setState({
                    mTermSelected: termDropdownTitle,
                    mDepartmentSelected: departmentDropdownTitle,
                    mCourseSelected: courseDropdownTitle,
                    courseSectionData: courseSectionDataEmpty,
                    isLECSelected: true,
                    isSECSelected: true});
                break;
            case termDropdownTitle:
                global.console.log('Clearing child dropdowns of term dropdown');
                this.setState({
                    mDepartmentSelected: departmentDropdownTitle,
                    mCourseSelected: courseDropdownTitle,
                    courseSectionData: courseSectionDataEmpty,
                    isLECSelected: true,
                    isSECSelected: true});
                break;
            case departmentDropdownTitle:
                global.console.log('Clearing child dropdowns of department dropdown');
                this.setState({
                    mCourseSelected: courseDropdownTitle,
                    courseSectionData: courseSectionDataEmpty,
                    isLECSelected: true,
                    isSECSelected: true});
                break;
            default:
                global.console.log('default');
        }

    }

    generalFetch(mURL: string) {
        fetch(mURL)
        .then(response => {
          if (response.ok) {
            global.console.log('Successfully fetched from server');
          } else {
            global.console.log('Successfully fetched from server');
            throw new Error('Could not fetch from server');
          }
        });
    }

    clearForm(): void {
        this.setState({
            mYearSelected: yearDropdownTitle,
            mTermSelected: termDropdownTitle,
            mDepartmentSelected: departmentDropdownTitle,
            mCourseSelected: courseDropdownTitle,
            courseSectionData: courseSectionDataEmpty,
            isLECSelected: true,
            isSECSelected: true});
    }
    onSectionSelect(rows: number[]) {
        let isLEC = true;
        let isSEC = true;
        let options: CSection[] = [];
        if (rows.length > 0 && rowSizeArray.length > 0) {
            for (var r = 0; r < rowSizeArray.length; r++) {
                for (var t = 0; t < rows.length; t ++) {
                    if (r === rows[t] && rowSizeArray[r] !== true) {
                        rowSizeArray[r] = true;
                    } else {
                        rowSizeArray[r] = false;
                    }
                }
            }
            for (var i = 0; i < rows.length; i++) {
                options[i] = this.state.courseSectionData[rows[i]];
            }
            mCourseSectionsSelected = options;
            if (mCourseSectionsSelected[0].sectionCode === 'LEC') {
                isLEC = false;
            }
            isSEC = false;
        } else if (rows.length === 0) {
            var index = rowSizeArray.indexOf(true);
            rowSizeArray[index] = false;
        }

        this.setState({rowsSelected: rowSizeArray, isLECSelected: isLEC, isSECSelected: isSEC});
        global.console.log(rowSizeArray);
    }

    // /get/course/:department/:number/:section/:year/:term/'
    saveCourse() {
        // find course and retrieve ID
         let findCourseURL = 'http://localhost:3376/get/userCourse/' + this.state.mDepartmentSelected + '/' + 
         this.state.mCourseSelected.split('-')[0].trim() + '/' + this.state.mCourseSection[0].sectionNum + '/' + 
         this.state.mYearSelected + '/' + this.state.mTermSelected;
         let courseData = this.fetchUrl(findCourseURL).then((data) => {
            global.console.log('here' + data);
            if (data === -1) {
                global.console.log('Congrats its undefined');
                let insertCourseURL = 'http://localhost:3376/insert/course/' + this.state.mDepartmentSelected + '/' +
                    this.state.mCourseSelected.split('-')[0].trim() + '/' + this.state.mCourseSection[0].sectionNum + '/' +
                    this.state.mYearSelected + '/' + this.state.mTermSelected;
                let createdCourseData = this.fetchUrl(insertCourseURL).then((data1) => {
                    if (data1 === -1) {
                        global.console.log('Please try again or refresh the page');
                    } else {
                       global.console.log('Grats, the ID is ' + data1);
                    }
                });
   
            } else {
               global.console.log('Congratulations course id returned is' + data);
               let createdCourseData = this.fetchUrl('http://localhost:3376/insert/userCourse/rca71/' + data).then((data1) => {
                if (data1 === -1) {
                    global.console.log('Please try again or refresh the page');
                } else {
                   global.console.log('Grats, course inserted');
                }
            });

            }
       });
    }

    render() {
        return (
            <div>
            <div className="searchform" id="testw">
                <div className="courseSelect">
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
                <RaisedButton className="clearbtn" label="Clear" primary={true} onClick={this.clearForm}/>
                <RaisedButton className="savebtn" label="Save" primary={true} onClick={this.saveCourse}  disabled={this.state.isSECSelected}/>
                <RaisedButton className="searchbtn" label="Search" primary={true} onClick={this.loadPage} disabled={this.state.isLECSelected}/>
                </div>
                </div>
            </div>
            <div className="courseSection">
            <p>Course Sections and Tutorials</p>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onRowSelection={this.onSectionSelect}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn tooltip="The Section">Section</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Course Code">Code</TableHeaderColumn>
              <TableHeaderColumn tooltip="Index">Type</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.courseSectionData.map( (row, index) => (
              <TableRow key={index} selected={this.state.rowsSelected[index]}>
                <TableRowColumn>{row.sectionCode}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.classType}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
            </div>
            </div>
        );
    }
}

export default CourseSelectionForm;