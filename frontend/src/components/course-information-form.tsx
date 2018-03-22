import * as React from 'react';
import { Year, Term, Department } from '../types/interface';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import './course-selection-form.css';
import RaisedButton from 'material-ui/RaisedButton';

interface State {
}

class CourseInformationForm extends React.Component<{}, State> {

    render() {
        return (
            <div className="courseinformationform">
            <p>Hello World</p>
            </div>
        );
    }
}

export default CourseInformationForm;