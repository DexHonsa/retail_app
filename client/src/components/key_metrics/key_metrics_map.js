import React from 'react';
import ProspectItem from './prospect_item';
import {connect} from 'react-redux';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import ImportData from './import_data';

import ProspectiveLocations from './prospective_locations';
import '../../scripts/keymetrics_map.js';

class KeyMetrics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPage: "",
      prospectiveLocations: false,
      searches: [],
      importData: false
    }

  }
  getClientSearches(clientId){
    var this2 = this;
    axios.get('/api/getClientSearches/'+ clientId).then(function(res){
      this2.setState({searches: res.data.data});
    })
  }
  toggleProspectiveLocations(){
    if(this.state.prospectiveLocations){
      this.setState({
        prospectiveLocations : false
      })
    }else{
      this.setState({
        prospectiveLocations : true
      })
    }

  }
  showImportData(){
    this.setState({importData:true})
  }
  hideImportData(){
    this.setState({importData:false})
  }
  componentWillReceiveProps(nextProps){
    this.getClientSearches(nextProps.client.clientId);
  }
  componentDidMount(){
    this.getClientSearches(this.props.client.clientId);
    // MapScript.MapInit();

  }




  render(){
    var prospectiveLocations;
    var importData;
    if(this.state.prospectiveLocations){
      prospectiveLocations = <ProspectiveLocations searches={this.state.searches}/>
    }
    if(this.state.importData){
      importData = <ImportData hideImportData={this.hideImportData.bind(this)} />
    }

    return (
      <main className="main">
        <ReactTooltip/>
        {importData}
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', padding: 0}}>
            <div className="key-metrics-top">
              <div className="dropdown-selector-container">
                <div className="dropdown-item-selector">
                  <select><option>Business Groups</option></select>
                </div>
                <div className="dropdown-item-selector">
                  <select><option>Country</option></select>
                </div>
                <div className="dropdown-item-selector">
                  <select><option>Region</option></select>
                </div>
                <div className="dropdown-item-selector">
                  <select><option>State</option></select>
                </div>
                <div className="dropdown-item-selector">
                  <select><option>City</option></select>
                </div>
                <div className="dropdown-item-selector">
                  <select><option>Location</option></select>
                </div>
                <div className="dropdown-item-selector">
                  <select><option>Timeframe</option></select>
                </div>
                <div onClick={this.showImportData.bind(this)} className="import-data-btn">Import Data</div>
              </div>
              {/*<div class="client-selector-dropdown">
							<div class="client-selector-img"></div>
							<div class="client-selector-name">Client<br><span style="color:#3080e8;font-size: 12pt;">Muscle Maker Grill</span><i class="fa fa-caret-down"></i></div>
						</div>*/}
            </div>
            <div className="key-metrics-tiles">
              <div className="key-metrics-title"><h3>Key Metrics</h3><br />See the potential impact of your prospective locations on your key financial metrics.</div>
              <div className="key-metrics-tile-container">
                <div className="key-metrics-tile">
                  <div className="tile-title">Locations<span data-tip="<div style='color:#ff9900'>percent of total</div>" data-html={true} style={{float: 'right'}}>100%</span></div>
                  <div className="tile-content">
                    <div className="tile-number" data-tip="Current">203</div>
                    <div className="tile-difference"><div className="difference-number" style={{color: 'goldenrod'}}>+100</div><i className="fa fa-arrow-right" /></div>
                    <div className="ti304le-number" data-tip="After Prospective Locations">303</div>
                  </div>
                  <div className="tile-details">
                    <table className="tile-details">
                      <tbody><tr><td>Budget</td><td>$100,000</td></tr>
                        <tr><td>variance</td><td>-50</td></tr>
                      </tbody></table>
                  </div>
                </div>
                <div className="key-metrics-tile">
                  <div className="tile-title">Sales<span data-tip="percent of total" style={{float: 'right'}}>100%</span></div>
                  <div className="tile-content">
                    <div className="tile-number">$2.8B</div>
                    <div className="tile-difference"><div className="difference-number" style={{color: 'red'}}>-$3,343,224</div><i className="fa fa-arrow-right" /></div>
                    <div className="ti304le-number">$2.4B</div>
                  </div>
                  <div className="tile-details">
                    <table className="tile-details">
                      <tbody><tr><td>Budget</td><td>$2,333,233,445</td></tr>
                        <tr><td>variance</td><td>-$100,000,000</td></tr>
                      </tbody></table>
                  </div>
                </div>
                <div className="key-metrics-tile">
                  <div className="tile-title">Profit<span data-tip="percent of total" style={{float: 'right'}}>100%</span></div>
                  <div className="tile-content">
                    <div className="tile-number">$403M</div>
                    <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+$3,344,300</div><i className="fa fa-arrow-right" /></div>
                    <div className="tile-number">$403M</div>
                  </div>
                  <div className="tile-details">
                    <table className="tile-details">
                      <tbody><tr><td>Budget</td><td>$100,000</td></tr>
                        <tr><td>variance</td><td>-50</td></tr>
                      </tbody></table>
                  </div>
                </div>
                <div className="key-metrics-tile">
                  <div className="tile-title">Total SF<span data-tip="percent of total" style={{float: 'right'}}>100%</span></div>
                  <div className="tile-content">
                    <div className="tile-number">8.7M <sup>SF</sup></div>
                    <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+100</div><i className="fa fa-arrow-right" /></div>
                    <div className="ti304le-number">8.7M <sup>SF</sup></div>
                  </div>
                  <div className="tile-details">
                    <table className="tile-details">
                      <tbody><tr><td>Budget</td><td>2,344,334 SF</td></tr>
                        <tr><td>variance</td><td>-50,342,233 SF</td></tr>
                      </tbody></table>
                  </div>
                </div>
              </div>
              <div className="key-metrics-tile-container" style={{paddingTop: 0}}>
                <div className="key-metrics-tile">
                  <div className="tile-title">HeadCount<span data-tip="percent of total" style={{float: 'right'}}>100%</span></div>
                  <div className="tile-content">
                    <div className="tile-number">1943</div>
                    <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+1</div><i className="fa fa-arrow-right" /></div>
                    <div className="ti304le-number">1944</div>
                  </div>
                  <div className="tile-details">
                    <table className="tile-details">
                      <tbody><tr><td>Budget</td><td>2000</td></tr>
                        <tr><td>variance</td><td>-57</td></tr>
                      </tbody></table>
                  </div>
                </div>
                <div className="key-metrics-tile">
                  <div className="tile-title">Expenses<span data-tip="percent of total" style={{float: 'right'}}>100%</span></div>
                  <div className="tile-content">
                    <div className="tile-number">$1.4B</div>
                    <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+$3,344,767</div><i className="fa fa-arrow-right" /></div>
                    <div className="ti304le-number">1.4B</div>
                  </div>
                  <div className="tile-details">
                    <table className="tile-details">
                      <tbody><tr><td>Budget</td><td>$100,000</td></tr>
                        <tr><td>variance</td><td>-50</td></tr>
                      </tbody></table>
                  </div>
                </div>
                <div className="key-metrics-tile">
                  <div className="tile-title">Headcount / SF<span data-tip="percent of total" style={{float: 'right'}}>100%</span></div>
                  <div className="tile-content">
                    <div className="tile-number">4.3</div>
                    <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+100</div><i className="fa fa-arrow-right" /></div>
                    <div className="ti304le-number">4.3</div>
                  </div>
                  <div className="tile-details">
                    <table className="tile-details">
                      <tbody><tr><td>Budget</td><td>$100,000</td></tr>
                        <tr><td>variance</td><td>-50</td></tr>
                      </tbody></table>
                  </div>
                </div>
                <div className="key-metrics-tile">
                  <div className="tile-title">Labor / Sales<span data-tip="percent of total" style={{float: 'right'}}>100%</span></div>
                  <div className="tile-content">
                    <div className="tile-number">$203</div>
                    <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+100</div><i className="fa fa-arrow-right" /></div>
                    <div className="ti304le-number">$204</div>
                  </div>
                  <div className="tile-details">
                    <table className="tile-details">
                      <tbody><tr><td>Budget</td><td>$100,000</td></tr>
                        <tr><td>variance</td><td>-50</td></tr>
                      </tbody></table>
                  </div>
                </div>
              </div>
            </div>
            <div className="prospective-location-container">
              <div onClick={this.toggleProspectiveLocations.bind(this)} className="prospective-location-btn">{this.state.prospectiveLocations ? "Hide Prospective Locations" : "Show Prospective Locations"}</div>
              {prospectiveLocations}
            </div>
            <div className="metric-tile-sm-row">
              <div className="metric-tile-sm">
                <div className="metric-tile-sm-title">Owned Assets</div>
                <div className="metric-tile-sm-value">120</div>
              </div>
              <div className="metric-tile-sm">
                <div className="metric-tile-sm-title">Leased Assets</div>
                <div className="metric-tile-sm-value">98</div>
              </div>
              <div className="metric-tile-sm">
                <div className="metric-tile-sm-title">Sub-Leased Assets</div>
                <div className="metric-tile-sm-value">21</div>
              </div>
            </div>
            <div className="metric-tile-sm-row">
              <div className="metric-tile-sm">
                <div className="metric-tile-sm-title">Square Feet</div>
                <div className="metric-tile-sm-value">1,223,323SF</div>
              </div>
              <div className="metric-tile-sm">
                <div className="metric-tile-sm-title">Business Groups</div>
                <div className="metric-tile-sm-value">13</div>
              </div>
              <div className="metric-tile-sm">
                <div className="metric-tile-sm-title">Expirations</div>
                <div className="metric-tile-sm-value">$60,000</div>
              </div>
            </div>
            <div className="map-tabs">
              <div className="map-tab active">Lease Details</div>
              <div className="map-tab">P&amp;L Details</div>
              <div className="map-tab">Demographics</div>
              <div className="map-tab">CRE Spend</div>
            </div>
            <div className="map-option-dropdown">
              <div><span style={{paddingRight: 15, color: '#3080e8'}}>Attributes</span><select><option>Options</option></select></div>
            </div>
            <div className="mini-map-container">
              <div id="mini-map" style={{width:'100%',height:'100%',position:'relative'}} />
            </div>
            <div className="map-property-list-container">
              <ul className="prospective-locations-list">
                <li>
                  <div className="pros-loc-details">
                    <div className="pros-loc-img" />
                    <div className="pros-loc-name"><span className="pros-location-click" style={{color: '#3080e8', fontSize: '11pt'}}>3535 Malcom Ave</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
                  </div>
                  <div className="pros-loc-metric">Sales <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Profit <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Total SF <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Headcount <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Expenses <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="change-shadow-loc-btn">Change</div>
                  <div className="pros-shadow-loc">
                    <div className="pros-shadow-img" />
                    <div className="pros-shadow-name"><span style={{color: '#C94345', fontSize: '11pt'}}>3535 Malcom Ave (Shadow)</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
                  </div>
                </li>
                <li>
                  <div className="pros-loc-details">
                    <div className="pros-loc-img" />
                    <div className="pros-loc-name"><span className="pros-location-click" style={{color: '#3080e8', fontSize: '11pt'}}>3535 Malcom Ave</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
                  </div>
                  <div className="pros-loc-metric">Sales <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Profit <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Total SF <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Headcount <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Expenses <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="change-shadow-loc-btn">Change</div>
                  <div className="pros-shadow-loc">
                    <div className="pros-shadow-img" />
                    <div className="pros-shadow-name"><span style={{color: '#C94345', fontSize: '11pt'}}>3535 Malcom Ave (Shadow)</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
                  </div>
                </li>
                <li>
                  <div className="pros-loc-details">
                    <div className="pros-loc-img" />
                    <div className="pros-loc-name"><span className="pros-location-click" style={{color: '#3080e8', fontSize: '11pt'}}>3535 Malcom Ave</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
                  </div>
                  <div className="pros-loc-metric">Sales <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Profit <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Total SF <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Headcount <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Expenses <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="change-shadow-loc-btn">Change</div>
                  <div className="pros-shadow-loc">
                    <div className="pros-shadow-img" />
                    <div className="pros-shadow-name"><span style={{color: '#C94345', fontSize: '11pt'}}>3535 Malcom Ave (Shadow)</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
                  </div>
                </li>
                <li>
                  <div className="pros-loc-details">
                    <div className="pros-loc-img" />
                    <div className="pros-loc-name"><span className="pros-location-click" style={{color: '#3080e8', fontSize: '11pt'}}>3535 Malcom Ave</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
                  </div>
                  <div className="pros-loc-metric">Sales <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Profit <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Total SF <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Headcount <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="pros-loc-metric">Expenses <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
                  <div className="change-shadow-loc-btn">Change</div>
                  <div className="pros-shadow-loc">
                    <div className="pros-shadow-img" />
                    <div className="pros-shadow-name"><span style={{color: '#C94345', fontSize: '11pt'}}>3535 Malcom Ave (Shadow)</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>


    );
  }
  }

  function mapStateToProps(state){
    return {
      auth: state.auth,
      client: state.client
    };
  }
  export default connect(mapStateToProps)(KeyMetrics);
