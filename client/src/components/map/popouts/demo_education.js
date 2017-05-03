/* eslint-disable */
import React from 'react';
import ReactSlider from 'react-slider';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class DemoEducation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			bachelorsData : ""
		}
	}
	onHighschoolChange(val){
		this.setState({highschoolData : val})
	}
	onBachelorsChange(val){
		this.setState({bachelorsData : val})
		
	}


	addFilter(){
		var title = "EducationBachelorOrGreater";
		var bachelorsPercent = this.state.bachelorsData;

		var filter = {"title" : title, "value" : bachelorsPercent.value}
		this.props.addFilter(filter);
		this.props.hideAddFilters();

	}
	render() {


        var bachelorsData = [
            { value: "0", label: '0%' },
                { value: "0.05", label: '5%' },
                { value: "0.1", label: '10%' },
                { value: "0.15", label: '15%' },
                { value: "0.2", label: '20%' },
                { value: "0.25", label: '25%' },
                { value: "0.3", label: '30%' },
                { value: "0.35", label: '35%' },
                { value: "0.4", label: '40%' },
                { value: "0.45", label: '45%' },
                { value: "0.5", label: '50%' },
                { value: "0.55", label: '55%' },
                { value: "0.6", label: '60%' },
                { value: "0.65", label: '65%' },
                { value: "0.7", label: '70%' },
                { value: "0.75", label: '75%' },
                { value: "0.8", label: '80%' },
                { value: "0.85", label: '85%' },
                { value: "0.9", label: '90%' },
                { value: "0.95", label: '95%' },
                { value: "1", label: '100%' },

        ];






		return(
				<div>
			     		<div>
					        <div className="add-filter-instructions">Select Values</div>
					         <div className="selector-main-container" style={{width: '100%'}}>
						         <div className="selector-label"><div className="my-select-label">Percent of Bachelors Degree or Above</div>
						         		<Select
					                      className="my-selector"
					                      name="Gender"
					                      value={this.state.bachelorsData}
					                      options={bachelorsData}
					                      clearable={false}
					                      onChange={this.onBachelorsChange.bind(this)}
					                  />
						         </div>

					         </div>
					        <div className="add-filter-footer"><div style={{marginLeft:'auto'}}><div onClick={this.addFilter.bind(this)} className="add-filter-add-btn">Add</div><div onClick={this.props.hideAddFilters} className="add-filter-close-btn">close</div></div></div>
					      </div>


				</div>
			);
	}
}
export default DemoEducation;
