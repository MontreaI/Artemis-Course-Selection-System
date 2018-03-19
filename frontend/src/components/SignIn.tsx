import * as React from 'react';
import { User } from '../types/interface';

interface Props {
    users: User[];
}

class SignIn extends React.Component<Props, {username: string, password: string}> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    authenticate() {
        alert('Email address is ' + this.state.username + ' Password is ' + this.state.password);            
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
        );
    }
}

export default SignIn;