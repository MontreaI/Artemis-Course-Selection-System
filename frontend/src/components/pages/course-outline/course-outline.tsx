import * as React from 'react';
import Tree from 'react-d3-tree';
import './course-outline.css';
import Course from './course';
import CourseNode from './course-node';
import CourseApi from '../../../utils/course-api';
import CSection from './csection';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

interface State {
  mYearSelected: string;
  mTermSelected: string;
  mDepartmentSelected: string;
  mCourseNumberSelected: string;
  mCourseSection: CSection[];
  courseTree: Course[];
  courseOutline: Course;
  api: CourseApi;
}

interface CourseOutlineProps extends RouteComponentProps<CourseOutline> {
}

const myTreeData = [
    {
      name: 'CMPT 255',
      children: [
        {
          name: 'CMPT106',
          children: [
            {
              name: 'CMPT101',
            },
            {
              name: 'CMPT102',
            },
          ],
        },
        {
          name: 'CMPT105',
        },
      ],
    },
];

// global.console.log(myTreeData);
// global.console.log(nodeTree);

// * STYLING *//
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
    x: 1000,
    y: 100
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
// * END OF STYLING *//

class CourseOutline extends React.Component<RouteComponentProps<CourseOutline>, State> {

    constructor(props: RouteComponentProps<CourseOutline>) {
        super(props);
        this.state = {
          mYearSelected: this.props.location.state.mYearSelected,
          mTermSelected: this.props.location.state.mTermSelected,
          mDepartmentSelected: this.props.location.state.mDepartmentSelected,
          mCourseNumberSelected: this.props.location.state.mCourseNumberSelected,
          mCourseSection: this.props.location.state.mCourseSection,
          courseOutline: new Course('CMPT', '222'),
          courseTree: [],
          api: new CourseApi(),
        }; 
    }

    componentWillMount() {
      global.console.log('course-outline comp being mounted');
      this.fetchOutline();
    }

    // Constructs tree
    fetchOutline() {
      let mSection = this.getMainSection(this.state.mCourseSection);
      this.state.api.getCourseOutline(this.state.mYearSelected, this.state.mTermSelected, this.state.mDepartmentSelected, this.state.mCourseNumberSelected, mSection).then(data => {
          data.parsePrerequisites();
          
          var tree: Course[] = [];
          tree[0] = data;

          this.setState({courseTree: tree});
          this.setState({courseOutline: data});
      });
    }

    getMainSection(sections: CSection[]): string {
      let mSection = '';

      for (var section of sections) {
        if (section.sectionCode === 'LEC' || section.sectionCode === 'SEM') {
          return mSection = section.sectionNum;
        }
      }

      return mSection = sections[0].sectionNum;
    }

    // Dummy function right now
    alertMe(node: Course) {
      global.console.log(node.name);
    }

    render() {

      if (this.state.courseTree.length > 0) {
        return (
          <div className="Wrapper">
              <div className="treeWrapper">
                <Tree data={this.state.courseTree} onClick={this.alertMe} translate={position} nodeSvgShape={svgSquare} textLayout={anchor} orientation={'vertical'} styles={styles} pathFunc={'diagonal'}/>
              </div>

              {(this.state.courseOutline.prerequisites !== '') &&
                <div>
                  <h1>Prerequisites</h1>
                  <span>{this.state.courseOutline.prerequisites}</span>
                </div>
              }

              <div>
                <h1>Overview</h1>
                <ul>
                  <li>Title: {this.state.courseOutline.title}</li>
                  <li>Department: {this.state.courseOutline.dept}</li>
                  <li>Course Number: {this.state.courseOutline.number}</li>
                  <li>Term: {this.state.courseOutline.term}</li>
                  <li>Degree Level: {this.state.courseOutline.degreeLevel}</li>
                  <li>Delivery Method: {this.state.courseOutline.deliveryMethod}</li>
                  <li>Units: {this.state.courseOutline.units}</li>
                  <li>Description: {this.state.courseOutline.description}</li>
                </ul>
              </div>

                <div>
                <h1>Course Time + Location</h1>
                {this.state.courseOutline.courseSchedule.map((schedule, index) =>
                    <ul key={`scheduleList${index}`}>
                        <li key={`schedulecampus${index}`}>Campus: {schedule.campus}</li>
                        <li key={`schedulebuilding${index}`}>Building code: {schedule.buildingCode}</li>
                        <li key={`scheduleroom${index}`}>Room Number: {schedule.roomNumber}</li>
                        <li key={`scheduledays${index}`}>Days: {schedule.days}</li>
                        <li key={`schedulestart${index}`}>Start Time: {schedule.startTime}</li>
                        <li key={`scheduleend${index}`}>End Time: {schedule.endTime}</li>
                    </ul>)
                  }
                </div>
              
          </div>
        );
      }
      
      return <h1>Loading</h1>;
    }
}

export default withRouter(CourseOutline);
