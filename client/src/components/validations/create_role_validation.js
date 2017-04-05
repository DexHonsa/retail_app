import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	var errors = {};

	if(Validator.isEmpty(data.role_name)){
		errors.role_name = "This field is required";
	}
	
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
}