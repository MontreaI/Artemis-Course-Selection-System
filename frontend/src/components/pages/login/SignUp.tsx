import * as React from 'react';
import { User } from '../../../types/interface';
import * as PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './SignIn.css';

interface State {
    username: string; 
    password: string;
    conPass: string;
}

class SignUp extends React.Component<{}, State> {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            conPass: ''
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
    register() {
        alert('Email address is ' + this.state.username + ' Password is ' + this.state.password);            
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
                        onChange={event => this.validateUsername && this.setState({username: event.target.value})}
                    />
                    <br />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="password"
                        onChange={event => this.validatePassword && this.setState({password: event.target.value})}
                    />
                    <br />
                    <input
                        className="form-input"
                        type="conPass"
                        placeholder="confirm password"
                        onChange={event => this.validatePassword && this.setState({conPass: event.target.value})}
                    />
                    <br />
                    <Link to={'/course-selection-layout'}>
                        Register
                    </Link>
                </div>
            </div>
        );
    }
}

export default SignUp;