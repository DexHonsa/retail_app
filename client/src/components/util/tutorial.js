import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Overlay from './overlay';
import welcome from '../../../images/tutorial/welcome.jpg'
import add_client from '../../../images/tutorial/add_client.jpg'
import select_client from '../../../images/tutorial/select_client.jpg';
import add_user from '../../../images/tutorial/add_user.jpg';
import messages from '../../../images/tutorial/messages.jpg';
import map_geolocation from '../../../images/tutorial/map_geolocation.jpg';
import map_demographics from '../../../images/tutorial/map_demographics.jpg';
import map_pois from '../../../images/tutorial/map_pois.jpg';
import drop_marker from '../../../images/tutorial/drop_marker.jpg';
import property_open from '../../../images/tutorial/property_open.jpg';




class Tutorial extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tutorialPosition:0
    };
  }
  nextTutorial(){
    this.setState({tutorialPosition:this.state.tutorialPosition + 1})
  }
  finishTutorial(){
    var this2 = this;
    var data = {
      userId: this.props.auth.user.id
    }
    axios.put('/api/finishTutorial', data).then(function(res){
      console.log(res);
      this2.props.hideTutorialPopup();
    })
  }
  render(){
    var screenshot;
    var description;
    if(this.state.tutorialPosition == 0){
      screenshot = welcome;
      description = <div className="tutorial-description-container">
                      <div className="tutorial-title">Welcome</div>
                      <div className="tutorial-description-body">Welcome to SiteMAP! This tutorial will help you get a basic high level understanding of the various functionalities of SiteMAP.
                      Click next to go through the tutorial or skip it at the bottom of this dialouge.  You can always revist this tutorial by clicking the 'Tutorial' btn on the top right.</div>
                      <div onClick={this.nextTutorial.bind(this)} className="next-tutorial">Next <i className="fa fa-angle-right"></i></div>
                    </div>
    }
    if(this.state.tutorialPosition == 1){
      screenshot = add_client;
      description = <div className="tutorial-description-container">
                      <div className="tutorial-title">Creating Clients</div>
                      <div className="tutorial-description-body">Clients are people or businesses you work with. Click on the Add Client button at the top right of the screen and follow the
                      instructions to create your first client.</div>
                      <div onClick={this.nextTutorial.bind(this)} className="next-tutorial">Next <i className="fa fa-angle-right"></i></div>
                    </div>
    }
    if(this.state.tutorialPosition == 2){
      screenshot = select_client;
      description = <div className="tutorial-description-container">
                      <div className="tutorial-title">Selecting Clients</div>
                      <div className="tutorial-description-body">Most areas of SiteMAP require a client to be selected.  Always make sure you have a client selected in the upper right dropdown.</div>
                      <div onClick={this.nextTutorial.bind(this)} className="next-tutorial">Next <i className="fa fa-angle-right"></i></div>
                    </div>
    }
    if(this.state.tutorialPosition == 3){
      screenshot = add_user;
      description = <div className="tutorial-description-container">
                      <div className="tutorial-title">Users</div>
                      <div className="tutorial-description-body">Users are anyone you would like to share or collaborate with on SiteMAP.  You enter their email address when you create their account
                      and they are sent an invitation email with temporary credentials to join.  Users you add are the only people you can collaborate with on SiteMAP</div>
                      <div onClick={this.nextTutorial.bind(this)} className="next-tutorial">Next <i className="fa fa-angle-right"></i></div>
                    </div>
    }
    if(this.state.tutorialPosition == 4){
      screenshot = messages;
      description = <div className="tutorial-description-container">
                      <div className="tutorial-title">Messages</div>
                      <div className="tutorial-description-body">SiteMAP has a full built-in messaging system.  You can attach documents and client-specific saved searches to make it easy to collaborate.</div>
                      <div onClick={this.nextTutorial.bind(this)} className="next-tutorial">Next <i className="fa fa-angle-right"></i></div>
                    </div>
    }
    if(this.state.tutorialPosition == 5){
      screenshot = map_geolocation;
      description = <div className="tutorial-description-container">
                      <div className="tutorial-title">Map Navigation</div>
                      <div className="tutorial-description-body">Use the geolocator in the upper right to quickly navigate to any location in the USA.</div>
                      <div onClick={this.nextTutorial.bind(this)} className="next-tutorial">Next <i className="fa fa-angle-right"></i></div>
                    </div>
    }
    if(this.state.tutorialPosition == 6){
      screenshot = map_demographics;
      description = <div className="tutorial-description-container">
                      <div className="tutorial-title">Map Demographics</div>
                      <div className="tutorial-description-body">Use the demographic filters to highlight matching zip codes.  Zip codes are highlighted in blue and can be clicked to zoom in.</div>
                      <div onClick={this.nextTutorial.bind(this)} className="next-tutorial">Next <i className="fa fa-angle-right"></i></div>
                    </div>
    }
    if(this.state.tutorialPosition == 7){
      screenshot = map_pois;
      description = <div className="tutorial-description-container">
                      <div className="tutorial-title">Map Points of Interest</div>
                      <div className="tutorial-description-body">Use the POI selector to highlight any place or business on the map to give you quick insight to the position of possible competitors or attractions nearby.</div>
                      <div onClick={this.nextTutorial.bind(this)} className="next-tutorial">Next <i className="fa fa-angle-right"></i></div>
                    </div>
    }
    if(this.state.tutorialPosition == 8){
      screenshot = drop_marker;
      description = <div className="tutorial-description-container">
                      <div className="tutorial-title">Double Click to Drop a marker</div>
                      <div className="tutorial-description-body">Simply double click anywhere on the map to drop a pin which will allow you to view detailed information about that specific location.</div>
                      <div onClick={this.nextTutorial.bind(this)} className="next-tutorial">Next <i className="fa fa-angle-right"></i></div>
                    </div>
    }
    if(this.state.tutorialPosition == 9){
      screenshot = property_open;
      description = <div className="tutorial-description-container">
                      <div className="tutorial-title">Location View</div>
                      <div className="tutorial-description-body">The right panel will open up with location details and allow you to view deeper demographic information, access the scorecard for the location, and add the location to your saved searches.</div>
                      <div onClick={this.finishTutorial.bind(this)} className="next-tutorial">Finish Tutorial <i className="fa fa-angle-right"></i></div>
                    </div>
    }

    var page = <div className="tutorial-body-container">
      <div className="tutorial-ss-container">
      <img style={{width:'100%'}} src={screenshot}/>
    </div>
    {description}

  </div>
    return(
      <div className="demo-popup-container ">
        <Overlay />
				<div className="add-demo-filter-popup-container">
		        <div className="add-demo-filter-popup animated fadeInUp"  style={{width:'80%'}}>
		        <div className="add-filter-title">Tutorial <i onClick={this.props.hideTutorialPopup} className="fa fa-close" /></div>

                  {page}

            <div className="add-filter-footer"><div style={{marginLeft:'auto'}}><div onClick={this.finishTutorial.bind(this)} className="add-filter-add-btn">Skip Tutorial</div></div></div>
		        </div>

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
export default connect(mapStateToProps)(Tutorial);
