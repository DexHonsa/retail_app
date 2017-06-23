/* eslint-disable */
import React from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jquery";
import arrive from 'arrive';
import RightPanel from './right_panel';
import SearchItem from './search_item';
import DemographicPopout from './popouts/demographics';
import PoiPopout from './popouts/pois';
import {connect} from 'react-redux';
import Client from '../../scripts/myScript.js';
import ZipDemographics from './zip_demographics';
import MapStyles from './popouts/map_styles';
import ListingOptions from './popouts/listing_options';
import MoreZipDemographics from './popouts/more_zip_demographics';
import {setCurrentClient} from '../../actions/auth_actions';
import {Link} from 'react-router';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: this.props.client.clientId,
            userId: this.props.auth.user.id,
            rightPanel: false,
            latitude: '',
            longitude: '',
            street: '',
            city: '',
            zip: '',
            searches: [],
            isSaved: false,
            markerId: '',
            listingId:'',
            searchId: '',
            demo_pop_open: false,
            poi_pop_open: false,
            map_pop_open: false,
            listings_pop_open: false,
            zipDemographics: false,
            activeStyle: 1,
            poi_filters: [],
            zipDemographicItems: [],
            moreZipDemographics: false
        }
    }
    showZipDemographics() {
        var that = this;
        $.ajax({
            type: "GET",
            url: '/api/getZipDemographics/' + this.state.zip,
            success: function(data) {

                that.setState({zipDemographicItems: data.data[0], zipDemographics: true});
            },

            contentType: "application/json"
        });
    }

    hideZipDemographics() {
        this.setState({zipDemographics: false})
    }
    showMoreZipDemographics() {
        this.setState({moreZipDemographics: true})
    }
    hideMoreZipDemographics() {
        this.setState({moreZipDemographics: false})
    }
    changeMap(val) {
        this.setState({activeStyle: val})
        Client.changeMap(val);
    }
    removePois() {
        Client.removePois();
        this.setState({poi_pop_open: false})
    }
    hideRightPanel(markerId) {
        Client.hideZip();
        Client.removePois();
        $('#' + markerId).remove();
        $('.mapboxgl-popup-content').remove();
        var this2 = this;
        this.setState({rightPanel: false, zipDemographics: false})
        this.refreshSearchList();
    }
    showRightPanel() {
        this.setState({rightPanel: true})
    }
    componentWillReceiveProps(nextProps) {
        var this2 = this;
        this.setState({clientId: nextProps.client.clientId})
        setTimeout(function() {

            this2.refreshSearchList();
        }, 100)

    }
    refreshSearchList() {

        var this2 = this;
        $('.saved-marker').remove();
        if (this.props.client.clientId !== undefined) {

            axios.get('/api/searches/' + this.props.auth.user.id + '/' + this.props.client.clientId).then(function(res) {

                res.data.forEach(function(item) {
                    Client.createSavedMarker(item.lat, item.lng, item.id, item.street);
                })
                this2.setState({searches: res.data})
            })
        }
    }
    componentDidMount() {
        this.setClientId();
        var this2 = this;
        setTimeout(function() {
            if (this2.props.params.zip !== undefined) {
                Client.drawZipAndFlyTo(this2.props.params.zip);
            }
        }, 2000)

        var this2 = this;
        this.refreshSearchList();
        document.arrive(".marker", function() {
            $('.marker').click(function() {


                this2.setState({
                    rightPanel: false,
                    latitude: '',
                    longitude: '',
                    city: '',
                    zip: '',
                    street: ''
                })
                var lat = $(this).attr('lat');
                var lng = $(this).attr('lng');
                var markerId = $(this).attr('id');
                var listingId = $(this).attr('listing_id');
                var address = $(this).attr('address');
                var main_address = address.match(/([^,]*),(.*)/);

                var city = main_address[2];
                var street = main_address[1];
                var zipArray = city.split(',');
                var zip = zipArray[1].slice(-5);

                $.getJSON('/api/searches/' + lat + '/' + lng).then((data) => {
                    if (data.result > 0) {
                        this2.setState({isSaved: true})
                    } else {
                        this2.setState({isSaved: false})
                    }
                });
                this2.setState({
                    rightPanel: true,
                    latitude: lat,
                    longitude: lng,
                    city: city,
                    street: street,
                    markerId: markerId,
                    listingId:listingId,
                    searchId: "",
                    zip: zip
                });
                this2.showZipDemographics();

            });
        });

    }
    deleteSearch(index, keyId, e) {
        var newData = this.state.searches.slice(); //copy array
        newData.splice(index, 1); //remove element
        this.setState({searches: newData}); //update state
        $('#' + keyId).remove();
        $.ajax({
            type: "DELETE",
            url: "/api/searches/" + keyId,
            success: function(data) {},
            dataType: "json",
            contentType: "application/json"
        });
        e.stopPropagation();
    }
    findSearch(keyId) {
        var this2 = this;

        $.getJSON('/api/search/' + keyId).then((data) => {

            this2.setState({
                street: data.Searches.street,
                city: data.Searches.city,
                zip: data.Searches.zip,
                latitude: data.Searches.lat,
                longitude: data.Searches.lng,
                rightPanel: true,
                isSaved: true,
                searchId: keyId
            })
            this2.showZipDemographics();
        });
    }
    toggleDemographics() {
        if (this.state.demo_pop_open) {
            this.setState({demo_pop_open: false})
        } else {
            this.setState({demo_pop_open: true})
        }
    }
    togglePois() {
        if (this.state.poi_pop_open) {
            this.setState({poi_pop_open: false})
        } else {
            this.setState({poi_pop_open: true})
        }
    }
    toggleMapStyles() {
        if (this.state.map_pop_open) {
            this.setState({map_pop_open: false})
        } else {
            this.setState({map_pop_open: true})
        }
    }
    toggleListings() {
        if (this.state.listings_pop_open) {
            this.setState({listings_pop_open: false})
        } else {
            this.setState({listings_pop_open: true})
        }
    }
    setPoiFilters(results) {
        this.setState({poi_filters: results, poi_pop_open: false})
    }
    setClientId() {
        if (this.props.auth.user.role === 'Basic') {
            this.props.setCurrentClient(this.props.auth.user.associated_clients[0].value, this.props.auth.user.associated_clients[0].label)
        }
    }
    render() {
        var noSavedSearches = <span style={{marginTop:10,display:'inline-block',color:'#aeaeae'}}>Start by selecting your prefered demographics on the left, then double clicking on the map to select a location</span>;
        if(this.state.searches.length > 0){
          noSavedSearches = '';
        }
        if (this.state.zipDemographics) {
            var zipDemographics = <ZipDemographics zip={this.state.zip} zipDemographicItems={this.state.zipDemographicItems} showMoreZipDemographics={this.showMoreZipDemographics.bind(this)}/>

        }
        if (this.state.rightPanel) {
            var rightPanel = <RightPanel listingId={this.state.listingId} poiFilters={this.state.poi_filters} searchId={this.state.searchId} markerId={this.state.markerId} isSaved={this.state.isSaved} city={this.state.city} zip={this.state.zip} street={this.state.street} latitude={this.state.latitude} longitude={this.state.longitude} hide={this.hideRightPanel.bind(this)}/>
        }
        var more_zip_demographics;
        if (this.state.moreZipDemographics) {
            more_zip_demographics = <MoreZipDemographics searchId={this.state.searchId} latitude={this.state.latitude} longitude={this.state.longitude} street={this.state.street} city={this.state.city} zip={this.state.zip} hideMoreZipDemographics={this.hideMoreZipDemographics.bind(this)}/>
        }
        var demo_pop;
        if (this.state.demo_pop_open) {
            demo_pop = <DemographicPopout/>
        }
        var poi_pop;
        if (this.state.poi_pop_open) {
            poi_pop = <PoiPopout removePois={this.removePois.bind(this)} poiFilters={this.state.poi_filters} setPoiFilters={this.setPoiFilters.bind(this)}/>
        }
        var map_pop;
        if (this.state.map_pop_open) {
            map_pop = <MapStyles changeMap={this.changeMap.bind(this)} activeStyle={this.state.activeStyle}/>
        }
        var listings_pop;
        if (this.state.listings_pop_open) {
            listings_pop = <ListingOptions changeMap={this.changeMap.bind(this)} />
        }
        return (
            <div>

                <main className="main">
                    {more_zip_demographics}
                    <div className="main-wrapper" style={{
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                            {zipDemographics}
                        </ReactCSSTransitionGroup>

                        <div className="main-section">
                            {/*left sidebar*/}
                            <div className="left-side-bar">
                                <ul className="left-side-nav">
                                    {/*demographics popup*/}
                                    <li>
                                        <div onClick={this.toggleDemographics.bind(this)} className="left-nav-btn"><i className="fa fa-user-circle"/>Demographics</div>
                                        <ReactCSSTransitionGroup transitionName="slideRight" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                                            {demo_pop}
                                        </ReactCSSTransitionGroup>
                                    </li>
                                    {/*poi popup*/}
                                    <li>
                                        <div onClick={this.togglePois.bind(this)} className="left-nav-btn"><i className="fa fa-map-marker"/>POIs</div>
                                        <ReactCSSTransitionGroup transitionName="slideRight" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                                            {poi_pop}
                                        </ReactCSSTransitionGroup>

                                    </li>
                                    {/*<li><div className="left-nav-btn"><i className="fa fa-area-chart" />Sales Forcast</div></li>
                <li><div className="left-nav-btn"><i className="fa fa-home" />Find Spaces</div></li>*/}
                                    <Link to="/reports">
                                        <li>
                                            <div className="left-nav-btn"><i className="fa fa-file"/>Reports</div>
                                        </li>
                                    </Link>
                                    <li>
                                        <div onClick={this.toggleMapStyles.bind(this)} className="left-nav-btn"><i className="fa fa-map"/>Map Styles</div>
                                        <ReactCSSTransitionGroup transitionName="slideRight" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                                            {map_pop}
                                        </ReactCSSTransitionGroup>

                                    </li>
                                    <li>
                                        <div onClick={this.toggleListings.bind(this)} className="left-nav-btn"><i className="fa fa-home"/>Find a Space</div>
                                        <ReactCSSTransitionGroup transitionName="slideRight" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                                            {listings_pop}
                                        </ReactCSSTransitionGroup>

                                    </li>
                                </ul>
                            </div>
                            {/*big map*/}
                            <div className="map-container">
                                <div className="map-preloader">
                                    <div className="pre-loader-container">
                                        <div className="pre-loader-img"/>
                                    </div>
                                </div>
                                {/*<div class="map-input" style="position: absolute; z-index: 1000; margin:10px; margin-left:130px;">
                <label><i class="fa fa-map-marker"></i></label>
                <input type="text"/>
                <div class="go-location-btn"><i class="fa fa-arrow-right"></i></div>
              </div><div className="draw-toggle">Draw <span><i className="fa fa-paint-brush"></i></span></div>*/}

                                <div id="map"/>
                                <div id="google-map"/>
                            </div>
                            {/*Right side-bar*/}
                            <div className="right-side-bar">
                                <ReactCSSTransitionGroup transitionName="slideRight" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} transitionAppear={true} transitionAppearTimeout={500}>
                                    {rightPanel}
                                </ReactCSSTransitionGroup>

                                <span style={{
                                    display: 'inline-block',
                                    padding: 15,
                                    fontSize: '12pt',
                                    color: '#469df5'
                                }}>Saved Searches<br/>{noSavedSearches}</span>
                                <div className="results-list">
                                    <ReactCSSTransitionGroup transitionName="slideRight" transitionEnterTimeout={500} transitionLeaveTimeout={500}>

                                        {this.state.searches.map((data, i) => {
                                            return <SearchItem searchId={data.id} key={i} index={i} img={data.imgUrl} city={data.city} street={data.street} keyId={data.id} deleteThis={this.deleteSearch.bind(this)} findSearch={this.findSearch.bind(this)}/>;
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
function mapStateToProps(state) {
    return {auth: state.auth, client: state.client};
}
export default connect(mapStateToProps, {setCurrentClient})(Map);
