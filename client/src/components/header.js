import React from 'react';
import { Link } from 'react-router';
import $ from "jquery";
import logo from '../../images/sitemap_logo.png';
import axios from 'axios';
import {connect} from 'react-redux';
import { logout, setCurrentClient } from '../actions/auth_actions';
import SettingsDropdown from './util/settings_dropdown';


class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      dropdown : false,
      clients : [],
      client_id : this.props.client.clientId,
      client_name: "Select a Client",
      client_img : "",
      settings_dropdown: false,
      user: {}
    }
  }
  logout(e){
    //e.preventDefault();
    this.setState({
      dropdown: false,
      settings_dropdown:false
    })
    this.props.logout();
  }
toggleSettingsDropdown(){
  if(this.state.settings_dropdown){
    this.setState({
      settings_dropdown : false
    })
  }else{
    this.setState({
      settings_dropdown : true
    })
  }
}
getUser(){
  var this2 = this;
  
    if(this.props.auth.user.id !== undefined){
     axios.get('/api/users/' + this.props.auth.user.id).then(function(res){
      this2.setState({ user: res.data.User });
    })
   }
}
toggleDropdown(){
  this.getUserClients();
  
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
getUserClients(){
  var this2 = this;
      axios('/api/getUserClients/' + this.props.auth.user.id).then(function(res){
        this2.setState({clients:res.data.data})
      })
}
componentDidMount() {
  this.getUserClients();
   this.getUser();
}
componentWillReceiveProps(nextProps) {
  this.getUser();
  this.setState({
    client_name: nextProps.client.clientName,
    client_id: nextProps.client.clientId
  })
}
activeClient(clientId, clientName){
  this.props.setCurrentClient(clientId, clientName);
  this.props.clientId(clientId);

  $.getJSON('/api/clients/' + clientId)
      .then((data) => {
       
        this.setState({ client_name: this.props.client.clientName });
      });
  
  this.setState({
    client_id : this.props.client.clientId
  })

}

render(){
 
    var clientDropdown;
    var settingsDropdown;
    if(this.state.dropdown){
      clientDropdown = <DropdownList activeClient={this.activeClient.bind(this)} clients={this.state.clients}/>
    }else{

    }
    if(this.state.settings_dropdown){
      settingsDropdown = <SettingsDropdown logout={this.logout.bind(this)} activeClient={this.activeClient.bind(this)} clients={this.state.clients}/>
    }else{

    }
    return (
      <header className="header">
        <div className="container-fluid">
          <div className="logo"><img alt="logo" style={{height: 20, display: 'inline-block', lineHeight: 50}} src={logo} /></div>
          <div className="main-nav">
            <Link to="/admin/users" activeClassName="active">Admin</Link>
            
            <Link to="/map" activeClassName="active">Map</Link>
            {/*<Link to="/key_metrics" activeClassName="active">Key Metrics</Link>*/}
            <Link to="/rankings/population" activeClassName="active">Rankings</Link>
          </div>
          <ul className="user-nav">
            <li><a href="#"><i onClick={this.toggleSettingsDropdown.bind(this)} className="fa fa-gear"></i></a>
              {settingsDropdown}
            </li>
            <li><div onClick={this.toggleDropdown.bind(this)} className="client-dropdown">Client: {this.state.client_name}<i className="fa fa-caret-down" />
              {clientDropdown}
            </div>            
            </li>
            <li><Link to={"/user/" + this.props.auth.user.id}><span className="user-img" style={{backgroundImage: 'url('+this.state.user.user_img_path+')'}}></span></Link></li>
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
            
              <div className="client-dropdown-dd animated fadeInUp">
              {this.props.clients.map((data,i) => {
                return <div key={i} onClick={() => this.props.activeClient(data.id, data.client_name)} className="client-dd-option">{data.client_name}</div>;
              })
              }
                
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
export default connect(mapStateToProps, { logout, setCurrentClient })(Header);