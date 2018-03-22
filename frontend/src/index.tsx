import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CourseSelectionLayout from './components/course-selection-layout';
import SignUp from './components/SignUp';
import './index.css';
import CourseInformationForm from './components/course-information-form';
import CourseOutline from './components/course-outline/course-outline';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact={true} path="/" component={App} />
      <Route path="/course-info" component={CourseInformationForm} />
      <Route path="/course-selection-layout" component={CourseSelectionLayout} />
      <Route path="/signup" component={SignUp} />
      <Route path="/course-outline" component={CourseOutline} />
      <Route path="/course-outline/:id" component={CourseOutline} />
    </div>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
