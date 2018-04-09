import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import './SignIn.css';
import SignInApi from '../../../utils/signin-api';

interface State {
    username: string; 
    password: string;
    email: string;
    authenticated: boolean;
    api: SignInApi;
}

class SignIn extends React.Component<{}, State> {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            email: '',
            authenticated: false,
            api: new SignInApi(),
        };
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.goSignUp = this.goSignUp.bind(this);
        this.goForgot = this.goForgot.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }
    
    componentWillMount() {
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            this.context.router.history.push({
                pathname: '/course-selection-layout',
                state: {
                }
            });
        }
    }
    onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({username: e.target.value.toLowerCase()});
    }

    onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({password: e.target.value});
    }

    loadPage(): void {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', this.state.username);
        this.context.router.history.push({
            pathname: '/course-selection-layout',
            state: {
            }
        });
    }
    
    goSignUp() {
        this.context.router.history.push({
            pathname: '/signup',
            state: {
            }
        });
    }

    goForgot() {
        this.context.router.history.push({
            pathname: '/forgotpass',
            state: {
            }
        });
    }

    authenticate() {
        global.console.log(this.state.authenticated);
        if ((this.state.password === '') && (this.state.username === '')) {
            alert('Please fill all fields!');
        } else if (this.state.username === '') {
            alert('Enter a username!');
        } else if (this.state.password === '') {
            alert('Enter a password!');
        } else { 
            this.state.api.getUserPassword(this.state.username, this.state.password).then(data => {
                this.setState({authenticated: data});
                if (data === true) {
                    this.loadPage();
                } else {
                    alert('Incorrect Credentials');
                }
            });
        }
    }
    
    render() {
        return (
            <div className="form-signin">
                <h1>Artemis</h1>
                <div className="form-information">
                    <h2>Please Enter Your Credentials</h2>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="username"
                        onChange={this.onUsernameChange}
                    />
                    <br />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="password"
                        onChange={this.onPasswordChange}
                    />
                    <br />
                    <button onClick={this.authenticate}>
                        Log In
                    </button>
                    <br />
                    <button onClick={this.goSignUp}>
                        Sign Up
                    </button>
                    <br />
                    <button onClick={this.goForgot}>
                        Forgot Password
                    </button>
                </div>
            </div>
        );
    }
}

export default SignIn;