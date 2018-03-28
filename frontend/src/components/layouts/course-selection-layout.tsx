import * as React from 'react';
import { Year } from '../../types/interface';
import './course-selection-layout.css';
import CourseSelectionForm from '../pages/course-selection/course-selection-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import customBaseTheme from '../themes/customBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const eventIcon = <FontIcon className="material-icons">event</FontIcon>;
const profileIcon = <FontIcon className="material-icons">face</FontIcon>;
const courseSearchIcon = <FontIcon className="material-icons">find_in_page</FontIcon>;

interface State {
    selectedIndex: number;
  }

class CourseSelectionLayout extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
          selectedIndex: 0
        };
      }
    
    select(index: number) {
        this.setState({ selectedIndex: index });
        global.console.log('Hello');
    }

    Logged = (props: {}) => (
        <IconMenu
            {...props}
            iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
        </IconMenu>
    )

    render() {
        return (
            <div className="courselayout">
                <MuiThemeProvider muiTheme={getMuiTheme(customBaseTheme)}>
                    <AppBar title="Artemis" iconElementRight={<this.Logged />} />
                    <CourseSelectionForm/>
                    <Paper zDepth={1}>
                        <div className="btmnavigation">
                            <BottomNavigation selectedIndex={this.state.selectedIndex}>
                                <BottomNavigationItem label="Course Search" icon={courseSearchIcon} onClick={() => this.select(0)} />
                                <BottomNavigationItem label="Timetable" icon={eventIcon} onClick={() => this.select(1)} />
                                <BottomNavigationItem label="My Profile" icon={profileIcon} onClick={() => this.select(2)} />
                            </BottomNavigation>
                        </div>
                    </Paper>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default CourseSelectionLayout;