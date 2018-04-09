import * as React from 'react';
import { User } from '../../../types/interface';
import * as PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import './SignIn.css';
import SignInApi from '../../../utils/signin-api';

interface State {
    username: string;
    email: string; 
    password: string;
    conPass: string;
    created: boolean;
    api: SignInApi;
}

class SignUp extends React.Component<{}, State> {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
            username: '',
            email: '',
            password: '',
            conPass: '',
            created: false,
            api: new SignInApi()
        };
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onConPassChange = this.onConPassChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.emailRegexCheck = this.emailRegexCheck.bind(this);
        this.confirmPass = this.confirmPass.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.goBack = this.goBack.bind(this);
        this.register = this.register.bind(this);
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
        global.console.log(this.state.username);
    }

    onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({password: e.target.value});
    }

    onConPassChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({conPass: e.target.value});
    }

    onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({email: e.target.value.toLowerCase()});
    }

    emailRegexCheck() {
        const emailRegex = /\S+@\S+\.\S+/;
        if ((this.state.username !== '') && (this.state.password !== '') && (this.state.email !== '')) {
            if (emailRegex.test(this.state.email)) {
                this.confirmPass();
            } else {
                alert('Email not valid!');
            }
        } else {
            alert('Please fill all fields');
        }
        
    }

    loadPage(): void {
        this.context.router.history.push({
            pathname: '/course-selection-layout',
            state: {
            }
        });
    }

    goBack(): void {
        this.context.router.history.push({
            pathname: '/signin',
            state: {
            }
        });
    }
    confirmPass() {
        if (this.state.password.length < 4) {
            alert('Password length is less than 4 characters long! Enter a longer password');
        } else {
            if (this.state.password === this.state.conPass) {
                this.register();
            } else {
                alert('Passwords do not match! Please enter passwords again');
                this.setState({password: '', conPass: ''});
            }
        }
    }
    register() {
        this.state.api.createAccount(this.state.username, this.state.password, this.state.email).then(data => {
            this.setState({created: data});
            if (data === true) {
                this.loadPage();
            } else {
                alert('There is a problem creating your account. Try a different username');
            }      
        });   
    }   
    render() {
        return (
            <div className="form-signup">
                <h1>Artemis</h1>
                <div className="form-information">
                    <h2>Register Account</h2>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="username"
                        onChange={this.onUsernameChange}
                    />
                    <br />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="email"
                        onChange={this.onEmailChange}
                    />
                    <br />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="password"
                        onChange={this.onPasswordChange}
                    />
                    <br />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="confirm password"
                        onChange={this.onConPassChange}
                    />
                    <br />
                    <button onClick={this.emailRegexCheck}>
                        Sign Up
                    </button>
                    <br />
                    <button onClick={this.goBack}>
                        Go back
                    </button>
                </div>
            </div>
        );
    }
}

export default SignUp;