/* eslint-disable */
import React from 'react';
import ReactSlider from 'react-slider';

class DemoHouseholdIncome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			min_value: 0,
			max_value : 12
		}
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
		var title = "IncomePerHousehold";
		var minVal = this.state.min_value;
		var maxVal = this.state.max_value;

		var min_value;
		var max_value;
		if(this.state.min_value == 0){
			min_value = 0;
		}
		if(this.state.min_value == 1){
			min_value = 10000;
		}
		if(this.state.min_value == 2){
			min_value = 20000;
		}
		if(this.state.min_value == 3){
			min_value = 30000;
		}
		if(this.state.min_value == 4){
			min_value = 40000;
		}
		if(this.state.min_value == 5){
			min_value = 50000;
		}
		if(this.state.min_value == 6){
			min_value = 60000;
		}
		if(this.state.min_value == 7){
			min_value = 70000;
		}
		if(this.state.min_value == 8){
			min_value = 80000;
		}
		if(this.state.min_value == 9){
			min_value = 90000;
		}
		if(this.state.min_value == 10){
			min_value = 100000;
		}
		if(this.state.min_value == 11){
			min_value = 125000;
		}
		if(this.state.min_value == 12){
			min_value = 300000;
		}
		if(this.state.max_value == 0){
			max_value = 0;
		}
		if(this.state.max_value == 1){
			max_value = 10000;
		}
		if(this.state.max_value == 2){
			max_value = 20000;
		}
		if(this.state.max_value == 3){
			max_value = 30000;
		}
		if(this.state.max_value == 4){
			max_value = 40000;
		}
		if(this.state.max_value == 5){
			max_value = 50000;
		}
		if(this.state.max_value == 6){
			max_value = 60000;
		}
		if(this.state.max_value == 7){
			max_value = 70000;
		}
		if(this.state.max_value == 8){
			max_value = 80000;
		}
		if(this.state.max_value == 9){
			max_value = 90000;
		}
		if(this.state.max_value == 10){
			max_value = 100000;
		}
		if(this.state.max_value == 11){
			max_value = 125000;
		}
		if(this.state.max_value == 12){
			max_value = 1000000;
		}

		var filter = {"title" : title, "minVal" : min_value, "maxVal" : max_value}
		this.props.addFilter(filter);
		this.props.hideAddFilters();

	}
	render() {
		
		var min_value;
		var max_value;
		if(this.state.min_value == 0){
			min_value = "0";
		}
		if(this.state.min_value == 1){
			min_value = "10k";
		}
		if(this.state.min_value == 2){
			min_value = "20k";
		}
		if(this.state.min_value == 3){
			min_value = "30k";
		}
		if(this.state.min_value == 4){
			min_value = "40k";
		}
		if(this.state.min_value == 5){
			min_value = "50k";
		}
		if(this.state.min_value == 6){
			min_value = "60k";
		}
		if(this.state.min_value == 7){
			min_value = "70k";
		}
		if(this.state.min_value == 8){
			min_value = "80k";
		}
		if(this.state.min_value == 9){
			min_value = "90k";
		}
		if(this.state.min_value == 10){
			min_value = "100k";
		}
		if(this.state.min_value == 11){
			min_value = "125k";
		}
		if(this.state.min_value == 12){
			min_value = "150k+";
		}

		if(this.state.max_value == 1){
			max_value = "10k";
		}
		if(this.state.max_value == 2){
			max_value = "20k";
		}
		if(this.state.max_value == 3){
			max_value = "30k";
		}
		if(this.state.max_value == 4){
			max_value = "40k";
		}
		if(this.state.max_value == 5){
			max_value = "50k";
		}
		if(this.state.max_value == 6){
			max_value = "60k";
		}
		if(this.state.max_value == 7){
			max_value = "70k";
		}
		if(this.state.max_value == 8){
			max_value = "80k";
		}
		if(this.state.max_value == 9){
			max_value = "90k";
		}
		if(this.state.max_value == 10){
			max_value = "100k";
		}
		if(this.state.max_value == 11){
			max_value = "125k";
		}
		if(this.state.max_value == 12){
			max_value = "150k+";
		}
		

		return(
				<div>
			     		<div>
					        <div className="add-filter-instructions">Select a Household Income Range.</div>
					        <div className="selected-range">${min_value} - ${max_value}</div>
					        <div className="range-container">
					        <div className="range">
					         <ReactSlider min={0} max={12} ref="child" defaultValue={[0, 100]} withBars onChange={() => this.handleChange()}/>
					         </div>
					          <div className="range-labels">
					            <div className="label-value">0</div>
					            <div className="label-value">10k</div>
					            <div className="label-value">20k</div>
					            <div className="label-value">30k</div>
					            <div className="label-value">40k</div>
					            <div className="label-value">50k</div>
					            <div className="label-value">60k</div>
					            <div className="label-value">70k</div>
					            <div className="label-value">80k</div>
					            <div className="label-value">90k</div>
					            <div className="label-value">100k</div>
					            <div className="label-value">125k</div>
					            <div className="label-value">150k+</div>
					          </div>
					        </div>
					        <div className="add-filter-footer"><div style={{marginLeft:'auto'}}><div onClick={this.addFilter.bind(this)} className="add-filter-add-btn">Add</div><div onClick={this.props.hideAddFilters} className="add-filter-close-btn">close</div></div></div>
					      </div>


				</div>
			);
	}
}
export default DemoHouseholdIncome;