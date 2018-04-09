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
import * as PropTypes from 'prop-types';
import NavigationClosse from 'material-ui/svg-icons/social/school';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import WeeklyView from '../calendar/weekly';

const eventIcon = <FontIcon className="material-icons">event</FontIcon>;
const courseSearchIcon = <FontIcon className="material-icons">find_in_page</FontIcon>;
const navigationSchoolIcon = <FontIcon className="material-icons">school</FontIcon>;

interface State {
    isLoggedIn: boolean;
    selectedIndex: number;
    currentElem: JSX.Element;
  }

interface CourseSelectionLayoutProps extends RouteComponentProps<CourseSelectionLayout> {
}

class CourseSelectionLayout extends React.Component<RouteComponentProps<CourseSelectionLayout>, State> {

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props: RouteComponentProps<CourseSelectionLayout>) {
        super(props);
        this.viewCourseOutline = this.viewCourseOutline.bind(this);
        this.state = {
            selectedIndex: 0,
            isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
            currentElem: <CourseSelectionForm viewCourseOutlineCallback={this.viewCourseOutline} />
        };
      }
    
    loadPage(): void {
        localStorage.clear();
        sessionStorage.clear();
        this.setState({isLoggedIn: false});
        this.context.router.history.push({
            pathname: '/signin',
            state: {
            }
        });
    }

    viewCourseOutline(elem: JSX.Element) {
        this.setState({
            currentElem: elem
        });
    }

    componentWillMount() {
        global.console.log('here' + this.state.isLoggedIn);
        if (!(this.state.isLoggedIn)) {
            this.context.router.history.push({
                pathname: '/signin',
                state: {
                }
            });
        }
    }

    select(index: number) {
        this.setState({ selectedIndex: index });
        switch (index) {
            default:
            case 0:
                this.setState({ currentElem: <CourseSelectionForm viewCourseOutlineCallback={this.viewCourseOutline} /> });
                break;
            case 1:
                this.setState({ currentElem: <WeeklyView viewCourseOutlineCallback={this.viewCourseOutline} /> });
                break;
        }
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
            <MenuItem primaryText="Sign out" onClick={() => this.loadPage()} />
        </IconMenu>
    )

    logo = (props: {}) => (
                <IconButton>< NavigationClosse/></IconButton>
    )

    render() {
        return (
            <div className="courselayout">
                <MuiThemeProvider muiTheme={getMuiTheme(customBaseTheme)}>
                    <AppBar className="app-bar" title="Artemis" iconElementRight={<this.Logged />} iconElementLeft={<this.logo />}/>
                    <Paper zDepth={1}>
                        <div className="btmnavigation">
                            <BottomNavigation className="bottom-nav" selectedIndex={this.state.selectedIndex}>
                                <BottomNavigationItem label="Course Search" icon={courseSearchIcon} onClick={() => this.select(0)} />
                                <BottomNavigationItem label="Timetable" icon={eventIcon} onClick={() => this.select(1)} />
                            </BottomNavigation>
                        </div>
                    </Paper>
                    {this.state.currentElem}
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withRouter(CourseSelectionLayout);
