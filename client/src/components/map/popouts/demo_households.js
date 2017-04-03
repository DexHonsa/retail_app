/* eslint-disable */
import React from 'react';
import ReactSlider from 'react-slider';

class DemoHouseholds extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			min_value: 0,
			max_value : 8
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
		var min_value;
		var max_value;
		if(this.state.min_value == 0){
			min_value = 0;
		}
		if(this.state.min_value == 1){
			min_value = 5000;
		}
		if(this.state.min_value == 2){
			min_value = 10000;
		}
		if(this.state.min_value == 3){
			min_value = 15000;
		}
		if(this.state.min_value == 4){
			min_value = 20000;
		}
		if(this.state.min_value == 5){
			min_value = 25000;
		}
		if(this.state.min_value == 6){
			min_value = 30000;
		}
		if(this.state.min_value == 7){
			min_value = 35000;
		}
		if(this.state.min_value == 8){
			min_value = 40000;
		}
		
		if(this.state.max_value == 0){
			max_value = 0;
		}
		if(this.state.max_value == 1){
			max_value = 5000;
		}
		if(this.state.max_value == 2){
			max_value = 10000;
		}
		if(this.state.max_value == 3){
			max_value = 15000;
		}
		if(this.state.max_value == 4){
			max_value = 20000;
		}
		if(this.state.max_value == 5){
			max_value = 25000;
		}
		if(this.state.max_value == 6){
			max_value = 30000;
		}
		if(this.state.max_value == 7){
			max_value = 35000;
		}
		if(this.state.max_value == 8){
			max_value = 40000;
		}
		
		var title = "TotalHouseholds";
		var minVal = min_value;
		var maxVal = max_value;
		var filter = {"title" : title, "minVal" : minVal, "maxVal" : maxVal}
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
			min_value = "5k";
		}
		if(this.state.min_value == 2){
			min_value = "10k";
		}
		if(this.state.min_value == 3){
			min_value = "15k";
		}
		if(this.state.min_value == 4){
			min_value = "20k";
		}
		if(this.state.min_value == 5){
			min_value = "25k";
		}
		if(this.state.min_value == 6){
			min_value = "30k";
		}
		if(this.state.min_value == 7){
			min_value = "35k";
		}
		if(this.state.min_value == 8){
			min_value = "40k";
		}
		

		if(this.state.max_value == 1){
			max_value = "5k";
		}
		if(this.state.max_value == 2){
			max_value = "10k";
		}
		if(this.state.max_value == 3){
			max_value = "15k";
		}
		if(this.state.max_value == 4){
			max_value = "20k";
		}
		if(this.state.max_value == 5){
			max_value = "25k";
		}
		if(this.state.max_value == 6){
			max_value = "30k";
		}
		if(this.state.max_value == 7){
			max_value = "35k";
		}
		if(this.state.max_value == 8){
			max_value = "40k";
		}
		
		

		return(
				<div>
			     		<div>
					        <div className="add-filter-instructions">Select an average amount of households</div>
					        <div className="selected-range">{min_value} - {max_value}  Households</div>
					        <div className="range-container">
					        <div className="range">
					         <ReactSlider min={0} max={8} ref="child" defaultValue={[0, 100]} withBars onChange={() => this.handleChange()}/>
					         </div>
					          <div className="range-labels">
					            <div className="label-value">0</div>
					            <div className="label-value">5k</div>
					            <div className="label-value">10k</div>
					            <div className="label-value">15k</div>
					            <div className="label-value">20k</div>
					            <div className="label-value">25k</div>
					            <div className="label-value">30k</div>
					            <div className="label-value">35k</div>
					            <div className="label-value">40k</div>
					            
					          </div>
					        </div>
					        <div className="add-filter-footer"><div style={{marginLeft:'auto'}}><div onClick={this.addFilter.bind(this)} className="add-filter-add-btn">Add</div><div onClick={this.props.hideAddFilters} className="add-filter-close-btn">close</div></div></div>
					      </div>


				</div>
			);
	}
}
export default DemoHouseholds;