/* eslint-disable */
import React from 'react';
import DemoHome from './demo_home';
import Overlay from './overlay';
import DemoHouseholdIncome from './demo_household_income';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DemoCrime from './demo_crime';
import DemoEthnicity from './demo_ethnicity';
import DemoHouseholds from './demo_households';
import DemoEducation from './demo_education';
import DemoPopulation from './demo_population';
import DemoGender from './demo_gender';

class AddDemoFilterPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page : "home",
			filters: []
		}
	}

	updatePage(page){
		this.setState({
			page : page
		})
	}

	addFilter(options){
		this.props.addFilter(options);
	}

	render() {
		var page;
		var addBtn;
		if(this.state.page == "home"){
			page = <DemoHome key={1} updatePage={this.updatePage.bind(this)} addFilter={this.addFilter.bind(this)} hideAddFilters={this.props.hideAddFilters}/>
			
		}
		if(this.state.page == "householdIncome"){
			page = <DemoHouseholdIncome ref="DemoHouseholdIncome" addFilter={this.addFilter.bind(this)} key={2} hideAddFilters={this.props.hideAddFilters}/>
			
		}
		if(this.state.page == "crime"){
			page = <DemoCrime ref="DemoCrime" addFilter={this.addFilter.bind(this)} key={2} hideAddFilters={this.props.hideAddFilters}/>
			
		}
		if(this.state.page == "ethnicity"){
			page = <DemoEthnicity ref="DemoEthnicity" addFilter={this.addFilter.bind(this)} key={2} hideAddFilters={this.props.hideAddFilters}/>
			
		}
		if(this.state.page == "gender"){
			page = <DemoGender ref="DemoGender" addFilter={this.addFilter.bind(this)} key={2} hideAddFilters={this.props.hideAddFilters}/>
			
		}
		if(this.state.page == "households"){
			page = <DemoHouseholds ref="DemoHouseholds" addFilter={this.addFilter.bind(this)} key={2} hideAddFilters={this.props.hideAddFilters}/>
			
		}
		if(this.state.page == "education"){
			page = <DemoEducation ref="DemoEducation" addFilter={this.addFilter.bind(this)} key={2} hideAddFilters={this.props.hideAddFilters}/>
			
		}
		if(this.state.page == "population"){
			page = <DemoPopulation ref="DemoPopulation" addFilter={this.addFilter.bind(this)} key={2} hideAddFilters={this.props.hideAddFilters}/>
			
		}

		return(
			<div className="demo-popup-container ">
				<Overlay />
				<div className="add-demo-filter-popup-container">
		        <div className="add-demo-filter-popup animated fadeInUp">
		        <div className="add-filter-title">Add a Demographic Filter <i onClick={this.props.hideAddFilters} className="fa fa-close" /></div>

                  {page}
                  
		          
		        </div>
		      </div>

			</div>
			);
	}	
}
export default AddDemoFilterPopup;