/* eslint-disable */
import React from 'react';
import DemographicFilterItem from './demographic_filter_item';
import AddDemoFilterPopup from './add_demo_filter_popup';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ToggleSwitch from '@trendmicro/react-toggle-switch';
import Client from '../../../scripts/myScript.js';

import '@trendmicro/react-toggle-switch/dist/react-toggle-switch.css';

class DemographicPopout extends React.Component {
	constructor(props) {
    super(props);
      this.state = {
        filters : [],
        add_filter_open : false,
        checked : false
      }
    }
    showAddFilters(){
      this.setState({
        add_filter_open : true
      })
    }
    hideAddFilters(){
      this.setState({
        add_filter_open : false
      })
    }
    toggleChange(){
      this.setState({ checked: !this.state.checked });
      //this.filterZips();
    }
    addFilter(options){
      var newArray = this.state.filters.slice();
      newArray.push(options);
      var that = this;
      setTimeout(function(){
      that.setState({filters: newArray})
      console.log(that.state.filters);
      that.filterZips();
      },100);
      
    }
    removeFilter(index){
      var newArray = this.state.filters.slice();
      newArray.splice(index, 1);
      var that = this;
      setTimeout(function(){
        that.setState({filters: newArray})
        that.filterZips();
      },100)
      
    }
    filterZips(){
      this.setState({
        checked : true
      })
      var that = this;
      // if(this.state.checked){

      // }else{
        Client.getZipsFromBounds(function(result){
          var filters = that.state.filters;
          console.log(filters);
          Client.filterZips(result, filters, function(result){

            Client.drawFilteredZips(result.data);
          })
        });
      //}
    }
    clearDrawnZips(){
      Client.clearDrawnZips();
    }

	render() {
    if(this.state.checked == false){
      this.clearDrawnZips();
    }
    var filters;
    var addFilterPopup;
    var noFilter;
    if(this.state.add_filter_open){
      addFilterPopup =  <AddDemoFilterPopup addFilter={this.addFilter.bind(this)} hideAddFilters={this.hideAddFilters.bind(this)}/>
                
    }else{
      addFilterPopup = null;
    }

    if(this.state.filters.length == 0){
      noFilter = <div className="nodemos">No Demographic Filters</div>
    }else{
      noFilter = null;
      filters = this.state.filters.map(function(data, i){
                return <div key={i} className="demo-filter animated fadeInUp">{data.title.replace(/([A-Z])/g, ' $1').trim()}&nbsp;&nbsp;{data.minVal}&nbsp;&nbsp;-&nbsp;&nbsp;{data.maxVal}<i onClick={this.removeFilter.bind(this, i)} className="fa fa-times-rectangle"></i></div>
              },this)
    }
		return (
				<div className="left-nav-popup">
        <div className="left-nav-popup-title" style={{textAlign: 'left'}}>Demographics <div style={{float: 'right'}}>
        <ToggleSwitch
            checked={this.state.checked}
            size="small"
            onChange={this.toggleChange.bind(this)}
        /></div>
</div>
       
        <div className="demo-filter-list">
          {noFilter}
          {filters}
          <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
          {addFilterPopup}
          </ReactCSSTransitionGroup>
        </div>
        <div onClick={this.showAddFilters.bind(this)} className="add-more-filters"><i className="fa fa-sliders" /> Add Filter</div>
      </div>

			);
	}
}
export default DemographicPopout;