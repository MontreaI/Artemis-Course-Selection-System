import * as React from 'react';
import Tree from 'react-d3-tree';
import './course-outline.css';

interface State {
}

const myTreeData = [
    {
      name: 'CMPT255',
      attributes: {
      },
      children: [
        {
          name: 'CMPT105',
          children: [
              {
                name: 'CMPT107',
              },
              {
                name: 'CMPT107',
              }
          ]
        },
        {
          name: 'CMPT106',
        },
      ],
    },
  ];

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
    x: 250,
    y: 250
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

class CourseOutline extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
          selectedIndex: 0,
          myChart: null
        }; 
    }

    componentDidMount() {
        global.console.log(this.props);
    }

    alertMe() {
        global.console.log(Node.name);
    }

    render() {
        return (
            <div className="treeWrapper" >
                <Tree data={myTreeData} onClick={this.alertMe} translate={position} nodeSvgShape={svgSquare} textLayout={anchor} orientation={'vertical'} styles={styles} pathFunc={'diagonal'}/>
            </div>
        );
        
    }
}

export default CourseOutline;
