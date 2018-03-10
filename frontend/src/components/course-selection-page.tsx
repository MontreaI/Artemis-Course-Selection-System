import * as React from 'react';
import { Year } from '../types/interface';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import './interface.css';

interface Props {
    years: Year[];
}

class YearList extends React.Component<Props, {}> {
    _onSelect(option: Option): void {
        global.console.log('You selected ' + option.label);
      }

    _storeInArray(): string[] {
        let options: string[] = [];
        for (var i = 0; i < this.props.years.length; i++) {
            options[i] = this.props.years[i].value;
        }
        return options;
    }

    render() {
        return (
            <div className="yeardropdown">
            <Dropdown options={this._storeInArray()} onChange={this._onSelect} value={undefined} placeholder="Years"/>
            </div>
        );
    }
}

export default YearList;