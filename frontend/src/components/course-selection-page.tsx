import * as React from 'react';
import { Year } from '../types/interface';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import './interface.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const eventIcon = <FontIcon className="material-icons">event</FontIcon>;
const profileIcon = <FontIcon className="material-icons">face</FontIcon>;

interface Props {
    years: Year[];
}

class YearList extends React.Component<Props, {}> {
    state = {
        selectedIndex: 0,
      };

    select(index: number) {
        this.setState({selectedIndex: index});
        global.console.log('Hello');
    }
    Logged = (props: {}) => (
        <IconMenu
          {...props}
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText="Help" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
      )
      test() {
        global.console.log('Hello');
      }
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
            <div>
            <head><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/></head>
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <AppBar title="TypeWriter Scheduler" iconElementRight={<this.Logged />}/>
                <Dropdown className="yeardropdown" options={this._storeInArray()} onChange={this._onSelect} value={undefined} placeholder="Years"/>
                <RaisedButton label="Search" primary={true}/>
                <Paper zDepth={1}>
            <div className="btmnavigation">
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem label="Calendar" icon={eventIcon} onClick={() => this.select(0)} />
          <BottomNavigationItem label="Profile" icon={profileIcon} onClick={() => this.select(1)} />
        </BottomNavigation>
        </div>
      </Paper>
            </MuiThemeProvider>
            </div>
        );
    }
}

export default YearList;