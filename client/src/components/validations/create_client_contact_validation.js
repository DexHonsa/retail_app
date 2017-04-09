import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	var errors = {};

	if(Validator.isEmpty(data.contactName)){
		errors.contactName = "This field is required";
	}
	if(Validator.isEmpty(data.contactPhone)){
		errors.contactPhone = "This field is required";
	}
	if(Validator.isEmpty(data.contactEmail)){
		errors.contactEmail = "This field is required";
	}
	
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
}