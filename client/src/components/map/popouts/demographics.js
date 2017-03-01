import React from 'react';

class DemographicPopout extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
				<div className="left-nav-popup">
                    <div className="left-nav-popup-title">Demographics <i className="fa fa-life-saver" /></div>
                    <div className="left-nav-popup-filter">
                      <div className="filter-close"><i className="fa fa-close" /></div>
                      <div className="filter-title">Households</div>
                      <div className="filter-slider" />
                    </div>
                    <div className="left-nav-popup-filter">
                      <div className="filter-close"><i className="fa fa-close" /></div>
                      <div className="filter-title">Population</div>
                      <div className="filter-slider" />
                    </div>
                    <div className="add-more-filters">Add More Filters <i className="fa fa-plus-circle" /></div>
                  </div>
			);
	}
}
export default DemographicPopout;