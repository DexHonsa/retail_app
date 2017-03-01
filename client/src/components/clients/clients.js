import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ClientItem from './client_item';
import CreateClientPopup from '../popups/clients/create_client_popup';
import $ from "jquery";

class Clients extends React.Component{
    constructor(props) {
    super(props);    

    this.state = {
      clients: [],
      search : "",
      popup : false

    };
  }

  collapsePopup(){
    this.setState({popup : false})
    return $.getJSON('/api/clients')
      .then((data) => {
        this.setState({ clients: data });
      });
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



componentDidMount() {
 // return $.getJSON('http://localhost:9000/api/clients')
 //     .then((data) => {
 //       this.setState({ clients: data });
 //     });
      function parseJSON(response) {
        return response.json();
      }
     return fetch(`/api/clients`, {accept: 'application/json'}).then(parseJSON).then((data) => {
      this.setState({clients: data})
     });


  }



  render(){
      var filteredClients = this.state.clients.filter(
        (data) => {
          return data.client_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
        );

      if(this.state.popup){
            var popup = <CreateClientPopup collapse={this.collapsePopup.bind(this)} />
        } else {
            
        }
      return (
        <div >
        {popup}
          <div id="clients-content" style={{display: 'flex'}}>
                  <div className="left-side-filter-container">
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
                  </div>
                  <div className="client-content">
                    <div className="client-top-section">
                      <input onChange={this.updateSearch.bind(this)} className="client-search" />
                      <div onClick={this.expandPopup.bind(this)} className="add-client-btn">Add Client</div>
                    </div>
                    <ul className="client-list">
                    <ReactCSSTransitionGroup
                      transitionName="fadeUp"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                      transitionAppear={true}
                      transitionAppearTimeout={500}>

                      {filteredClients.map((data, i) => {
                        return <ClientItem deleteClient={this.deleteClient.bind(this)} key={i} index={i} id={data.id} clientName={data.client_name} industry={data.industry} imgUrl={data.logo_path} />;
                      })
                    }

                      </ReactCSSTransitionGroup>
                      
                    </ul>
                  </div>
            </div>
          </div>
      
      );
  }
}

export default Clients;