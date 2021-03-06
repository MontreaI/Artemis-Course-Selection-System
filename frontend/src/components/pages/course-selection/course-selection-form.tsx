import * as React from 'react';
import { Year, Term, Department } from '../../../types/interface';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import './course-selection-form.css';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Router } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import CourseApi from '../../../utils/course-api';
import CourseOutline from '../course-outline/course-outline';
import CSection from '../course-outline/csection';
import Snackbar from 'material-ui/Snackbar';

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

var savedCourseSuccess = 'Course has been successfully saved to your timetable!';
var savedCourseFailure = 'Course has failed to be saved to your timetable, please try again!';
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
    mSectionData: CSection[];
    api: CourseApi;
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
    open: boolean;
    snackbarMessage: string;
    showModal: boolean;
    courseOutline: JSX.Element;
}

// dropdown titles
var yearDropdownTitle: string = 'School Year';
var termDropdownTitle: string = 'Term';
var departmentDropdownTitle: string = 'Department';
var courseDropdownTitle: string = 'Course';

interface Props {
    viewCourseOutlineCallback: (elem: JSX.Element) => void;
}

class CourseSelectionForm extends React.Component<Props, State> {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props: Props, context: {}) {
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
            mSectionData: [],
            api: new CourseApi(),
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
            open: false,
            snackbarMessage: savedCourseFailure,
            showModal: false,
            courseOutline: <CourseOutline year={'2015'} term={'summer'} dept={'cmpt'} number={'225'} section={'d100'} />
        };

        this.onSelectYear = this.onSelectYear.bind(this);
        this.onSelectTerm = this.onSelectTerm.bind(this);
        this.onSelectDepartment = this.onSelectDepartment.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.onSelectCourse = this.onSelectCourse.bind(this);
        this.onChangeClearChildOptions = this.onChangeClearChildOptions.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.onSectionSelect = this.onSectionSelect.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.onUnloadCleanup = this.onUnloadCleanup.bind(this);
    }
    onUnloadCleanup(event: Event) {
        global.console.log('Unloading Triggered');
        event.preventDefault();
        return 'unloading';
    }
    componentDidMount() {
        this.setState({ years: ['2015', '2016', '2017', '2018'] });
        window.addEventListener('beforeunload', this.onUnloadCleanup);
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onUnloadCleanup);
    }

    fetchUrl(urlString: string) {
        return fetch(urlString)
            .then(response => {
                if (response.ok) {
                    this.setState({snackbarMessage: savedCourseSuccess});
                    return response.json();
                } else {
                    throw new Error('Could not fetch from server');
                }
            })
            .then(data => {
                return data;
            }).catch((error) => {
                global.console.log('Error in fetching');
                this.setState({snackbarMessage: savedCourseFailure});
                return undefined;
        });
    }

    onSelectYear(option: Option): void {
        this.setState({ mYearSelected: option.label });

        this.state.api.getTerms(option.label).then(data => {
            if (data !== undefined) {
                this.setState({ terms: data });
                this.onChangeClearChildOptions(yearDropdownTitle);
            }
        });
    }

    onSelectTerm(option: Option): void {
        this.setState({ mTermSelected: option.label });

        this.state.api.getDepartments(this.state.mYearSelected, option.label).then(data => {
            if (data !== undefined) {
                this.setState({ departments: data });
                this.onChangeClearChildOptions(termDropdownTitle);
            }
        });
    }

    onSelectDepartment(option: Option): void {
        this.setState({ mDepartmentSelected: option.label });

        this.state.api.getCourses(this.state.mYearSelected, this.state.mTermSelected, option.label).then(data => {
            if (data !== undefined) {
                let options: string[] = [];
                for (var i = 0; i < data.length; i++) {
                    options[i] = data[i].number + ' - ' + data[i].title;
                }
                this.setState({ courses: options });
                this.onChangeClearChildOptions(departmentDropdownTitle);
            }
        });
    }

    onSelectCourse(option: Option): void {
        this.setState({ mCourseSelected: option.label }, () => {
            this.state.api.getCourseSections(this.state.mYearSelected, this.state.mTermSelected, this.state.mDepartmentSelected, this.state.mCourseSelected.split('-')[0].trim()).then(data => {
                if (data !== undefined) {
                    rowSizeArray = new Array(data.length);
                    for (var i = 0; i < data.length; i++) {
                        rowSizeArray[i] = false;
                    }
                    this.setState({ mSectionData: data, courseSectionData: data, rowsSelected: rowSizeArray });
                }
            });
        });
    }

    loadPage(): void {
        global.console.log('enter here' + this.state.courseSectionData[this.state.rowsSelected.indexOf(true)].sectionCode);
        let elem = (
            <CourseOutline
                year={this.state.mYearSelected}
                term={this.state.mTermSelected}
                dept={this.state.mDepartmentSelected}
                number={this.state.mCourseSelected.split('-')[0].trim()}
                section={this.state.courseSectionData[this.state.rowsSelected.indexOf(true)].sectionNum}
            />
        );
        this.props.viewCourseOutlineCallback(elem);
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
                    isSECSelected: true
                });
                break;
            case termDropdownTitle:
                global.console.log('Clearing child dropdowns of term dropdown');
                this.setState({
                    mDepartmentSelected: departmentDropdownTitle,
                    mCourseSelected: courseDropdownTitle,
                    courseSectionData: courseSectionDataEmpty,
                    isLECSelected: true,
                    isSECSelected: true
                });
                break;
            case departmentDropdownTitle:
                global.console.log('Clearing child dropdowns of department dropdown');
                this.setState({
                    mCourseSelected: courseDropdownTitle,
                    courseSectionData: courseSectionDataEmpty,
                    isLECSelected: true,
                    isSECSelected: true
                });
                break;
            default:
                global.console.log('default');
        }

    }

    clearForm(): void {
        this.setState({
            mYearSelected: yearDropdownTitle,
            mTermSelected: termDropdownTitle,
            mDepartmentSelected: departmentDropdownTitle,
            mCourseSelected: courseDropdownTitle,
            courseSectionData: courseSectionDataEmpty,
            isLECSelected: true,
            isSECSelected: true
        });
    }
    onSectionSelect(rows: number[]) {
        let isLEC = true;
        let isSEC = true;
        let options: CSection[] = [];
        if (rows.length > 0 && rowSizeArray.length > 0) {
            for (var r = 0; r < rowSizeArray.length; r++) {
                for (var t = 0; t < rows.length; t++) {
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

        this.setState({ rowsSelected: rowSizeArray, isLECSelected: isLEC, isSECSelected: isSEC });
        global.console.log(rowSizeArray);
    }

    // /get/course/:department/:number/:section/:year/:term/'
    saveCourse() {
        // find course and retrieve ID
        let findCourseURL = 'http://localhost:3376/insert/userCourse/' + sessionStorage.getItem('username') + '/' + this.state.mDepartmentSelected + '/' +
            this.state.mCourseSelected.split('-')[0].trim() + '/' + this.state.mSectionData[this.state.rowsSelected.indexOf(true)].sectionNum + '/' +
            this.state.mYearSelected + '/' + this.state.mTermSelected;
        let courseData = this.fetchUrl(findCourseURL);
        this.setState({ open: true });
    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    }

    render() {
        return (
            <div>
                <div className="searchform">
                    <div className="courseSelect">
                        <br /><div id="year">
                            <label>Year</label><br />
                            <Dropdown className="yeardropdown" options={this.state.years} onChange={this.onSelectYear} value={undefined} placeholder={this.state.mYearSelected} />
                        </div>
                        <div id="term">
                            <label>Term</label><br />
                            <Dropdown className="termdropdown" options={this.state.terms} onChange={this.onSelectTerm} value={undefined} placeholder={this.state.mTermSelected} />
                        </div>
                        <div id="department">
                            <label>Department</label><br />
                            <Dropdown className="departmentdropdown" options={this.state.departments} onChange={this.onSelectDepartment} value={undefined} placeholder={this.state.mDepartmentSelected} />
                        </div>
                        <div id="course">
                            <label>Course</label><br />
                            <Dropdown className="coursedropdown" options={this.state.courses} onChange={this.onSelectCourse} value={undefined} placeholder={this.state.mCourseSelected} />
                        </div>
                        <div id="buttons">
                            <RaisedButton className="clearbtn" label="Clear" primary={true} onClick={this.clearForm} />
                            <RaisedButton className="savebtn" label="Save" primary={true} onClick={this.saveCourse} disabled={this.state.isSECSelected} />
                            <RaisedButton className="searchbtn" label="Search" primary={true} onClick={this.loadPage} disabled={this.state.isLECSelected} />
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
                                <TableHeaderColumn tooltip="The Section Code">Code</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The Section Number">Number</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Index">Type</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={this.state.showCheckboxes}
                            deselectOnClickaway={this.state.deselectOnClickaway}
                            showRowHover={this.state.showRowHover}
                            stripedRows={this.state.stripedRows}
                        >
                            {this.state.courseSectionData.map((row, index) => (
                                <TableRow key={index} selected={this.state.rowsSelected[index]}>
                                    <TableRowColumn>{row.sectionCode}</TableRowColumn>
                                    <TableRowColumn>{row.name}</TableRowColumn>
                                    <TableRowColumn>{row.classType}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Snackbar open={this.state.open} message={this.state.snackbarMessage} autoHideDuration={4000} onRequestClose={this.handleRequestClose} />
            </div>
        );
    }
}

export default CourseSelectionForm;