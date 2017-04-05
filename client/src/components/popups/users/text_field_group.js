import React from 'react';
import classnames from 'classnames';


const TextFieldGroup = ({ field, value, label, error, type, onChange, checkUserExists}) => {
	return (
		<div className={classnames('', {'input-error': error})} >
			<p>
			<input 
				onChange={onChange}
				onBlur={checkUserExists}
				value={value}
				placeholder={label}
				type={type}
				name={field}
				className="popup-input"
			/>
			</p>
		</div>
		);
}

TextFieldGroup.propTypes = {
	field: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	error: React.PropTypes.string,
	type: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
	checkUserExists: React.PropTypes.func
}

export default TextFieldGroup;