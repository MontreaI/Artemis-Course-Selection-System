import * as React from 'react';
import './App.css';
import CourseSelectionLayout from './components/course-selection-layout';

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
