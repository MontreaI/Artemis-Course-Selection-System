import * as React from 'react';
import { User } from '../types/interface';

interface Props {
    users: User[];
}

class UsernameValidator {
    public username: string;
    constructor(username: string) {    
        // You can add any validation you want here.
        if (!username) {
             throw new Error('Enter a username!');
        } 
        this.username = username; 
    }    
}

class SignUp extends React.Component<Props, {username: string, password: string}> {
    constructor(props: Props) {
        super(props);
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
    render() {
        return (
            <div className="form-signup">
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
                        onClick={() => this.SignUp()}
                    >
                        Register
                    </button>
                </div>
            </div>
        );
    }
}

export default SignUp;