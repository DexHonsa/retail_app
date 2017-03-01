import React from 'react';
import $ from "jquery";
import User from './user'
import CreateUserPopup from '../popups/users/create_user_popup';

class Users extends React.Component {
  constructor(props) {
    super(props);
     
    this.state = {
      users : [],
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
  return $.getJSON('http://retailapi.theamp.com/user')
      .then((data) => {
        this.setState({ users: data.users });
      });
  }



render(){
    var filteredUsers = this.state.users.filter(
        (data) => {
          return data.first_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
        );
    if(this.state.popup){
            var popup = <CreateUserPopup collapse={this.collapsePopup.bind(this)} />
        } else {
          
        }
    return (
      <div>
      {popup}
      <div id="users-content">
        <div className="left-side-filter-container">
          <ul className="left-side-filter">
            <li className="filter-header">User Roles</li>
            <li>Admin (0)</li>
            <li className="filled">Retail Users (<span>1</span>)</li>
          </ul>
        </div>
        <div className="user-content">
          <div className="client-top-section">
            <input onChange={this.updateSearch.bind(this)} className="client-search" />
            <div onClick={this.expandPopup.bind(this)} className="add-client-btn">Add User</div>
          </div>
          <ul className="user-list">
            {filteredUsers.map(function(data){
              return <User firstName={data.first_name} lastName={data.last_name} role={data.role_id} status={data.status}  />
            })}
          </ul>
        </div>
      </div>
        </div>
    );
  }
  }

export default Users;