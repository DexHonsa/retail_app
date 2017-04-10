import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import $ from "jquery";
import {connect} from "react-redux";
import CreateContact from './create_client_contact';

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
      searches: [],
      createContactPopup: false,
      clientContacts: []
    }
  }
  getClient(){
    var this2 = this;
    axios.get('/api/clients/' + this.props.params.id).then(function(res){
      console.log(res.data.Client);
      this2.setState({
        clientContacts: res.data.Client.contacts
      })
    })
  }
  componentDidMount() {
    this.getClient();
    var this2 = this
    axios.get('/api/searches/' + this.props.auth.user.id + '/' + this.props.params.id).then(function(res){
      this2.setState({
        searches : res.data
      })
    })
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
  showCreateContact(){
    this.setState({createContactPopup:true})
  }
  hideCreateContact(){
    this.setState({createContactPopup:false})
    this.getClient();
  }
  deleteClientContact(index, clientId){
    var this2 = this;
    var newData = this.state.clientContacts.slice(); //copy array
      newData.splice(index, 1); //remove element
      this.setState({clientContacts: newData}); //update state

      var data = {
        clientId :  this.props.params.id,
        contactIndex: index,
        deleteContact: true
      }
    axios.put('/api/updateClientContact', data).then(function(res){
        
        this2.hideCreateContact();
      })
}
  
  render(){
    var searches;
    var createContactPopup;
    if(this.state.createContactPopup === true){
      createContactPopup = <CreateContact hideCreateContact={this.hideCreateContact.bind(this)} clientId={this.props.params.id} />;
    }else{
      createContactPopup = '';
    }
    const {contactName, contactEmail, contactPhone, errors} = this.state;
    if(this.state.searches.length > 0){
      searches = this.state.searches.map(function(data, i){
        return <div key={i} className="saved-location-item">
                    <div className="saved-location-img" style={{backgroundImage: 'url('+data.imgUrl+')'}}/>
                    <div className="saved-location-title">{data.street}<br /> <span style={{fontSize: '10pt'}}>{data.city}</span></div>
                    <i className="fa fa-map-marker" />
                  </div>
      })
    }else{
      searches = <div className="no-searches">No Saved Searches</div>;
    }
    return (
      
        <main className="main">

        {createContactPopup}
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', padding: 0, paddingBottom:200}}>
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
            <div className="edit-profile-btn-container">
             <div className=" load-more-btn">Edit</div>
             </div>
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
                  {searches}
                  
                </div>
              </div>
              <div className="col-sm-4">
                <div className="client-contacts">
                  <div className="client-contact-header">Client Contacts</div>
                  {this.state.clientContacts.map(function(data, i){
                    return <div className="client-contact-item">
                            <div className="client-contact-desc">{data.contactName}<br /><span style={{fontSize: '10pt', color: '#808080'}}>{data.contactEmail}</span><br /><span style={{fontSize: '10pt', color: '#808080'}}>{data.contactPhone}</span></div>
                            <div className="client-contact-icons"> <i onClick={(index) => this.deleteClientContact(i).bind(this)} className="fa fa-times-rectangle" /></div>
                          </div>
                  },this)}
                  

                  <div className="client-contact-create">
                    <div onClick={this.showCreateContact.bind(this)} className="client-contact-create-title">Add Contact</div>
                    
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
function mapStateToProps(state){
   return {
    auth: state.auth,
    client: state.client
  };
}
export default connect(mapStateToProps)(ViewClient);