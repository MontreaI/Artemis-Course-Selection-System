import * as React from 'react';
import { Year, Term } from '../types/interface';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import './course-selection-form.css';
import RaisedButton from 'material-ui/RaisedButton';

/*
interface Props {
    years: Year[];
}
*/
interface State {
    selected: number;
    mYearSelected: string;
    terms: Term[];
    years: string[];
}

    // Member variables
// var mYearSelected: string = 'School Years';

var FetchType = Object.freeze({'TERM': 1});

var mTermSelected: string;
var mTermArray: string[] = [];

class CourseSelectionForm extends React.Component<{}, State> {
    
    constructor(props: {}) {
        super(props);
        this.state = {
          selected: 0,
          mYearSelected: 'School Years',
          terms: [],
          years: [],
        };

        this.onSelectYear = this.onSelectYear.bind(this);
        this.onSelectTerm = this.onSelectTerm.bind(this);
      }
      
      componentDidMount() {
        /*
         Upon loading pafe, the years must be always fetched because the most basic query requires at least the year...
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
        // array1.map(x => x * 2);
        let options: string[] = [];
        for (var i = 0; i < data.length; i++) {
            options[i] = data[i].value;
        }
        this.setState({years: options});
      });
    }

    fetchUrl(urlString: string) {
        // global.console.log('d' + this.state.mYearSelected);
        return fetch(urlString)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            global.console.log('Successfully fetched school terms no');
            throw new Error('Could not fetch from server fuck');
          }
        })
        .then(data => {
            global.console.log('Successfully fetched school terms@ ' + typeof data);
            // this.setState({terms: data});
            return data;
        });
    }

    onSelectYear(option: Option): void {
        this.setState({mYearSelected: option.label});
        global.console.log('You selected year' + option.label + ':' + this.state.mYearSelected);
        // let test =  this.fetchUrl('http://localhost:3376/terms/' + option.label);
        this.setState({terms: this.fetchUrl('http://localhost:3376/terms/' + option.label)});
        // global.console.log('length: ' + test.length);
        // this.fetchUrl()
        // this.mYearSelected = '' + option.label;
    }

    onSelectTerm(option: Option): void {
        // mYearSelected = option.label;
        // this.setState({mTermSelected: option.label});
        // global.console.log('You selected year' + mYearSelected);
        // this.mYearSelected = '' + option.label;
    }

    storeTerms(): void {
        if (this.state.terms != null) {
            for (var i = 0; i < this.state.terms.length; i++) {
                mTermArray[i] = this.state.terms[i].value;
            }
        }
    }

    render() {
        return (
            <div className="searchform">
                <div id="year">
                    <Dropdown className="yeardropdown" options={this.state.years} onChange={this.onSelectYear} value={undefined} placeholder={this.state.mYearSelected}/>
                </div>
                <div id="term">
                    <Dropdown className="termdropdown" options={mTermArray} onChange={this.onSelectTerm} value={undefined} placeholder="School Terms" />
                </div>
                <RaisedButton label="Search" primary={true}/>
            </div>
        );
    }
}

export default CourseSelectionForm;