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
			this.props.userLogin({
				username : String(this.state.username).toLowerCase(),
				password : this.state.password,
				errors : this.state.errors,
				isLoading : this.state.isLoading,
				signupPopup: this.state.signupPopup
			}).then(
				(res) => browserHistory.push('/map'),
				(err) => this.setState({errors: err.response.data.errors, isLoading: false})
				);
		}
	}
	setClientId(){
    if(this.props.auth.user.role === 'Basic'){
      this.props.setCurrentClient(this.props.auth.user.associated_clients[0].value, this.props.auth.user.associated_clients[0].label)
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

		                <input style={{display:'none'}} name="username" type="text" />
										<input style={{display:'none'}}  name="password" type="text" />
		                <TextFieldGroup
		                	field="username"
		                	label="Email Address"
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
		                	label="Password"
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
