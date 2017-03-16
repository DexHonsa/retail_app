/* eslint-disable */
import React from 'react';
import ReactSlider from 'react-slider';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class DemoEthnicity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			min_value: 0,
			max_value : 12,
			genderSelector : "",
			ethnicitySelector : ""
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
		var title = "Ethnicity & Gender";
		var gender = this.state.genderSelector;
		var ethnicity = this.state.ethnicitySelector;
		var filter = {"title" : title, "gender" : gender, "ethnicity" : ethnicity}
		this.props.addFilter(filter);
		this.props.hideAddFilters();

	}
	render() {

		var genderData = [
                { value: "male > female", label: 'Primarily Male' },
                { value: "female > male", label: 'Primarily Female' },
                
            ];
        var ethnicityData = [
            { value: "white", label: 'White' },
            { value: "black", label: 'Black' },
            { value: "mexican", label: 'Mexican' },
            { value: "asian", label: 'Asian' },
            
        ];

		
		
		
		

		return(
				<div>
			     		<div>
					        <div className="add-filter-instructions">Select Values</div>
					        <div className="selector-main-container">
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
					         <div className="selector-main-container">
						         <div className="selector-label"><div className="my-select-label">Ethnicity Separation</div>
						         		<Select
					                      className="my-selector"
					                      name="Gender"
					                      value={this.state.ethnicitySelector}
					                      options={ethnicityData}
					                      clearable={false}
					                      onChange={this.onEthnicityChange.bind(this)}
					                  />
						         </div>
						         
					         </div>
					        <div className="add-filter-footer"><div style={{marginLeft:'auto'}}><div onClick={this.addFilter.bind(this)} className="add-filter-add-btn">Add</div><div onClick={this.props.hideAddFilters} className="add-filter-close-btn">close</div></div></div>
					      </div>


				</div>
			);
	}
}
export default DemoEthnicity;