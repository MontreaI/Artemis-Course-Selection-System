import * as React from 'react';
import { Year } from '../types/interface';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import './interface.css';
import RaisedButton from 'material-ui/RaisedButton';

interface Props {
    years: Year[];
}

class CourseSelectionForm extends React.Component<Props, {}> {
    onSelect(option: Option): void {
        global.console.log('You selected ' + option.label);
    }

    storeInArray(): string[] {
        let options: string[] = [];
        for (var i = 0; i < this.props.years.length; i++) {
            options[i] = this.props.years[i].value;
        }
        return options;
    }

    render() {
        return (
            <div>
                <Dropdown className="yeardropdown" options={this.storeInArray()} onChange={this.onSelect} value={undefined} placeholder="Years" />
                <RaisedButton label="Search" primary={true} />
            </div>
        );
    }
}

export default CourseSelectionForm;