import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	var errors = {};

	if(Validator.isEmpty(data.userEmail)){
		errors.userEmail = "This field is required";
	}
	


	return {
		errors,
		isValid: isEmpty(errors)
	};
}
