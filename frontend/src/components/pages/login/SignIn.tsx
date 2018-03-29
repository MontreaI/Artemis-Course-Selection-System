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
    onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({username: e.target.value});
    }

    onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({password: e.target.value});
    }

    loadPage(): void {
        this.context.router.history.push({
         pathname: '/course-selection-form',
         state: {
           }
       });
     }
     
    authenticate() {
        this.setState({}, () => {
            this.state.api.getUserPassword(this.state.username, this.state.password, this.state.email);
        });
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
                    <input type="submit" className="button" value="Log in" />
                    <Link to={'/course-selection-layout'}>
                        Log In
                    </Link>
                    <input type="submit" className="button" value="Log in" />
                    <br />
                    <Link to={'/signup'}>
                        Don't Have an Account?
                    </Link>
                </div>
            </div>
        );
    }
}

export default SignIn;