import * as React from 'react';

import './App.css';
import CourseList from './components/course-list';
import YearList from './components/course-selection-page';
import SignUp from './components/signup';
import { Year, Course } from './types/interface';
const logo = require('./logo.svg');

interface State {
  courses: Course[];
  years: Year[];
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      courses: [],
      years: []
    };
  }

  componentDidMount() {
      // @TODO: Need to turn this into a module to fetch
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
      this.setState({years: data});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <YearList years={this.state.years} />
      </div>
    );
  }
}

export default App;
