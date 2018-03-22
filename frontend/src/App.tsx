import * as React from 'react';
import './App.css';
import CourseSelectionLayout from './components/course-selection-layout';
import CourseInformationForm from './components/course-information-form';
import CourseList from './components/course-list';
import { Year, Course } from './types/interface';
const logo = require('./logo.svg');
import SignIn from './components/SignIn';

interface State {
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <header>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </header>
        <SignIn/>
      </div>
    );
  }
}
export default App;
