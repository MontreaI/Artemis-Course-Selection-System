import * as React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import CourseList from './components/course-list';
import YearList from './components/course-selection-page';
import { Year, Course } from './types/interface';
const logo = require('./logo.svg');

interface State {
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

  render() {
    const { showSignIn, showSignUp } = this.state;
    return (
      <div className="App">
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
      </div>
    );
  }
}
export default App;
