import * as React from 'react';
import Tree from 'react-d3-tree';
import './course-outline.css';
import Course from './course';
import CourseNode from './course-node';
import CourseApi from '../../../utils/course-api';
import CSection from './csection';
import * as PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
// Material Imports
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import muiTheme from '../../themes/customListTheme';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Dialog from 'material-ui/Dialog';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

interface State {
  mYearSelected: string;
  mTermSelected: string;
  mDepartmentSelected: string;
  mCourseNumberSelected: string;
  mSectionNumberSelected: string;
  mSectionData: CSection[];
  mSelectedSection: CSection;
  courseTree: Course[];
  courseOutline: Course;
  dialogOpen: boolean;
  api: CourseApi;
  height: string;
}

interface CourseOutlineProps {
  year: string;
  term: string;
  dept: string;
  number: string;
  section: string;
}

// Icons //
const descIcon = <FontIcon className="material-icons">description</FontIcon>;
const classIcon = <FontIcon className="material-icons">class</FontIcon>;
const alertIcon = <FontIcon className="material-icons">error_outline</FontIcon>;
const locIcon = <FontIcon className="material-icons">room</FontIcon>;
const timeIcon = <FontIcon className="material-icons">schedule</FontIcon>;

// Consts
const centerX = (window.screen.width / 2);
const centerY = (window.screen.height / 2);

// * Tree STYLING * //
const svgSquare = {
    shape: 'rect',
    shapeProps: {
      width: 140,
      height: 20,
      rx: 10,
      ry: 10,
      x: -70,
      y: 0,
    }
}; 

const position = {
    x: centerX - (window.screen.width * 0.15),
    y: (window.screen.height * 0.1)
};

const anchor = {
    textAnchor: 'start',
    x: -35,
    y: 10,
    transform: undefined
};

const styles = {
    links: {
        stroke: 'black',
        strokeWidth: 1,
      },
    nodes: {
    node: {
      circle: {
        stroke: 'black',
        strokeWidth: 3,
        fill: 'white'
      },
      name: {
        fontFamily: 'Times New Roman',
        fontSize: 15,
        },
      attributes: {
        stroke: 'blue',
        strokeWidth: 1,
      },
    },
    leafNode: {
        circle: {
        stroke: 'black',
        strokeWidth: 3,
        fill: 'white',
      },
      name: {
        fontSize: 15,
        fontFamily: 'Times New Roman',
        },
      attributes: {
        stroke: 'blue',
        strokeWidth: 1,
      },
    },
  },
};
// * END OF STYLING * //

class CourseOutline extends React.Component<CourseOutlineProps, State> {

    static contextTypes = {
      router: PropTypes.object
    };

    constructor(props: CourseOutlineProps) {
        super(props);

        this.state = {
          mYearSelected: this.props.year,
          mTermSelected: this.props.term,
          mDepartmentSelected: this.props.dept,
          mCourseNumberSelected: this.props.number,
          mSectionNumberSelected: this.props.section, 
          mSectionData: [],
          mSelectedSection: new CSection('', '', '', '', '', ''),
          courseOutline: new Course('', ''),
          courseTree: [],
          dialogOpen: false,
          api: new CourseApi(),
          height: '238px',
        }; 

        this.openCourseNode = this.openCourseNode.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.descriptionOpen = this.descriptionOpen.bind(this);
        this.descriptionClose = this.descriptionClose.bind(this);
    }

    componentWillMount() {
      this.fetchOutline();
    }

    componentWillReceiveProps() {
      window.location.reload();
    }

    descriptionOpen() {
      this.setState({dialogOpen: true});
    }

    descriptionClose() {
      this.setState({dialogOpen: false});
    }
  
    fetchOutline() {
      // let mSection = this.getMainSection(this.state.mSectionData);
      setTimeout(
        () => {

          // Call to Course-Outline
          this.state.api.getCourseOutline(
            this.state.mYearSelected, 
            this.state.mTermSelected, 
            this.state.mDepartmentSelected, 
            this.state.mCourseNumberSelected, 
            this.state.mSectionNumberSelected).then(data => {
              
              data.parsePrerequisites();
              var tree: Course[] = [];
              tree[0] = data; // Constructs tree
    
              this.setState({courseTree: tree});
              this.setState({courseOutline: data});
          });

          // Call To Section Data
          this.state.api.getCourseSections(
            this.state.mYearSelected, 
            this.state.mTermSelected, 
            this.state.mDepartmentSelected, 
            this.state.mCourseNumberSelected 
          ).then(sectionData => {
            sectionData.forEach(section => {
              if (section.sectionNum === this.state.mSectionNumberSelected) {
                this.setState({mSelectedSection: section});
              }
            });
            this.setState({mSectionData: sectionData});
          });

        }, 
        500
      );
    }

    getMainSection(sections: CSection[]): CSection {
      var mSection: CSection;

      for (var section of sections) {
        if (section.sectionCode === 'LEC' || section.sectionCode === 'SEM') {
          return mSection = section;
        }
      }

      return mSection = sections[0];
    }

    openCourseNode(node: Course) {
      var found: Boolean = false;
      var sections: CSection[];

      if (this.state.courseOutline.number === node.number) {
        return;
      }

      // Year, Term, Deparment is auto selected..
      // Need to check for course number exists? if it does then grab sections, it it doesn't then alert user we couldn't find it
      this.state.api.getCourses(this.state.mYearSelected, this.state.mTermSelected, node.dept).then(courseData => {
        
        courseData.forEach(element => {
          if (element.number === node.number) {
            found = true;
          }
        });

        if (!found) {
          alert('Could not find course for this semester');
        } else {
          this.state.api.getCourseSections(this.state.mYearSelected, this.state.mTermSelected, node.dept, node.number).then(sectionData => {
              let section = this.getMainSection(sectionData);
              this.setState({
                  mDepartmentSelected: node.dept,
                  mCourseNumberSelected: node.number,
                  mSectionNumberSelected: section.sectionNum,
                  courseTree: []
              });
              this.fetchOutline();
            //this.loadPage(this.state.mYearSelected, this.state.mTermSelected, node.dept, node.number, section.sectionNum);
          });
        }
      });
    }

    loadPage(year: string, term: string, dept: string, courseNumber: string, sectionNum: string): void {
      this.context.router.history.push({
       pathname: '/course-outline/' + year + '/' + term + '/' + dept + '/' + courseNumber + '/' + sectionNum,
       state: {
       }
     });

   }

    render() {
      if (this.state.courseTree.length > 0) {
        return (
          <div className="wrapper">

              <div>
                <MuiThemeProvider>
                  <Dialog
                    title={<h3 className="list-override">Description: </h3>}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.descriptionClose}
                  >
                    <span className="list-secondary-text">{this.state.courseOutline.description}</span>
                  </Dialog>
                </MuiThemeProvider>
              </div>

              <div className="treeWrapper">
                <Tree data={this.state.courseTree} onClick={this.openCourseNode} translate={position} nodeSvgShape={svgSquare} textLayout={anchor} orientation={'vertical'} styles={styles} pathFunc={'diagonal'}/>
              </div>

              <div className="box-sizing">
                <h3>Overview</h3>
                <div className="sub-box">
                  <MuiThemeProvider>
                    <List>
                      <ListItem 
                        leftAvatar={classIcon} 
                        primaryText="Title:" 
                        secondaryText={<span className="list-secondary-text"> {this.state.courseOutline.title} </span>} 
                        className="list-override"
                      />
                      <Divider />
                      <ListItem 
                        leftAvatar={descIcon} 
                        primaryText="Department:" 
                        secondaryText={<span className="list-secondary-text"> {this.state.courseOutline.dept} </span>} 
                        className="list-override"
                      />
                      <Divider />
                      <ListItem 
                        leftAvatar={descIcon} 
                        primaryText="Course Number:" 
                        secondaryText={<span className="list-secondary-text"> {this.state.courseOutline.number} </span>} 
                        className="list-override"
                      />
                      <Divider />
                      <ListItem 
                        leftAvatar={descIcon} 
                        primaryText="Term:" 
                        secondaryText={<span className="list-secondary-text"> {this.state.courseOutline.term} </span>} 
                        className="list-override"
                      />
                      <Divider />
                      <ListItem 
                        leftAvatar={descIcon} 
                        primaryText="Degree Level:" 
                        secondaryText={<span className="list-secondary-text"> {this.state.courseOutline.degreeLevel} </span>} 
                        className="list-override"
                      />
                      <Divider />
                      <ListItem 
                        leftAvatar={descIcon} 
                        primaryText="Delivery Method:" 
                        secondaryText={<span className="list-secondary-text"> {this.state.courseOutline.deliveryMethod} </span>} 
                        className="list-override"
                      />
                      <Divider />
                      <ListItem 
                        leftAvatar={descIcon} 
                        primaryText="Units:" 
                        secondaryText={<span className="list-secondary-text"> {this.state.courseOutline.units} </span>} 
                        className="list-override"
                      />
                      <Divider />
                      <ListItem 
                        leftAvatar={descIcon} 
                        primaryText="Description:" 
                        secondaryText={<span className="list-secondary-text"> {this.state.courseOutline.description} </span>} 
                        className="list-override"
                        secondaryTextLines={2}
                        onClick={this.descriptionOpen}
                      />
                    </List>
                  </MuiThemeProvider>
                </div>
              </div>

              {(this.state.courseOutline.prerequisites !== '') &&
                <div className="box-sizing">
                  <h3>Prerequisites</h3>
                  <div className="sub-box">
                    <MuiThemeProvider>
                      <List>
                        <ListItem 
                          leftAvatar={alertIcon} 
                          primaryText="Courses:" 
                          secondaryText={<span className="list-secondary-text"> {this.state.courseOutline.prerequisites} </span>} 
                          className="list-override"
                          secondaryTextLines={2}
                        />
                      </List>
                    </MuiThemeProvider>
                  </div>
                </div>
              }

              {(this.state.courseOutline.deliveryMethod === 'In Person') &&
                <div className="box-sizing">
                  <h3>Course Time + Location</h3>
                  <div className="sub-box">
                    <MuiThemeProvider>
                      <List>
                        {
                          this.state.courseOutline.courseSchedule.map((schedule, index) =>
                            <List key={`${schedule.campus}${index}`}> 
                              <ListItem 
                                leftAvatar={locIcon} 
                                primaryText="Location:" 
                                secondaryText={
                                  <span className="list-secondary-text"> 
                                    {
                                      schedule.campus + ' ' + 
                                      schedule.buildingCode +
                                      schedule.roomNumber
                                    } 
                                  </span>} 
                                className="list-override"
                              />
                              <ListItem 
                                leftAvatar={timeIcon} 
                                primaryText="Time:" 
                                secondaryText={
                                  <span className="list-secondary-text"> 
                                    {
                                      schedule.days + ' | ' +
                                      schedule.startTime + ' ~ ' +
                                      schedule.endTime
                                    } 
                                  </span>} 
                                className="list-override"
                              />
                              <Divider/>
                            </List>          
                          )
                        }
                        <ListItem 
                          leftAvatar={descIcon} 
                          primaryText="Section:" 
                          secondaryText={<span className="list-secondary-text"> {(this.state.mSelectedSection.sectionNum).toUpperCase() + '; ' + this.state.mSelectedSection.sectionCode} </span>} 
                          className="list-override"
                        />
                        </List>
                    </MuiThemeProvider>
                  </div>
                </div>
              }

              {(this.state.mSectionData.length > 0) &&
                <div className="box-sizing">
                  <h3>All Sections</h3>
                  <div className="sub-box">
                    <MuiThemeProvider>
                      <Table selectable={false} height={this.state.height} style={{borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}}>
                        <TableHeader>
                          <TableRow>
                            <TableHeaderColumn className="list-override">Section Code</TableHeaderColumn>
                            <TableHeaderColumn className="list-override">Number</TableHeaderColumn>   
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                            {this.state.mSectionData.map((row, index) => (
                                <TableRow key={row.sectionNum}>
                                    <TableRowColumn>{row.sectionCode}</TableRowColumn>
                                    <TableRowColumn>{row.name}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>

                      </Table>
                    </MuiThemeProvider>
                  </div>
                </div>
              }

              <div className="footer"/>
          </div>
        );
      }
      
      return (
          <div className="spinner">
            <MuiThemeProvider>
              <RefreshIndicator
                size={100}
                left={centerX - (window.screen.width * 0.03)}
                loadingColor="red"
                top={centerY - (window.screen.height * 0.15)}
                status="loading"
              />
            </MuiThemeProvider>
          </div>
      );
    }
}

export default CourseOutline;
