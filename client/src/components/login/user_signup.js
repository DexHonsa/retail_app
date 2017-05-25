import React from 'react';
import TextFieldGroup from './text_field_group';
import validateInput from '../validations/user_signup_validation';
import {userSignup} from '../../actions/auth_actions';
import axios from 'axios';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

class UserSignup extends React.Component{
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


  submitUserSignup(e){
  	var this2 = this;

    if(this.isValid()){
      e.preventDefault();
      this.setState({errors: {}});
      this.props.userSignup({
				userFirstName:this.state.userFirstName,
				userLastName: this.state.userLastName,
				userEmail: String(this.state.userEmail).toLowerCase(),
				userPassword: this.state.userPassword,
				userPasswordConfirm: this.state.userPasswordConfirm,
				errors: this.state.errors

			}).then(
        (res) => browserHistory.push('/admin/users'),
        (err) => this.setState({errors: err.response.data.errors})
        );
    }
  }
	render(){
		const{userFirstName,userLastName, userEmail, userPassword, userPasswordConfirm, errors} = this.state;
		return(
			<div className="overlay" style={{position:'fixed',zIndex:10000, top:0,left:0}}>
          <div className="create-client-contact-popup animated-slow bounceInUp" style={{width:350}}>
            <div className="add-filter-title" style={{textAlign:'center'}}>Sign Up <i onClick={this.props.hideSignupPopup} className="fa fa-close" /></div>
            <div className="signup-disclaimer">Sign up for your free 30 day trial of SiteMap!  Were pleased you want to explore the exciting benefits of SiteMap.  </div>
            <div className="client-contact-input-container">
                    <TextFieldGroup
                      field="userFirstName"
                      label="First Name"
                      type="text"
                      value={userFirstName}
                      error={errors.userFirstName}
                      onChange={this.onChange.bind(this)}
                    />
                    <TextFieldGroup
                      field="userLastName"
                      label="Last Name"
                      type="text"
                      value={userLastName}
                      error={errors.userLastName}
                      onChange={this.onChange.bind(this)}
                    />
                    <TextFieldGroup
                      field="userEmail"
                      label="Email"
                      type="text"
                      value={userEmail}
                      error={errors.userEmail}
                      onChange={this.onChange.bind(this)}
                    />
                    <TextFieldGroup
                      field="userPassword"
                      label="Password"
                      type="password"
                      value={userPassword}
                      error={errors.userPassword}
                      onChange={this.onChange.bind(this)}
                    />
                    <TextFieldGroup
                      field="userPasswordConfirm"
                      label="Confirm Password"
                      type="password"
                      value={userPasswordConfirm}
                      error={errors.userPasswordConfirm}
                      onChange={this.onChange.bind(this)}
                    />
                     {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                    <div onClick={this.submitUserSignup.bind(this)} className="save-client-btn">Sign Up</div><div onClick={this.props.hideSignupPopup} className="add-filter-close-btn">Cancel</div>
                    </div>

          </div>
        </div>
			);
	}
}
export default connect((state) => {return {} }, { userSignup })(UserSignup);
