import React from 'react';
import TextFieldGroup from './text_field_group';
import validateInput from '../validations/create_client_contact_validation';
import axios from 'axios';
class CreateContact extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			contactName: '',
		      contactPhone: '',
		      contactEmail: '',
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
      	userId : this.props.userId,
      	contactName : this.state.contactName,
      	contactPhone : this.state.contactPhone,
      	contactEmail : this.state.contactEmail
      }
      console.log(data);
      
      axios.put('/api/updateUserContact', data).then(function(res){
      	
      	this2.props.hideCreateContact();
      })
      
    }
  }
	render(){
		const{contactName, contactPhone, contactEmail, errors} = this.state;
		return(
			<div className="overlay" style={{position:'fixed',zIndex:10000}}>
          <div className="create-client-contact-popup animated fadeInUp">
            <div className="add-filter-title">Create Client Contact <i onClick={this.props.hideCreateContact} className="fa fa-close" /></div>
            <div className="client-contact-input-container">
            <TextFieldGroup
                      field="contactName"
                      label="Contact Name"
                      type="text"
                      value={contactName}
                      error={errors.contactName}
                      onChange={this.onChange.bind(this)}
                    />
                    <TextFieldGroup
                      field="contactPhone"
                      label="Contact Phone Number"
                      type="text"
                      value={contactPhone}
                      error={errors.contactPhone}
                      onChange={this.onChange.bind(this)}
                    />
                    <TextFieldGroup
                      field="contactEmail"
                      label="Contact Email"
                      type="text"
                      value={contactEmail}
                      error={errors.contactEmail}
                      onChange={this.onChange.bind(this)}
                    />
                    <div onClick={this.saveContact.bind(this)} className="save-client-btn">Save Contact</div><div onClick={this.props.hideCreateContact} className="add-filter-close-btn">close</div>
                    </div>

          </div>
        </div>
			);
	}
}
export default CreateContact;