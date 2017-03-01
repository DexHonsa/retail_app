import React from 'react';
import $ from "jquery";

import Role from './role'
import CreateRolePopup from '../popups/roles/create_role_popup';

class Roles extends React.Component {
  constructor(props) {
    super(props);
     
    this.state = {
      roles : [],
      search : "",
      popup: false
    }
  }

  collapsePopup(){
    this.setState({popup : false})
  }
  
  expandPopup(){
    this.setState({popup : true})
  }

updateSearch(event){
  this.setState({
    search: event.target.value.substr(0,20)
  });
}

componentDidMount() {
  return $.getJSON('http://retailapi.theamp.com/roles')
      .then((data) => {
       
        this.setState({ roles: data.roles });
      });
  }



render(){
    
    if(this.state.popup){
            var popup = <CreateRolePopup collapse={this.collapsePopup.bind(this)} />
        } else {
           
        }
    return (
      <div>
      {popup}
      <div id="roles-content">
        <div className="user-content">
          <div className="client-top-section">
            <div className="description-blurb">Roles are what you can use to limit users to certain portions of the application. </div>
            <div onClick={this.expandPopup.bind(this)} className="add-client-btn" data-popup-type="role">Add Role</div>
          </div>
          <ul className="user-list">
            {this.state.roles.map(function(data){
              return <Role roleName={data.role_name} />
            })}
          </ul>
        </div>
      </div>

        </div>
    );
  }
  }

export default Roles;