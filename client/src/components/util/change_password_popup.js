import React from 'react';
import TextFieldGroup from './text_field_group';
import validateInput from '../validations/change_password_validation';
import axios from 'axios';

class ChangePassword extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			contactName: '',
		      password: '',
		      passwordConfirm: '',
          oldPassword: '',
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
  saveContact(e){
  	var this2 = this;
    if(this.isValid()){
      e.preventDefault();
    
      var data = {
        oldPassword: this.state.oldPassword,
      	newPassword : this.state.password
      }
      
      
      axios.put('/api/updateUser', data).then(function(res){
      	
      	this2.props.hideChangePasswordPopup();
      })
      
    }
  }
	render(){
		const{password, passwordConfirm, oldPassword, errors} = this.state;
		return(
			<div className="overlay" style={{position:'fixed',zIndex:10000}}>
          <div className="create-client-contact-popup animated fadeInUp">
            <div className="add-filter-title">Change Your Password {/*<i onClick={this.props.hideChangePasswordPopup} className="fa fa-close" />*/}</div>
            <div className="client-contact-input-container">
                  <TextFieldGroup
                      field="oldPassword"
                      label="Old Password"
                      type="password"
                      value={oldPassword}
                      error={errors.oldPassword}
                      onChange={this.onChange.bind(this)}
                    />
                  <TextFieldGroup
                      field="password"
                      label="New Password"
                      type="password"
                      value={password}
                      error={errors.password}
                      onChange={this.onChange.bind(this)}
                    />
                    <TextFieldGroup
                      field="passwordConfirm"
                      label="Confirm Password"
                      type="password"
                      value={passwordConfirm}
                      error={errors.passwordConfirm}
                      onChange={this.onChange.bind(this)}
                    />
                    {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                    <div onClick={this.saveContact.bind(this)} className="save-client-btn">Change Password</div>{/*<div onClick={this.props.hideChangePasswordPopup} className="add-filter-close-btn">close</div>*/}
                    </div>

          </div>
        </div>
			);
	}
}
export default ChangePassword;