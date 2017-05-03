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
			genderRatio: ""

		}
	}
	onGenderChange(val){
		this.setState({genderSelector : val})
	}
	onGenderRatioChange(val){
		this.setState({genderRatio : val})
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
		var ratio = this.state.genderRatio;

		var filter = {"title" : title, "value" : gender.value, "ratio" : ratio.value}
		this.props.addFilter(filter);
		this.props.hideAddFilters();

	}
	render() {

		var genderData = [
                { value: "PopulationFemale10to14", label: 'Population Female 10 to 14' },
								{ value: "PopulationFemale15to19", label: 'Population Female 15 to 19' },
								{ value: "PopulationFemale20to24", label: 'Population Female 20 to 24' },
								{ value: "PopulationFemale25to29", label: 'Population Female 25 to 29' },
								{ value: "PopulationFemale30to34", label: 'Population Female 30 to 34' },
								{ value: "PopulationFemale35to39", label: 'Population Female 35 to 39' },
								{ value: "PopulationFemale40to44", label: 'Population Female 40 to 44' },
								{ value: "PopulationFemale45to49", label: 'Population Female 45 to 49' },
								{ value: "PopulationFemale50to54", label: 'Population Female 50 to 54' },
								{ value: "PopulationFemale55to59", label: 'Population Female 55 to 59' },
								{ value: "PopulationFemale60to64", label: 'Population Female 60 to 64' },
								{ value: "PopulationFemale65Plus", label: 'Population Female 65 Plus' },
								{ value: "PopulationFemale21Plus", label: 'Population Female 21 Plus' },
								{ value: "PopulationFemale16Plus", label: 'Population Female 16 Plus' },
								{ value: "PopulationFemale18Plus", label: 'Population Female 18 Plus' },

								{ value: "PopulationMale10to14", label: 'Population Male 10 to 14' },
								{ value: "PopulationMale15to19", label: 'Population Male 15 to 19' },
								{ value: "PopulationMale20to24", label: 'Population Male 20 to 24' },
								{ value: "PopulationMale25to29", label: 'Population Male 25 to 29' },
								{ value: "PopulationMale30to34", label: 'Population Male 30 to 34' },
								{ value: "PopulationMale35to39", label: 'Population Male 35 to 39' },
								{ value: "PopulationMale40to44", label: 'Population Male 40 to 44' },
								{ value: "PopulationMale45to49", label: 'Population Male 45 to 49' },
								{ value: "PopulationMale50to54", label: 'Population Male 50 to 54' },
								{ value: "PopulationMale55to59", label: 'Population Male 55 to 59' },
								{ value: "PopulationMale60to64", label: 'Population Male 60 to 64' },
								{ value: "PopulationMale65Plus", label: 'Population Male 65 Plus' },
								{ value: "PopulationMale21Plus", label: 'Population Male 21 Plus' },
								{ value: "PopulationMale16Plus", label: 'Population Male 16 Plus' },
								{ value: "PopulationMale18Plus", label: 'Population Male 18 Plus' },


            ];
		var genderRatio = [
								{ value: 5, label: '5% or greater' },
								{ value: 10, label: '10% or greater' },
								{ value: 15, label: '15% or greater' },
								{ value: 20, label: '20% or greater' },

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
										 <div className="selector-label"><div className="my-select-label">Ratio</div>
						         		<Select
					                      className="my-selector"
					                      name="Ratio"
					                      value={this.state.genderRatio}
					                      options={genderRatio}
					                      clearable={false}
					                      onChange={this.onGenderRatioChange.bind(this)}
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
