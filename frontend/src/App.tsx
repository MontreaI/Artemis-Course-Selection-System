import * as React from 'react';
<<<<<<< edab547602d0c348f2625bf303116c6c0b21f238
=======
import { Route, Link, BrowserRouter } from 'react-router-dom';
>>>>>>> Merged individual pages into individual buttons + Cleanup
import './App.css';
<<<<<<< 04c3eeb13ee6c35ac74cb5f8d1155fc8bc5740d4
import CourseSelectionLayout from './components/course-selection-layout';
import CourseInformationForm from './components/course-information-form';
import { BrowserRouter, Route, Link } from 'react-router-dom';
=======
import CourseList from './components/course-list';
import YearList from './components/course-selection-page';
import { Year, Course } from './types/interface';
const logo = require('./logo.svg');

>>>>>>> initial attempt, not working
interface State {
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
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showSignIn: false,
      showSignUp: false,
      courses: [],
      years: [],
      username: '',
      password: ''
    };
  }
  
  authenticate() {
    alert('Your username is ' + this.state.username + ' Password is ' + this.state.password);
    this.setState({showSignIn: false});                
  }

  validateUsername() {
    if (!this.state.username) {
        throw new Error('Enter Username');
    }
  }
  
  validatePassword() {
    if (!this.state.password) {
        throw new Error('Enter Password');
    }
  }

  register() {
    alert('You are now registered as ' + + this.state.username + ' Password is ' + this.state.password);
    this.setState({showSignIn: false});          
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
    const { showSignIn, showSignUp } = this.state;
    return (
      <div className="App">
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
      </div>
    );
  }
}
export default App;
