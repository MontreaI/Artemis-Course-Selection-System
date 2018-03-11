import * as React from 'react';

class SignUp extends Component {
	constructor(props){
		super(props);
		this.state= {
			email:''
			password:''
		}
	}
	signUp() {
		console.log('this.state', this.state)
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
						onChange={event => this.setState({email: event.target.value})}
					/>
					<input
						className="form-input"
						type="password"
						placeholder="password"
						onChange={event => this.setState({password: event.target.value})}
					/>
					<button
						className = "btn-enter"
						type="button"
						onClick = {() => this.signUp()}
					>
						Register
					</button>
				</div>
			</div>
		)
	}
}
export default SignUp