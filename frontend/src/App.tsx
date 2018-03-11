import * as React from 'react';
import './App.css';
<<<<<<< 04c3eeb13ee6c35ac74cb5f8d1155fc8bc5740d4
import CourseSelectionLayout from './components/course-selection-layout';
import CourseInformationForm from './components/course-information-form';
import { BrowserRouter, Route, Link } from 'react-router-dom';
=======
import CourseList from './components/course-list';
import YearList from './components/course-selection-page';
import SignUp from './components/SignUp'
import { Year, Course } from './types/interface';

const logo = require('./logo.svg');

>>>>>>> initial attempt, not working
interface State {
}

class App extends React.Component<{}, State> {
  
  render() {
    return (
      <div className="App">
       <header><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" /></header>
        <CourseSelectionLayout/>
      </div>
    );
  }
}

export default App;
