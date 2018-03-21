import * as React from 'react';
<<<<<<< edab547602d0c348f2625bf303116c6c0b21f238
=======
import { Route, Link, BrowserRouter } from 'react-router-dom';
>>>>>>> Merged individual pages into individual buttons + Cleanup
import './App.css';
<<<<<<< 04c3eeb13ee6c35ac74cb5f8d1155fc8bc5740d4
import CourseSelectionLayout from './components/course-selection-layout';
<<<<<<< dca8490faa26afd10da91519491f99da7f15e801
import CourseInformationForm from './components/course-information-form';
import { BrowserRouter, Route, Link } from 'react-router-dom';
=======
import CourseList from './components/course-list';
import YearList from './components/course-selection-page';
import { Year, Course } from './types/interface';
const logo = require('./logo.svg');
=======
import SignIn from './components/SignIn';
>>>>>>> added routing capabilities

>>>>>>> initial attempt, not working
interface State {
<<<<<<< dca8490faa26afd10da91519491f99da7f15e801
<<<<<<< edab547602d0c348f2625bf303116c6c0b21f238
}

class App extends React.Component<{}, State> {
  
=======
  showSignIn: boolean;
  showSignUp: boolean;
  courses: Course[];
  years: Year[];
  username: string;
  password: string;
=======
>>>>>>> added routing capabilities
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
<<<<<<< dca8490faa26afd10da91519491f99da7f15e801
      showSignIn: false,
      showSignUp: false,
      courses: [],
      years: [],
      username: '',
      password: ''
=======
>>>>>>> added routing capabilities
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

>>>>>>> Merged individual pages into individual buttons + Cleanup
  render() {
    return (
      <div className="App">
<<<<<<< dca8490faa26afd10da91519491f99da7f15e801
<<<<<<< edab547602d0c348f2625bf303116c6c0b21f238
       <header><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" /></header>
        <CourseSelectionLayout/>
=======
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <YearList years={this.state.years} />
        <div>
          <button onClick={() => this.setState({ showSignIn: !showSignIn, showSignUp: false })}>Log In</button>
            { showSignIn
              ? <div className="form-signin">
                <h2>Log In</h2>
                  <div className="form-information">
                    <input
                      className="form-input"
                      type="text"
                      placeholder="username"
                      onChange={event => this.setState({username: event.target.value})}
                    />
                    <input
                      className="form-input"
                      type="password"
                      placeholder="password"
                      onChange={event => this.setState({password: event.target.value})}
                    />
                    <button
                      className="btn-enter"
                      type="button"
                      onClick={() => this.authenticate()}
                    >
                    LogIn
                    </button>
                  </div>
                </div>
              : null
            }
        </div>
        <div>
          <button onClick={() => this.setState({ showSignUp: !showSignUp, showSignIn: false })}>SignUp</button>
          { showSignUp
            ? <div className="form-signup">
            <h1>Register Account</h1>
            <div className="form-information">
                <input
                  className="form-input"
                  type="text"
                  placeholder="username"
                  onChange={event => this.validateUsername && this.setState({username: event.target.value})}
                />
                <input
                  className="form-input"
                  type="password"
                  placeholder="password"
                  onChange={event => this.validatePassword && this.setState({password: event.target.value})}
                />
                <button
                  className="btn-enter"
                  type="button"
                  onClick={() => this.register()}
                >
                  Register
                </button>
              </div>
            </div>
            : null
            }
        </div> 
>>>>>>> Merged individual pages into individual buttons + Cleanup
=======
        <header>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </header>
        <SignIn/>
>>>>>>> added routing capabilities
      </div>
    );
  }
}
export default App;
