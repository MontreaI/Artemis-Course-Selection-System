import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CourseSelectionLayout from '../src/components/layouts/course-selection-layout';
import SignUp from '../src/components/pages/login/SignUp';
import SignIn from '../src/components/pages/login/SignIn';
import ForgotPass from '../src/components/pages/login/ForgotPass';
import './index.css';
import CourseOutline from './components/pages/course-outline/course-outline';
import WeeklyView from './components/calendar/weekly';

ReactDOM.render(
  <BrowserRouter>
    <div>
    <header>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="http://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet" type="text/css"/>
      </header>
      <Route exact={true} path="/" component={App} />
      <Route path="/course-outline/:id" component={CourseOutline} />
      <Route path="/course-selection-layout" component={CourseSelectionLayout} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/forgotpass" component={ForgotPass} />
      <Route path="/weekly" component={WeeklyView} />
    </div>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
