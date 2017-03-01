import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jquery";
import logo from '../../images/sitemap_logo.png';
class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      dropdown : false,
      clients : [],
      client_id : "",
      client_name: "Select a Client",
      client_img : ""
    }
  }

toggleDropdown(){
  $.getJSON('/api/clients')
      .then((data) => {
        this.setState({ clients: data });
      });
  if(this.state.dropdown){
    this.setState({
      dropdown : false
    })
  }else{
    this.setState({
      dropdown : true
    })
  }
  
}
componentDidMount() {
   return $.getJSON('/api/clients')
      .then((data) => {
        this.setState({ clients: data });
      });
}
activeClient(clientId){
  this.props.clientId(clientId);

  $.getJSON('/api/clients/' + clientId)
      .then((data) => {
       
        this.setState({ client_name: data.Client.client_name });
      });
  
  this.setState({
    client_id : clientId
  })

}

render(){
    var clientDropdown;
    if(this.state.dropdown){
      clientDropdown = <DropdownList activeClient={this.activeClient.bind(this)} clients={this.state.clients}/>
    }else{

    }
    return (
      <header className="header">
        <div className="container-fluid">
          <div className="logo"><img alt="logo" style={{height: 20, display: 'inline-block', lineHeight: 50}} src={logo} /></div>
          <div className="main-nav">
            <Link to="/admin/clients" activeClassName="active">Admin</Link>
            
            <Link to="/map" activeClassName="active">Map</Link>
            <Link to="/key_metrics" activeClassName="active">Key Metrics</Link>
          </div>
          <ul className="user-nav">
            <li><a href="#"><i className="fa fa-gear"></i></a></li>
            <li><div onClick={this.toggleDropdown.bind(this)} className="client-dropdown">Client: {this.state.client_name}<i className="fa fa-caret-down" />
              {clientDropdown}
            </div>            
            </li>
            <li><a href="#"><span className="user-img" /></a></li>
          </ul>
        </div>
      </header>
    );
  }
}

class DropdownList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render(){
  return(
            <ReactCSSTransitionGroup
                      transitionName="fadeUp"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                      transitionAppear={true}
                      transitionAppearTimeout={500}>
              <div className="client-dropdown-dd">
              {this.props.clients.map((data,i) => {
                return <div key={i} onClick={() => this.props.activeClient(data.id)} className="client-dd-option">{data.client_name}</div>;
              })
              }
                
              </div>
              </ReactCSSTransitionGroup>
      );
}
}

export default Header;