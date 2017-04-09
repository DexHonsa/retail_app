import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	var errors = {};
	if(Validator.isEmpty(data.userFirstName)){
		errors.userFirstName = "This field is required";
	}
	if(Validator.isEmpty(data.userLastName)){
		errors.userLastName = "This field is required";
	}
	if(Validator.isEmpty(data.userEmail)){
		errors.userEmail = "This field is required";
	}
	if(Validator.isEmpty(data.userPassword)){
		errors.userPassword = "This field is required";
	}
	if(Validator.isEmpty(data.userPasswordConfirm)){
		errors.userPasswordConfirm = "This field is required";
	}
	if(!Validator.equals(data.userPassword, data.userPasswordConfirm)){
		errors.userPasswordConfirm = "Passwords Don't Match";
	}
	
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
}