/* eslint-disable */
import React from 'react';

class DemoHome extends React.Component {
	render() {
		return(
			<div>

		          <div className="add-filter-instructions">Choose a filter bucket and add it to the list of demographic filters.</div>
		          <div className="filter-type-container">
		            <div className="add-filter-row">
		              <div onClick={() => this.props.updatePage("crime")} className="add-filter-type">Crime</div>
		              <div onClick={() => this.props.updatePage("population")} className="add-filter-type">Population</div>
		              <div onClick={() => this.props.updatePage("ethnicity")} className="add-filter-type">Ethnicity</div>
		            </div>
		            <div className="add-filter-row">
		              <div onClick={() => this.props.updatePage("households")} className="add-filter-type">Households</div>
		              <div onClick={() => this.props.updatePage("householdIncome")} className="add-filter-type">Household Income</div>
		              <div onClick={() => this.props.updatePage("education")}  className="add-filter-type">Education</div>
		            </div>
		            <div className="add-filter-row">
		              <div onClick={() => this.props.updatePage("gender")} className="add-filter-type">Gender</div>
		              <div onClick={() => this.props.updatePage("gender")} style={{opacity: '0', pointerEvents: 'none'}} className="add-filter-type"></div>
		              <div onClick={() => this.props.updatePage("gender")} style={{opacity: '0', pointerEvents: 'none'}} className="add-filter-type"></div>

		            </div>

		          </div>
		          <div className="add-filter-footer"><div style={{marginLeft:'auto'}}><div onClick={this.props.hideAddFilters} className="add-filter-close-btn">close</div></div></div>
			</div>
			);
	}
}
export default DemoHome;
