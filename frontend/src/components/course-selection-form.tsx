import * as React from 'react';
import { Year, Term, Department } from '../types/interface';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import './course-selection-form.css';
import RaisedButton from 'material-ui/RaisedButton';

interface State {
    selected: number;
    mYearSelected: string;
    mTermSelected: string;
    mDepartmentSelected: string;
    terms: string[];
    years: string[];
    departments: string[];
}

class CourseSelectionForm extends React.Component<{}, State> {
    
    constructor(props: {}) {
        super(props);
        this.state = {
          selected: 0,
          mYearSelected: 'School Years',
          mTermSelected: 'Terms',
          mDepartmentSelected: 'Department',
          terms: [],
          years: [],
          departments: [],
        };

        this.onSelectYear = this.onSelectYear.bind(this);
        this.onSelectTerm = this.onSelectTerm.bind(this);
        this.onSelectDepartment = this.onSelectDepartment.bind(this);
      }
      
      componentDidMount() {
        /*
         Upon loading page, the years must be always fetched because the most basic query requires at least the year...
         Furthermore, any query can be formed after getting the year.
         */
      fetch('http://localhost:3376/years')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Could not fetch from server');
        }
      })
      .then(data => {
        global.console.log('Successfully fetched school years!');
        let options: string[] = [];
        for (var i = 0; i < data.length; i++) {
            options[i] = data[i].value;
        }
        this.setState({years: options});
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
        global.console.log('You selected year ' + option.label);
        this.fetchUrl('http://localhost:3376/terms/' + option.label).then(data => {
            let options: string[] = [];
            for (var i = 0; i < data.length; i++) {
                options[i] = data[i].value;
            }
            this.setState({terms: options});
        });
    }

    onSelectTerm(option: Option): void {
        this.setState({mTermSelected: option.label});
        global.console.log('You selected term ' + option.label);
        this.fetchUrl('http://localhost:3376/terms/' + this.state.mYearSelected + '/' + option.label).then(data => {
            let options: string[] = [];
            for (var i = 0; i < data.length; i++) {
                options[i] = data[i].value;
            }
            this.setState({departments: options});
        });
    }

    onSelectDepartment(option: Option): void {
        this.setState({mDepartmentSelected: option.label});
        global.console.log('You selected department ' + option.label);
        /*
        this.fetchUrl('http://localhost:3376/terms/' + this.state.mYearSelected + '/' + option.label).then(data => {
            let options: string[] = [];
            for (var i = 0; i < data.length; i++) {
                options[i] = data[i].value;
            }
            this.setState({departments: options});
        });
        */
    }

    render() {
        return (
            <div className="searchform">
                <div id="year">
                    <Dropdown className="yeardropdown" options={this.state.years} onChange={this.onSelectYear} value={undefined} placeholder={this.state.mYearSelected}/>
                </div>
                <div id="term">
                    <Dropdown className="termdropdown" options={this.state.terms} onChange={this.onSelectTerm} value={undefined} placeholder={this.state.mTermSelected}/>
                </div>
                <div id="department">
                    <Dropdown className="departmentdropdown" options={this.state.departments} onChange={this.onSelectDepartment} value={undefined} placeholder={this.state.mDepartmentSelected}/>
                </div>
                <RaisedButton label="Search" primary={true}/>
            </div>
        );
    }
}

export default CourseSelectionForm;