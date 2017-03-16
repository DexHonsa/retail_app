import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jquery";
class ViewClient extends React.Component{
    constructor(props) {
    super(props);    

    this.state = {
      id : this.props.params.id,
      client_name : "",
      city : "",
      address : "",
      industry : "",
      logo_path : "",
      state: "",
      zip:"",
      searches: []
    }
  }
  componentDidMount() {
    $.getJSON('/api/clients/' + this.state.id )
      .then((data) => {
        this.setState({ 
          client_name : data.Client.client_name,
          city : data.Client.city,
          address : data.Client.address,
          industry : data.Client.industry,
          logo_path : data.Client.logo_path,
          state: data.Client.state,
          zip: data.Client.zip
          });
      });
  }
  
  
  render(){
    return (
      
        <main className="main">
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', height: 'calc(100vh - 70px)', padding: 0}}>
            <ReactCSSTransitionGroup
                      transitionName="fadeDown"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                      transitionAppear={true}
                      transitionAppearTimeout={500}>
            <div className="view-client-top">
              <div className="view-client-logo-container">
                <div className="view-client-logo-img" style={{backgroundImage: 'url(' + this.state.logo_path + ')' }} />
                <div className="change-logo-btn">Change Logo</div>
              </div>
              <div className="view-client-title">{this.state.client_name}<br /><span style={{fontSize: '15pt', color: '#808080'}}>{this.state.industry}</span></div>
            </div>
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup
                      transitionName="fade"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                      transitionAppear={true}
                      transitionAppearTimeout={500}>
            <div className="details-container">
              <div className="col-sm-8">
                <div className="client-details">
                  <div className="field-header">Client Info</div>
                  <div className="field-container">
                    <div className="field-title">Client Name</div>
                    <div className="field-value">{this.state.client_name}</div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">Industry</div>
                    <div className="field-value">{this.state.industry}</div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">Address</div>
                    <div className="field-value">{this.state.address + ' ' + this.state.state + ', ' + this.state.zip}</div>
                  </div>
                  
                </div>
                <div className="saved-locations-container">
                  <div className="field-header">Saved Searches</div>
                  {/*<div className="saved-location-item">
                    <div className="saved-location-img" />
                    <div className="saved-location-title">1245 Mission Ave <br /> <span style={{fontSize: '10pt'}}>San Francisco CA, 94545</span></div>
                    <i className="fa fa-map-marker" />
                  </div>*/}
                  <div className="no-searches">No Saved Searches</div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="client-contacts">
                  <div className="client-contact-header">Client Contacts</div>
                  <div className="client-contact-item">
                    <div className="client-contact-desc">Jeffery Ortiz<br /><span style={{fontSize: '10pt', color: '#808080'}}>Coordinator</span></div>
                    <div className="client-contact-icons"><i className="fa fa-envelope" /> <i className="fa fa-phone" /> <i className="fa fa-times-rectangle" /></div>
                  </div>
                  
                </div>
              </div>
            </div>
             </ReactCSSTransitionGroup>
          </div>         
        </div>
      </main>
      
    );
  }
  }

export default ViewClient;