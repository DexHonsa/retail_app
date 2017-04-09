/* eslint-disable */
import React from 'react';
import ReactSlider from 'react-slider';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class DemoGender extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			min_value: 0,
			max_value : 12,
			genderSelector : "",
			
		}
	}
	onGenderChange(val){
		this.setState({genderSelector : val})
	}
	onEthnicityChange(val){
		this.setState({ethnicitySelector : val})
	}
	handleChange = () => {
	var value = this.refs.child.getValue();

    this.setState({
      min_value: value[0],
      max_value : value[1]
    })
    
}
	getValues(){
		var min = this.state.min_value;
		var max = this.state.max_value;
		var array = [min,max];

		return array;
	}
	addFilter(){
		var title = "Gender";
		var gender = this.state.genderSelector;
		
		var filter = {"title" : title, "value" : gender.value}
		this.props.addFilter(filter);
		this.props.hideAddFilters();

	}
	render() {

		var genderData = [
                { value: "male > female", label: 'Primarily Male' },
                { value: "female > male", label: 'Primarily Female' },
                
            ];
        

		
		
		
		

		return(
				<div>
			     		<div>
					        <div className="add-filter-instructions">Select Values</div>
					        <div className="selector-main-container" style={{width: '100%'}}>
						         <div className="selector-label"><div className="my-select-label">Gender Separation</div>
						         		<Select
					                      className="my-selector"
					                      name="Gender"
					                      value={this.state.genderSelector}
					                      options={genderData}
					                      clearable={false}
					                      onChange={this.onGenderChange.bind(this)}
					                  />
						         </div>
						         
					         </div>
					         
					        <div className="add-filter-footer"><div style={{marginLeft:'auto'}}><div onClick={this.addFilter.bind(this)} className="add-filter-add-btn">Add</div><div onClick={this.props.hideAddFilters} className="add-filter-close-btn">close</div></div></div>
					      </div>


				</div>
			);
	}
}
export default DemoGender;