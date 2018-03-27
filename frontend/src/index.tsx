import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CourseSelectionLayout from '../src/components/layouts/course-selection-layout';
import SignUp from '../src/components/pages/login/SignUp';
import './index.css';
import CourseOutline from './components/pages/course-outline/course-outline';

ReactDOM.render(
  <BrowserRouter>
    <div>
    <header><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" /></header>
      <Route exact={true} path="/" component={App} />
      <Route path="/course-outline" component={CourseOutline} />
      <Route path="/course-selection-layout" component={CourseSelectionLayout} />
      <Route path="/signup" component={SignUp} />
    </div>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
