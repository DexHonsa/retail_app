import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import validateInput from '../validations/login_validation';
import TextFieldGroup from './text_field_group';
import { userLogin } from '../../actions/auth_actions';
import UserSignup from './user_signup';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			username : '',
			password : '',
			errors : {}, 
			isLoading : '',
			signupPopup: false
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	isValid(){
		const { errors, isValid } = validateInput(this.state);
		if(!isValid){
			this.setState({
				errors : errors
			})
		}
		return isValid;
	}
	onChange(e){
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	onSubmit(e){
		if(this.isValid()){
			e.preventDefault();
			this.setState({errors: {}, isLoading: true});
			this.props.userLogin(this.state).then(
				(res) => browserHistory.push('/admin/users'),
				(err) => this.setState({errors: err.response.data.errors, isLoading: false})
				);
		}
	}
	openSignUp(){
		this.setState({
			signupPopup: true
		})
	}
	hideSignupPopup(){
		this.setState({
			signupPopup: false
		})
	}
	render(){
		var signupPopup;
		if(this.state.signupPopup){
			signupPopup = <UserSignup hideSignupPopup={this.hideSignupPopup.bind(this)} />
		}

		const {username, password, errors} = this.state;
		return(

					<div className="login-box">
					{signupPopup}
		              <div className="login-title">Sign in to SiteMap</div>
		              <div className="login-username">
		                <div className="login-label">Your Email Address</div>

		                {/*<input value={this.state.username} onChange={this.onChange.bind(this)} name="username" type="text" />*/}
		                <TextFieldGroup
		                	field="username"
		                	label="username"
		                	type="text"
		                	value={username}
		                	error={errors.username}
		                	onChange={this.onChange}
		                />
		              </div>
		              <div className="login-username">
		                <div className="login-label">Password</div>
		                <TextFieldGroup
		                	field="password"
		                	label="password"
		                	type="password"
		                	value={password}
		                	error={errors.password}
		                	onChange={this.onChange}
		                />
		                {errors.form && <div className="alert alert-danger">{errors.form}</div>}
		              </div>
		              <div className="forgot-password">forgot password?</div>

		              <div onClick={this.onSubmit} className="login-btn">Login</div>
		              <div onClick={this.openSignUp.bind(this)} className="signup-btn login-btn">Sign Up</div>

		            </div>

			);
	}
}
export default connect((state) => {return {} }, { userLogin })(LoginForm);