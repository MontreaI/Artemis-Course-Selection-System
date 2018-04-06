import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import './SignIn.css';
import SignInApi from '../../../utils/signin-api';

interface State {
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
            email: '',
            sent: false,
            api: new SignInApi(),
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.userRegret = this.userRegret.bind(this);
    }

    onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({email: e.target.value});
    }

    loadPage(): void {
        this.context.router.history.push({
            pathname: '/signin',
            state: {
            }
        });
     }
     
    authenticate() {
        this.state.api.getUserPassword('', '', this.state.email).then(data => {
            this.setState({sent: data});
            if (this.state.sent === true) {
                this.loadPage();
            } else {
                alert('Email is not registered');
                this.setState({email: ''});
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