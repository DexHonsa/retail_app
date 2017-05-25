import React from 'react';
import TextFieldGroup from './text_field_group';
import validateInput from '../validations/forgot_password_validation';
import {userSignup} from '../../actions/auth_actions';
import axios from 'axios';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

class ForgotPassword extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			    userFirstName: '',
          userLastName: '',
		      userEmail: '',
		      userPassword: '',
		      userPasswordConfirm: '',
          errors: {}
		}
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
	makeId(){

	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;

	}

  submitForgotPassword(e){
		var token = this.makeId();
  	var this2 = this;
		var data;
    if(this.isValid()){
			console.log('hit')
      e.preventDefault();
      this.setState({errors: {}});
			data = {
				userEmail: String(this.state.userEmail).toLowerCase(),
				token: token,
				errors: this.state.errors
			}
			axios.post('/api/userForgotPassword', data).then(function(res){
				console.log(res);
				var data = {email:String(this2.state.userEmail).toLowerCase(),token:token}

				axios.post('/api/forgotPasswordMailer', data).then(function(res){
					console.log(res);

				})
				this2.props.hideForgotPasswordPopup();

			})
      // this.props.userForgotPassword({
			// 	userEmail: String(this.state.userEmail).toLowerCase(),
			// 	errors: this.state.errors
			//
			// }).then(
      //   (res) => browserHistory.push('/admin/users'),
      //   (err) => this.setState({errors: err.response.data.errors})
      //   );
    }
  }
	render(){
		const{userFirstName,userLastName, userEmail, userPassword, userPasswordConfirm, errors} = this.state;
		return(
			<div className="overlay" style={{position:'fixed',zIndex:10000, top:0,left:0}}>
          <div className="create-client-contact-popup animated-slow bounceInUp" style={{width:350}}>
            <div className="add-filter-title" style={{textAlign:'center'}}>Recover Password <i onClick={this.props.hideForgotPasswordPopup} className="fa fa-close" /></div>
            <div className="signup-disclaimer">Please enter your email address. </div>
            <div className="client-contact-input-container">

                    <TextFieldGroup
                      field="userEmail"
                      label="Email"
                      type="text"
                      value={userEmail}
                      error={errors.userEmail}
                      onChange={this.onChange.bind(this)}
                    />

                     {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                    <div onClick={this.submitForgotPassword.bind(this)} className="save-client-btn">Send Recovery Email</div><div onClick={this.props.hideForgotPasswordPopup} className="add-filter-close-btn">Cancel</div>
                    </div>

          </div>
        </div>
			);
	}
}
export default connect((state) => {return {} })(ForgotPassword);
