import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	var errors = {};

	if(Validator.isEmpty(data.user_email)){
		errors.user_email = "This field is required";
	}
	if(!Validator.isEmail(data.user_email)){
		errors.user_email = "This field is required";
	}
	
	
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
}