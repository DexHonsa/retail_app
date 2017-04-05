import React from 'react';

class Checkbox extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isChecked : false
		}
	}

	toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  }

	render(){
		 const { label } = this.props;
    	 const { isChecked } = this.state;
		return(
			<div className="checkbox">
			        <label className="control control--checkbox">{label}
			          <input
	                        type="checkbox"
	                        value={label}
	                        checked={isChecked}
	                        onChange={this.toggleCheckboxChange}
	                    />

			          <div className="control__indicator" /> 
			        </label>
			      </div>
			);
	}
}
export default Checkbox;