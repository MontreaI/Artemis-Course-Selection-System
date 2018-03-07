import * as React from 'react';

import './App.css';
import CourseList from './components/course-list';
import { Course } from './types/course';

const logo = require('./logo.svg');

interface State {
  courses: Course[];
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3376/test')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Could not fetch from server');
      }
    })
    .then(data => {
      global.console.log('got stuff from server');
      this.setState({courses: data});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <CourseList courses={this.state.courses} />
      </div>
    );
  }
}

export default App;
