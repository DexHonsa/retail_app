import React from 'react';
import $ from 'jquery';
import validateInput from '../validations/login_validation';
import TextFieldGroup from './text_field_group';
import axios from 'axios';
import logo from '../../../images/sitemap_logo.png';
import {connect} from 'react-redux';
import { userLogin } from '../../actions/auth_actions';

class LoginHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username : '',
			password : '',
			errors : {}, 
			isLoading : ''
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
			var data = this.state;
			var that = this;

			e.preventDefault();

			this.props.userLogin(this.state);
			
			// $.ajax({
	  //       type: "POST",
	  //       data: JSON.stringify(data),
	  //       url: "/api/login",
	  //       success: function(data) {
	  //       	console.log(data)
	  //       	const token = data.token;
	  //       	localStorage.setItem('jwtToken', token);
	  //       },
	  //       error: function(data){
	  //       	that.setState({
	  //           	errors : data.responseJSON.errors
	  //           })
	  //       },
	  //       dataType: "json",
	  //       contentType: "application/json"
	  //   	});
		}
	}
	render() {
		const {username, password, errors, isLoading} = this.state;
		return(
			<div className="wrapper">
		        <header className="header">
		          <div className="container-fluid">
		            <div className="logo"><img style={{height: 20, display: 'inline-block', lineHeight: 50}} src={logo} /></div>
		            <div className="main-nav">
		            </div>
		          </div>
		        </header>{/* /.header */}
		        <div className="stage">
		          <div className="main-message">Retail Redefined.<br /><span style={{fontSize: '30pt'}}>Site selection made easy.</span></div>
		          <div className="login-container">
		            <div className="login-box">
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
		              <div onClick={this.onSubmit.bind(this)} className="login-btn">Login</div>
		            </div>
		          </div>
		        </div>
		      </div>

			);
	}	
}


export default connect((state) => {return {} }, { userLogin })(LoginHome);
