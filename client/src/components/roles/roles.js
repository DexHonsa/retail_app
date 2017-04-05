import React from 'react';
import $ from "jquery";
import axios from 'axios';
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
    this.setState({popup : false});
    this.getRoles();
  }
  
  expandPopup(){
    this.setState({popup : true})
  }
getRoles(){
  var this2=this;
  axios.get('/api/roles').then(function(res){
    console.log(res);
    this2.setState({
      roles:res.data.data
    })
  })
}
updateSearch(event){
  this.setState({
    search: event.target.value.substr(0,20)
  });
}

componentDidMount() {
  this.getRoles();
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
            {this.state.roles.map(function(data, i){
              return <Role key={i} roleName={data.role_name} />
            })}
          </ul>
        </div>
      </div>

        </div>
    );
  }
  }

export default Roles;