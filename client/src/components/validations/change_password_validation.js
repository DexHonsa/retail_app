import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	var errors = {};

	if(Validator.isEmpty(data.oldPassword)){
		errors.oldPassword = "This field is required";
	}
	if(Validator.isEmpty(data.password)){
		errors.password = "This field is required";
	}
	if(Validator.isEmpty(data.passwordConfirm)){
		errors.passwordConfirm = "This field is required";
	}
	if(!Validator.equals(data.password, data.passwordConfirm)){
		errors.passwordConfirm = "Passwords Don't Match";
	}
	
	
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
}