import React from 'react';
import $ from "jquery";
import axios from 'axios';
import User from './user'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
  getUsers(){
    var this2 = this;
    axios.get('/api/users').then(function(res){
      this2.setState({ users: res.data.User });
    })
  }
  collapsePopup(){
    this.setState({popup : false})
   this.getUsers();
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
  this.getUsers();
  }
deleteUser(index, userId){
  var newData = this.state.users.slice(); //copy array
      newData.splice(index, 1); //remove element
      this.setState({users: newData}); //update state
    $.ajax({
            type: "DELETE",
            url: "/api/users/" + userId,
            success: function(data){
            },
            dataType: "json",
            contentType: "application/json"
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
          <ReactCSSTransitionGroup
                      transitionName="fadeUp"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                      transitionAppear={true}
                      transitionAppearTimeout={500}>
            {filteredUsers.map(function(data, i){
              return <User deleteUser={this.deleteUser.bind(this)} id={data.id} img={data.user_img_path} key={i} index={i} firstName={data.first_name} lastName={data.last_name} role={data.role_id} status={data.status}  />
            },this)}
            </ReactCSSTransitionGroup>
          </ul>
        </div>
      </div>
        </div>
    );
  }
  }

export default Users;