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

global.console.log(myTreeData);
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

    componentDidMount() {
      global.console.log('mounted');
      this.fetchOutline();
    }

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

      return mSection;
    }

    alertMe(node: Course) {
      global.console.log(node.name);
    }

    render() {

      if (this.state.courseTree.length > 0) {
        return (
          <div className="treeWrapper" >
              <Tree data={this.state.courseTree} onClick={this.alertMe} translate={position} nodeSvgShape={svgSquare} textLayout={anchor} orientation={'vertical'} styles={styles} pathFunc={'diagonal'}/>
          </div>
        );
      }
      
      return <h1>Loading</h1>;
    }
}

export default withRouter(CourseOutline);
