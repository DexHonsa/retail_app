/* eslint-disable */
import React from 'react';
import ReactSlider from 'react-slider';

class DemoCrime extends React.Component {
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
	addFilter(){
		var min_value;
		var max_value;
		if(this.state.min_value == 0){
			min_value = 0;
		}
		if(this.state.min_value == 1){
			min_value = 100;
		}
		if(this.state.min_value == 2){
			min_value = 200;
		}
		if(this.state.min_value == 3){
			min_value = 300;
		}
		if(this.state.min_value == 4){
			min_value = 400;
		}
		if(this.state.min_value == 5){
			min_value = 500;
		}
		if(this.state.min_value == 6){
			min_value = 600;
		}
		if(this.state.min_value == 7){
			min_value = 700;
		}
		if(this.state.min_value == 8){
			min_value = 800;
		}
		if(this.state.min_value == 9){
			min_value = 900;
		}
		if(this.state.min_value == 10){
			min_value = 1000;
		}
		if(this.state.min_value == 11){
			min_value = 1100;
		}
		if(this.state.min_value == 12){
			min_value = 1500;
		}

		if(this.state.max_value == 0){
			max_value = 0;
		}
		if(this.state.max_value == 1){
			max_value = 100;
		}
		if(this.state.max_value == 2){
			max_value = 200;
		}
		if(this.state.max_value == 3){
			max_value = 300;
		}
		if(this.state.max_value == 4){
			max_value = 400;
		}
		if(this.state.max_value == 5){
			max_value = 500;
		}
		if(this.state.max_value == 6){
			max_value = 600;
		}
		if(this.state.max_value == 7){
			max_value = 700;
		}
		if(this.state.max_value == 8){
			max_value = 800;
		}
		if(this.state.max_value == 9){
			max_value = 900;
		}
		if(this.state.max_value == 10){
			max_value = 1000;
		}
		if(this.state.max_value == 11){
			max_value = 1100;
		}
		if(this.state.max_value == 12){
			max_value = 1500;
		}
		var title = "PropertyCrime";
		var minVal = min_value;
		var maxVal = max_value;
		var filter = {"title" : title, "minVal" : minVal, "maxVal" : maxVal}
		this.props.addFilter(filter);
		this.props.hideAddFilters();

	}
	getValues(){
		var min = this.state.min_value;
		var max = this.state.max_value;
		var array = [min,max];

		return array;
	}
	render() {
		
		var min_value;
		var max_value;
		if(this.state.min_value == 0){
			min_value = "0";
		}
		if(this.state.min_value == 1){
			min_value = "100";
		}
		if(this.state.min_value == 2){
			min_value = "200";
		}
		if(this.state.min_value == 3){
			min_value = "300";
		}
		if(this.state.min_value == 4){
			min_value = "400";
		}
		if(this.state.min_value == 5){
			min_value = "500";
		}
		if(this.state.min_value == 6){
			min_value = "600";
		}
		if(this.state.min_value == 7){
			min_value = "700";
		}
		if(this.state.min_value == 8){
			min_value = "800";
		}
		if(this.state.min_value == 9){
			min_value = "900";
		}
		if(this.state.min_value == 10){
			min_value = "1000";
		}
		if(this.state.min_value == 11){
			min_value = "1100";
		}
		if(this.state.min_value == 12){
			min_value = "1200+";
		}

		if(this.state.max_value == 1){
			max_value = "100";
		}
		if(this.state.max_value == 2){
			max_value = "200";
		}
		if(this.state.max_value == 3){
			max_value = "300";
		}
		if(this.state.max_value == 4){
			max_value = "400";
		}
		if(this.state.max_value == 5){
			max_value = "500";
		}
		if(this.state.max_value == 6){
			max_value = "600";
		}
		if(this.state.max_value == 7){
			max_value = "700";
		}
		if(this.state.max_value == 8){
			max_value = "800";
		}
		if(this.state.max_value == 9){
			max_value = "900";
		}
		if(this.state.max_value == 10){
			max_value = "1000";
		}
		if(this.state.max_value == 11){
			max_value = "1100";
		}
		if(this.state.max_value == 12){
			max_value = "1200+";
		}
		

		return(
				<div>
			     		<div>
					        <div className="add-filter-instructions">Select a Crime Range.</div>
					        <div className="selected-range">{min_value} - {max_value} Total Annual Crimes</div>
					        <div className="range-container">
					        <div className="range">
					         <ReactSlider min={0} max={12} ref="child" defaultValue={[0, 100]} withBars onChange={() => this.handleChange()}/>
					         </div>
					          <div className="range-labels">
					            <div className="label-value">0</div>
					            <div className="label-value">100</div>
					            <div className="label-value">200</div>
					            <div className="label-value">300</div>
					            <div className="label-value">400</div>
					            <div className="label-value">500</div>
					            <div className="label-value">600</div>
					            <div className="label-value">700</div>
					            <div className="label-value">800</div>
					            <div className="label-value">900</div>
					            <div className="label-value">1000</div>
					            <div className="label-value">1100</div>
					            <div className="label-value">1200</div>
					          </div>
					        </div>
					        <div className="add-filter-footer"><div style={{marginLeft:'auto'}}><div onClick={this.addFilter.bind(this)} className="add-filter-add-btn">Add</div><div onClick={this.props.hideAddFilters} className="add-filter-close-btn">close</div></div></div>
					      </div>


				</div>
			);
	}
}
export default DemoCrime;