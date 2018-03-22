import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import CourseOutline from './components/course-outline/course-outline';
import CourseInformationForm from './components/course-information-form';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact={true} path="/" component={App} />
      <Route path="/course-outline/:id" component={CourseOutline} />
      <Route path="/course-info" component={CourseInformationForm} />
    </div>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
