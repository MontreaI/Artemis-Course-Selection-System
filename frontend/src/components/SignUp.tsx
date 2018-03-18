import * as React from 'react';
import { User } from '../types/interface';

interface Props {
    users: User[];
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