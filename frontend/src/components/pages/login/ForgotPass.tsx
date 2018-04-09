import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import './SignIn.css';
import SignInApi from '../../../utils/signin-api';

interface State {
    username: string;
    email: string;
    sent: boolean;
    api: SignInApi;
}

class ForgotPass extends React.Component<{}, State> {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
            username: '',
            email: '',
            sent: false,
            api: new SignInApi(),
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.userRegret = this.userRegret.bind(this);
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
    
    onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({email: e.target.value.toLowerCase()});
    }

    onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({username: e.target.value.toLowerCase()});
    }

    loadPage(): void {
        this.context.router.history.push({
            pathname: '/signin',
            state: {
            }
        });
     }
     
    authenticate() {
        this.state.api.getUserEmailSent(this.state.username, this.state.email).then(data => {
            if (data === true) {
                alert('Email sent to ' + this.state.email);
                this.loadPage();
            } else {
                alert('Username registered to email is not valid');
            }
        });
    }

    userRegret(): void {
        this.context.router.history.push({
            pathname: '/signup',
            state: {
            }
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
                        placeholder="email"
                        onChange={this.onEmailChange}
                    />
                    <br />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="username"
                        onChange={this.onNameChange}
                    />
                    <br />
                    <button onClick={this.authenticate}>
                        Send Password
                    </button>
                    <br />
                    <button onClick={this.userRegret}>
                        Don't Have an Account?
                    </button>
                </div>
            </div>
        );
    }
}

export default ForgotPass;