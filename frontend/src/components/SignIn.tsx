import * as React from 'react';
// import { Users } from '../types/interface';
import * as PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

interface State {
    username: string; 
    password: string;
}

class SignIn extends React.Component<{}, State> {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
            username: '',
            password: ''
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
    loadPage(): void {
        this.context.router.history.push({
         pathname: '/course-selection-form',
         state: {
           }
       });
     }
 
    render() {
        return (
            <div className="form-signin">
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
                    <Link to={'/course-selection-layout'}>
                        Log In
                    </Link>
                </div>
            </div>
        );
    }
}

export default SignIn;