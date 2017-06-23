import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ClientItem from './client_item';
import axios from 'axios';
import {connect} from 'react-redux';
import CreateClientPopup from '../popups/clients/create_client_popup';
import $ from "jquery";
import Upgrade from '../util/upgrade';

class Clients extends React.Component{
    constructor(props) {
    super(props);

    this.state = {
      clients: [],
      search : "",
      popup : false,
      upgradePopup:false
    };
  }
  showUpgradePopup(){
    this.setState({upgradePopup:true})
  }
  hideUpgradePopup(){
    this.setState({upgradePopup:false})
  }
  collapsePopup(){
    this.setState({popup : false})
    this.getUserClients()
  }
  expandPopup(){
    this.setState({popup : true})
  }

updateSearch(event){
  this.setState({
    search: event.target.value.substr(0,20)
  });
}
deleteClient(index, clientId){
  var newData = this.state.clients.slice(); //copy array
      newData.splice(index, 1); //remove element
      this.setState({clients: newData}); //update state
    $.ajax({
            type: "DELETE",
            url: "/api/clients/" + clientId,
            success: function(data){

            },
            dataType: "json",
            contentType: "application/json"
          });
}


getUserClients(){
  var this2 = this;
      axios('/api/getUserClients/' + this.props.auth.user.id).then(function(res){
        this2.setState({clients:res.data.data})
      })
}
componentDidMount() {
      this.getUserClients();
  }



  render(){
    var clientList;
    var addClientBtn;
      var upgradePopup;

      if(this.state.upgradePopup){
        upgradePopup = <Upgrade hideUpgradePopup={this.hideUpgradePopup.bind(this)}/>;
      }
    if(this.props.auth.user.role == 'Admin'){
      if(this.props.customer.customerPlan == 'silver-plan'){
        if(this.state.clients.length >= 3){
          addClientBtn = <div onClick={this.showUpgradePopup.bind(this)} className="add-client-btn">Add Client</div>;
        }else{
          addClientBtn = <div onClick={this.expandPopup.bind(this)} className="add-client-btn">Add Client</div>;
        }
      }else{
        addClientBtn = <div onClick={this.expandPopup.bind(this)} className="add-client-btn">Add Client</div>;
      }

      if(this.props.customer.customerPlan == 'gold-plan'){
        if(this.state.clients.length >= 10){
          addClientBtn = <div onClick={this.showUpgradePopup.bind(this)} className="add-client-btn">Add Client</div>;
        }else{
          addClientBtn = <div onClick={this.expandPopup.bind(this)} className="add-client-btn">Add Client</div>;
        }
      }
      if(this.props.customer.customerPlan == 'platnium-plan'){

          addClientBtn = <div onClick={this.expandPopup.bind(this)} className="add-client-btn">Add Client</div>;

      }

    }
      var filteredClients = this.state.clients.filter(
        (data) => {
          return data.client_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
        );

      if(this.state.popup){
            var popup = <CreateClientPopup collapse={this.collapsePopup.bind(this)} />
        } else {

        }

    if(this.state.clients.length > 0){
      clientList = filteredClients.map((data, i) => {
        if(this.props.auth.user.role == 'Admin'){
          return <ClientItem deleteClient={this.deleteClient.bind(this)} key={i} index={i} id={data.id} clientName={data.client_name} industry={data.industry} imgUrl={data.logo_path} />;
        }else{
        return <ClientItem key={i} index={i} id={data.id} clientName={data.client_name} industry={data.industry} imgUrl={data.logo_path} />;
        }
      })
    }else{
      clientList = <div className="empty-list">No Clients To Display<br /><div className="add-client-btn" style={{display: 'inline-block',marginTop:10}} onClick={this.expandPopup.bind(this)}>Add a client</div></div>
    }
      return (
        <div >
          {upgradePopup}
        {popup}
          <div id="clients-content" style={{display: 'flex'}}>
                  {/*<div className="left-side-filter-container">
                    <ul className="left-side-filter">
                      <li className="filter-header">Retail Industry</li>
                      <li>Department Stores (0)</li>
                      <li>Supermarkets (0)</li>
                      <li>Warehouse Retailers (0)</li>
                      <li>Specialty Retailers (0)</li>
                      <li>E-tailers (0)</li>
                      <li className="filter-header">Food Service Industry</li>
                      <li>Restaurants (0)</li>
                      <li className="filled">Fast Food Franchise (<span>1</span>)</li>
                    </ul>
                  </div>*/}
                  <div className="client-content">
                    <div className="client-top-section">
                      <input placeholder="Search" onChange={this.updateSearch.bind(this)} className="client-search" />
                      {addClientBtn}
                    </div>
                    <ul className="client-list">
                    <ReactCSSTransitionGroup
                      transitionName="fadeUp"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                      transitionAppear={true}
                      transitionAppearTimeout={500}>

                      {clientList}

                      </ReactCSSTransitionGroup>

                    </ul>
                  </div>
            </div>
          </div>

      );
  }
}
function mapStateToProps(state){
  return{
    auth: state.auth,
    client: state.client,
    customer:state.customer
  }
}
export default connect(mapStateToProps)(Clients);
