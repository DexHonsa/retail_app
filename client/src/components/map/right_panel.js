import React from 'react';
import axios from 'axios';
import $ from "jquery";
import Client from '../../scripts/myScript.js';
import InsertFinancialInfo from './insert_financial_info';
import { connect } from 'react-redux';
//import ReactTimeAgo from 'react-time-ago';
import Linkify from 'react-linkify'

class RightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: this.props.searchId,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      street: this.props.street,
      city: this.props.city,
      zip: this.props.zip,
      medianAge: "",
      averageIncome: "",
      medianIncome: "",
      malePop: "",
      femalePop: "",
      isSaved: false,
      leaseEditMode: false,
      leaseRate: "",
      leaseType: "",
      leaseFrequency: "",
      size: "",
      buildingSize: "",
      pois: [],
      poi_filters: this.props.poiFilters,
      addFinancialInfo : false,
      twitterFeed: []
    }
  }
  getTwitterFeed(){
    var this2 = this;
    
    axios.get('api/twitter/' + this.state.longitude + "/" + this.state.latitude).then(function(res){
      
      this2.setState({
        twitterFeed : res.data.tweets.statuses
      })
      console.log(this2.state.twitterFeed);
    })
  }
  getDemographics() {
    var lat = this.state.latitude;
    var lng = this.state.longitude;
    var this2 = this;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.pitneybowes.com/location-intelligence/geolife/v1/demographics/bylocation?latitude=" + lat + "&longitude=" + lng,
      "method": "GET",
      "headers": {
        "authorization": "Bearer jPGny9Q6VIyzsx0QdVWSC8NRgWRv",
        "cache-control": "no-cache",
        "postman-token": "33b648c3-ace7-e131-0b20-1a1691a9dc40"
      },
      "data": {
        "grant_type": "client_credentials"
      }
    }
    $.ajax(settings)
      .done(function(response) {
        this2.setState({
          medianAge: response.themes.ageTheme.individualValueVariable[0].value,
          averageIncome: response.themes.incomeTheme.individualValueVariable[1].value,
          medianIncome: response.themes.incomeTheme.individualValueVariable[0].value,
          malePop: response.themes.genderTheme.individualValueVariable[0].value,
          femalePop: response.themes.genderTheme.individualValueVariable[1].value
        })
      });
  }

  componentDidMount() {
 //var this2 = this;
   Client.drawZip(this.state.zip);
    this.setState({
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      city: this.props.city,
      zip: this.props.zip,
      street: this.props.street,
      isSaved: this.props.isSaved,
      searchId: this.props.searchId
    })

      this.getTwitterFeed();
  
    if(this.state.searchId !== "" || this.state.searchId !== "N/A") {
      $.getJSON('/api/searches/' + this.state.searchId)
        .then((data) => {
          this.setState({
            leaseRate: data.Searches.leaseInfo.leaseRate,
            leaseType: data.Searches.leaseInfo.leaseType,
            leaseFrequency: data.Searches.leaseInfo.leaseFrequency,
            size: data.Searches.leaseInfo.size,
            buildingSize: data.Searches.leaseInfo.buildingSize
          })
        });
    } else {
      this.setState({
        leaseRate: "N/A",
        leaseType: "N/A",
        leaseFrequency: "N/A",
        size: "N/A",
        buildingSize: "N/A"
      })
    }
    Client.flyToLocation(this.props.latitude, this.props.longitude);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      latitude: nextProps.latitude,
      longitude: nextProps.longitude,
      city: nextProps.city,
      zip: nextProps.zip,
      street: nextProps.street,
      isSaved: nextProps.isSaved,
      searchId: nextProps.searchId,
      poi_filters: this.props.poiFilters
    })
    Client.flyToLocation(nextProps.latitude, nextProps.longitude);
    Client.drawZip(nextProps.zip);
    //this.getDemographics();
  }
  showPois(){
    var that = this;
    var poiArray = Client.getPois(this.state.latitude, this.state.longitude,this.state.poi_filters);
    setTimeout(function(){
       that.setState({
        pois: poiArray
       });
      
    },1000)
  }
  editLeaseInfo() {
    if(this.state.leaseEditMode) {
      var that = this;
      var leaseRate;
      var leaseType;
      var leaseFrequency;
      var size;
      var buildingSize;
      var id = this.state.searchId;
      if(this.refs.leaseRate.value !== "") {
        leaseRate = that.refs.leaseRate.value;
      } else {
        leaseRate = that.state.leaseRate;
      }
      if(this.refs.leaseType.value !== "") {
        leaseType = that.refs.leaseType.value;
      } else {
        leaseType = that.state.leaseType;
      }
      if(this.refs.leaseFrequency.value !== "") {
        leaseFrequency = that.refs.leaseFrequency.value;
      } else {
        leaseFrequency = that.state.leaseFrequency;
      }
      if(this.refs.size.value !== "") {
        size = that.refs.size.value;
      } else {
        size = that.state.size;
      }
      if(this.refs.buildingSize.value !== "") {
        buildingSize = that.refs.buildingSize.value;
      } else {
        buildingSize = that.state.buildingSize;
      }
      if(that.refs.leaseRate.value === "" & that.refs.leaseType.value === "" & that.refs.leaseFrequency.value === "" & that.refs.size.value === "" & that.refs.buildingSize.value === "") {
        this.setState({
          leaseEditMode: false
        })
      }
      var data = {
        "id": id,
        "leaseInfo": {
          "leaseRate": leaseRate,
          "leaseType": leaseType,
          "leaseFrequency": leaseFrequency,
          "size": size,
          "buildingSize": buildingSize
        }
      }
      $.ajax({
        type: "PUT",
        url: "/api/searches/" + id,
        data: JSON.stringify(data),
        success: function(data) {
          that.setState({
            leaseEditMode: false,
            leaseRate: leaseRate,
            leaseType: leaseType,
            leaseFrequency: leaseFrequency,
            size: size,
            buildingSize: buildingSize
          });
        },
        dataType: "json",
        contentType: "application/json"
      });
    } else {
      this.setState({
        leaseEditMode: true
      });
    }
  }
  findPoi(lat,lng,name){
    $('.poi-marker').remove();
    Client.createPoiMarker(lat,lng,name)
  }
  trunc(string) {
    if(string.length > 40)
      return string.substring(0, 40) + '...';
    else
      return string;
  }
  numberWithCommas(x) {
    return x.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  addToSearches() {
    var this2 = this;
   
      
      var lat = this.state.latitude;
      var lng = this.state.longitude;
      var street = this.state.street;
      var city = this.state.city;
      var zip = this.state.zip;
     
      var img_path = "https://maps.googleapis.com/maps/api/streetview?location=" + this.state.latitude + "," + this.state.longitude + "&size=400x400&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs";
      var data = {
        "userId": this.props.auth.user.id,
        "clientId": this.props.client.clientId,
        "lat": lat,
        "lng": lng,
        "city": city,
        "zip": zip,
        "street": street,
        "imgUrl": img_path,
        "leaseInfo": {
          "leaseRate": "",
          "leaseType": "",
          "leaseFrequency": "",
          "size": "",
          "buildingSize": ""
        }
      };
      $.ajax({
        type: "POST",
        url: "/api/searches",
        data: JSON.stringify(data),
        success: function(data) {
          console.log(data);
          Client.createSavedMarker(lat, lng, data[0].id, street);
          this2.props.hide();
        },
        dataType: "json",
        contentType: "application/json"
      });
    
  }
  addFinancialInfo(){
    this.setState({
      addFinancialInfo : true
    })
  }
  saveFinancialInfo(){
    this.setState({
      addFinancialInfo : false
    })
  }
  render() {
    var editBtn;
    var leaseRate;
    var leaseType;
    var leaseFrequency;
    var size;
    var buildingSize;
    var insertFinancialInfo;
    var addFinancialInfoBtn;
    if(this.state.addFinancialInfo){
      insertFinancialInfo = <InsertFinancialInfo saveFinancialInfo={this.saveFinancialInfo.bind(this)} />
      
    }
    if(this.state.leaseRate !== "") {
      leaseRate = this.state.leaseRate;
    } else {
      leaseRate = "N/A";
    }
    if(this.state.leaseEditMode) {
      editBtn = "save";
      leaseRate = <input type="text" ref="leaseRate" placeholder={this.state.leaseRate} />;
      leaseType = <input type="text" ref="leaseType" placeholder={this.state.leaseType} />;
      leaseFrequency = <input type="text" ref="leaseFrequency" placeholder={this.state.leaseFrequency} />;
      size = <input type="text" ref="size" placeholder={this.state.size} />;
      buildingSize = <input type="text" ref="buildingSize" placeholder={this.state.buildingSize} />;
    } else {
      editBtn = "edit";
      leaseRate = this.state.leaseRate;
      leaseType = this.state.leaseType;
      leaseFrequency = this.state.leaseFrequency;
      size = this.state.size;
      buildingSize = this.state.buildingSize;
    }
    var addButton;
    if(this.state.isSaved) {
      addFinancialInfoBtn = <div onClick={this.addFinancialInfo.bind(this)} className="add-to-saved">Add Financial Information</div>;
      addButton = null;
    }  else if(this.props.client.clientId !== undefined){
      addButton = <div onClick={this.addToSearches.bind(this)} className="add-to-saved">Add to Saved Searches</div>;
    }
    if(this.state.isSaved){
    var leasingTable = <div className="view-result-demographic-table">
                        <div style={{display: 'inline-block', fontSize: '12pt', padding: 10, background: '#469df5', color: '#fff', width: '100%'}}>Leasing Information
                        <div onClick={this.editLeaseInfo.bind(this)} className="edit-btn">{editBtn}</div>
                        </div>
                        <ul className="demographics-list">
                          <li>
                            <div className="demo-title">Lease Rate</div>
                            <div className="demo-value">{leaseRate}</div>
                          </li>
                          <li>
                            <div className="demo-title">Lease Type</div>
                            <div className="demo-value">{leaseType}</div>
                          </li>
                          <li>
                            <div className="demo-title">Lease Frequency</div>
                            <div className="demo-value">{leaseFrequency}</div>
                          </li>
                          <li>
                            <div className="demo-title">Size</div>
                            <div className="demo-value">{size}</div>
                          </li>
                          <li>
                            <div className="demo-title">Building Size</div>
                            <div className="demo-value">{buildingSize}</div>
                          </li>
                        </ul>
                      </div>;
                    }
    var basicInfoTable = <div className="view-result-demographic-table">
                        <div style={{display: 'inline-block', fontSize: '12pt', padding: 10, background: '#469df5', color: '#fff', width: '100%'}}>Basic Information
                        
                        </div>
                        <ul className="demographics-list">
                          <li>
                            <div className="demo-title">Address</div>
                            <div className="demo-value">{this.state.street}</div>
                          </li>
                          <li>
                            <div className="demo-title">City</div>
                            <div className="demo-value">{this.state.city}</div>
                          </li>
                          <li>
                            <div className="demo-title">Zip</div>
                            <div className="demo-value">{this.state.zip}</div>
                          </li>
                          <li>
                            <div className="demo-title">Longitude</div>
                            <div className="demo-value">{this.state.longitude}</div>
                          </li>
                          <li>
                            <div className="demo-title">Latitude</div>
                            <div className="demo-value">{this.state.latitude}</div>
                          </li>
                          
                        </ul>
                      </div>;
    return(
      <div className="view-result" key="1">
        {insertFinancialInfo}
          <div className="view-result-top">
            <div onClick={() => this.props.hide(this.props.markerId)} className="view-result-close"><i className="fa fa-chevron-left" /></div>
            <span>{this.trunc(this.state.street + this.state.city)}</span>
          </div>
          <div className="view-result-img" style={{backgroundImage: "url(https://maps.googleapis.com/maps/api/streetview?location="+this.state.latitude+","+this.state.longitude+"&size=400x400&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs)"}} />
          <div className="view-result-details">
            <div className="view-result-title">{this.state.street + this.state.city}<br /></div>
            {/*<div className="view-result-demographic-table">
              <div style={{display: 'inline-block', fontSize: '12pt', padding: 10, background: '#469df5', color: '#fff', width: '100%'}}>Block Demographics</div>
              <ul className="demographics-list">
                <li>
                  <div className="demo-title">Household Median Income $</div>
                  <div className="demo-value">${this.numberWithCommas(this.state.medianIncome)}</div>
                </li>
                <li>
                  <div className="demo-title">Household Average Income $</div>
                  <div className="demo-value">${this.numberWithCommas(this.state.averageIncome)}</div>
                </li>
                <li>
                  <div className="demo-title">Median Adult Age</div>
                  <div className="demo-value">{this.numberWithCommas(this.state.medianAge)}</div>
                </li>
                <li>
                  <div className="demo-title">Male Population Count</div>
                  <div className="demo-value">{this.numberWithCommas(this.state.malePop)}</div>
                </li>
                <li>
                  <div className="demo-title">Female Population Count</div>
                  <div className="demo-value">{this.numberWithCommas(this.state.femalePop)}</div>
                </li>
                
              </ul>
            </div>*/}
            {addButton}
            {basicInfoTable}
            {leasingTable}
            <div className="view-result-demographic-table">
              <div style={{display: 'inline-block', fontSize: '12pt', padding: 10, background: '#469df5', color: '#fff', width: '100%'}}>Nearby Social Feed</div>
              <ul className="demographics-list">
                {/*<li>
                  <div className="no-information">No Information Available</div>
                </li>*/}

                {this.state.twitterFeed.map(function(data, i){
                    return <li key={i}>
                              <div>
                                <div className="twitter-item-top">
                                  <div className="twitter-item-img" style={{backgroundImage: 'url(' + data.user.profile_image_url + ')'}} />
                                  <div className="twitter-item-name">{data.user.name}<br /><span style={{color: '#808080', fontSize: '.8em'}}>@{data.user.screen_name}</span></div>
                                  <div className="demo-value"></div>
                                </div>
                                <div className="twitter-item-text"><Linkify>{data.text}</Linkify></div>
                              </div>
                            </li>
                })}

              </ul>
            </div>
           {/* <div className="view-result-demographic-table">
              <div style={{display: 'inline-block', fontSize: '12pt', padding: 10, background: '#469df5', color: '#fff', width: '100%'}}>Closest Points of Interest
                <div onClick={this.showPois.bind(this)} className="edit-btn">load pois</div>
              </div>
              <ul className="demographics-list">
              {this.state.pois.map((data, i) => {
                        return <PoiItem findPoi={this.findPoi.bind(this)} name={data.name} type={data.types[0]}  key={i} rating={data.rating} lat={data.geometry.location.lat()} lng={data.geometry.location.lng()}  />;
                      })
                    }
                
              </ul>
            </div>*/}

            
            {addFinancialInfoBtn}
            
          </div>
        </div>
    );
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth,
    client: state.client
  };
}
export default connect(mapStateToProps)(RightPanel);