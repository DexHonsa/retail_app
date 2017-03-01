import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jquery";
import arrive from 'arrive';
import RightPanel from './right_panel';
import SearchItem from './search_item';
import DemographicPopout from './popouts/demographics';
import Client from '../../scripts/myScript.js';


class Map extends React.Component{
    constructor(props) {
    super(props);    
    this.state = {
      clientId : this.props.clientId,
      rightPanel : false,
      latitude : '',
      longitude : '',
      street : '',
      city : '',
      searches: [],
      isSaved : false,
      markerId: '',
      searchId: '',
      demo_pop_open : false

    }
    
  }
  hideRightPanel(markerId){
    Client.removePois();
    $('#' + markerId).remove();
    $('.mapboxgl-popup-content').remove();
    var this2 = this;

    this.setState({rightPanel : false})
    $.getJSON('/api/searches')
      .then((data) => {
        this2.setState({ searches: data });
      });
  }

 
  
  showRightPanel(){
     this.setState({rightPanel : true})
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      cliendId : nextProps.clientId
    })
   
  }
  componentDidMount() {
   
    var this2 = this;

    $.getJSON('/api/searches')
      .then((data) => {
        this2.setState({ searches: data });
      });

     $(document).arrive(".marker", function() {
      $('.marker').click(function(){
        this2.setState({
          rightPanel : false,
          latitude : '',
          longitude : '',
          city : '',
          street : ''
        })
        var lat = $(this).attr('lat');
        var lng = $(this).attr('lng');
        var markerId = $(this).attr('id');
        var address = $(this).attr('address');
        var main_address = address.match(/([^,]*),(.*)/);
        var city = main_address[2];
        var street = main_address[1];

        $.getJSON('/api/searches/' + lat + '/' + lng)
        .then((data) => {
          if(data.result > 0){
            this2.setState({isSaved : true})
          }else{
            this2.setState({isSaved : false})
          }
        });

        this2.setState({
          rightPanel : true,
          latitude : lat,
          longitude : lng,
          city : city,
          street : street,
          markerId : markerId,
          searchId : "",
        });
      
        
      });
    });
  }


  deleteSearch(index, keyId, e) {
      var newData = this.state.searches.slice(); //copy array
      newData.splice(index, 1); //remove element
      this.setState({searches: newData}); //update state

    $.ajax({
            type: "DELETE",
            url: "/api/searches/" + keyId,
            success: function(data){
              
            },
            dataType: "json",
            contentType: "application/json"
          });    
    e.stopPropagation();
}
  findSearch(keyId){
    var this2 = this;

      $.getJSON('/api/searches/' + keyId)
      .then((data) => {
        this2.setState({
          street : data.Searches.street,
          city : data.Searches.city,
          latitude : data.Searches.lat,
          longitude : data.Searches.lng,
          rightPanel : true,
          isSaved : true,
          searchId : keyId
        })

      });
  }
  toggleDemographics(){
    if(this.state.demo_pop_open){
      this.setState({
        demo_pop_open : false
      })
    }else{
      this.setState({
        demo_pop_open : true
      })
    }
  }



 
  render(){
    if(this.state.rightPanel){
            var rightPanel = <RightPanel 
                                searchId={this.state.searchId} 
                                markerId={this.state.markerId} 
                                isSaved={this.state.isSaved} 
                                city={this.state.city} 
                                street={this.state.street} 
                                latitude={this.state.latitude} 
                                longitude={this.state.longitude} 
                                hide={this.hideRightPanel.bind(this)}
                                 />
        } else {
            
        }
    var demo_pop;
    if(this.state.demo_pop_open){
      demo_pop = <DemographicPopout />
    }else{

    }
    return (

      <div>
  
       <main className="main">
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          
       
          <div className="main-section">
            {/*left sidebar*/}
            <div className="left-side-bar">
              <ul className="left-side-nav">
                {/*demographics popup*/}
                <li><div onClick={this.toggleDemographics.bind(this)} className="left-nav-btn"><i className="fa fa-user-circle" />Demographics</div>
                <ReactCSSTransitionGroup
                transitionName="slideRight"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                  {demo_pop}
                  </ReactCSSTransitionGroup>
                </li>
                {/*poi popup*/}
                <li><div className="left-nav-btn"><i className="fa fa-map-marker" />POI's</div>
                  <div className="left-nav-popup" style={{display: 'none'}}>
                    <div className="left-nav-popup-title">POI's <i className="fa fa-life-saver" /></div>
                    <div className="left-nav-popup-tabs">
                      <div className="left-nav-popup-tab">By Name</div>
                      <div className="left-nav-popup-tab active">By Category</div>
                    </div>
                    <input className="search-input" defaultValue="Search..." />
                    <div className="poi-list">
                      <div className="control-group" style={{paddinTop: 15, width: '100%'}}>
                        <label className="control control--checkbox">Hotels
                          <input type="checkbox" />
                          <div className="control__indicator" />
                        </label>
                        <label className="control control--checkbox">Hospitals
                          <input type="checkbox" />
                          <div className="control__indicator" />
                        </label>
                        <label className="control control--checkbox">Restaurants
                          <input type="checkbox" />
                          <div className="control__indicator" />
                        </label>
                        <label className="control control--checkbox">Gas Stations
                          <input type="checkbox" />
                          <div className="control__indicator" />
                        </label>
                        <label className="control control--checkbox">Fast Food
                          <input type="checkbox" />
                          <div className="control__indicator" />
                        </label>
                      </div>
                    </div>
                  </div>
                </li>
                <li><div className="left-nav-btn"><i className="fa fa-area-chart" />Sales Forcast</div></li>
                <li><div className="left-nav-btn"><i className="fa fa-home" />Find Spaces</div></li>
                <li><div className="left-nav-btn"><i className="fa fa-file" />Reports</div></li>
              </ul>
            </div>
            {/*big map*/}
            <div className="map-container">
              <div className="map-preloader">
                <div className="pre-loader-container">
                  <div className="pre-loader-img" />
                </div>
              </div>
              {/*<div class="map-input" style="position: absolute; z-index: 1000; margin:10px; margin-left:130px;">
                <label><i class="fa fa-map-marker"></i></label>
                <input type="text"/>
                <div class="go-location-btn"><i class="fa fa-arrow-right"></i></div>
              </div>*/}
              <div className="draw-toggle">Draw <span><i className="fa fa-paint-brush"></i></span></div>
              
              <div id="map" />
              <div id="google-map" />
            </div>
            {/*Right side-bar*/}
            <div className="right-side-bar">
         <ReactCSSTransitionGroup
          transitionName="slideRight"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}>
          {rightPanel}
        </ReactCSSTransitionGroup>
            
        <span style={{display: 'inline-block', padding: 15, fontSize: '12pt', color: '#469df5'}}>Saved Searches</span>
        <div className="results-list">
              <ReactCSSTransitionGroup
                transitionName="slideRight"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                
                {this.state.searches.map((data, i) =>{
                    return <SearchItem searchId={data.id} key={i} index={i} img={data.imgUrl} city={data.city} street={data.street} keyId={data.id} deleteThis={this.deleteSearch.bind(this)} findSearch={this.findSearch.bind(this)}   />;
                  })
                }
                 </ReactCSSTransitionGroup>
            </div>
      </div>

          </div>
        </div>

      </main>
            
         


      </div>

    );
    


  }
    


  



  }

export default Map;