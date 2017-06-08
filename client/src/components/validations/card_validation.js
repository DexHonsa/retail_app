import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	var errors = {};

	if(Validator.isEmpty(data.name)){
		errors.name = "This field is required";
	}
	if(Validator.isEmpty(data.card_num)){
		errors.card_num = "This field is required";
	}
	if(!Validator.isLength(data.card_num, {min:16, max: 16})){
		errors.card_num = "Needs to be 16 digits";
	}
	if(Validator.isEmpty(data.cvc)){
		errors.cvc = "This field is required";
	}
	if(Validator.isEmpty(data.exp_yr)){
		errors.exp_yr = "This field is required";
	}
	if(Validator.isEmpty(data.exp_mn)){
		errors.exp_mn = "This field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}
