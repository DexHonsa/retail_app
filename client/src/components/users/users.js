import React from 'react';
import $ from "jquery";
import axios from 'axios';
import User from './user'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CreateUserPopup from '../popups/users/create_user_popup';
import {connect} from 'react-redux';
import Upgrade from '../util/upgrade';


class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users : [],
      search : "",
      popup: false,
      roles: [],
      upgradePopup:false
    }
    this.getRoles = this.getRoles.bind(this)
    this.getUsers = this.getUsers.bind(this)
  }

  showUpgradePopup(){
    this.setState({upgradePopup:true})
  }
  hideUpgradePopup(){
    this.setState({upgradePopup:false})
  }
  getUsers(){
    var this2 = this;
    axios.get('/api/getUsers/' + this.props.auth.user.parent_user).then(function(res){
      this2.setState({ users: res.data.User });
      this2.getRoles();
    })

  }
  getRoles(){
    var roles = [];
    if(this.state.users.length > 0){
      this.state.users.forEach(function(item){
       roles.push(item.role);
      })
    }else{
      //roles.push(this.state.users.role);
    }

    this.setState({
      roles : roles
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
  var addUserBtn;
  var filteredUsers;
  var filteredUsersDisplay;
  var upgradePopup;

  if(this.state.upgradePopup){
    upgradePopup = <Upgrade hideUpgradePopup={this.hideUpgradePopup.bind(this)}/>;
  }
    if(this.props.auth.user.role == 'Admin'){
      if(this.props.customer.customerPlan == 'silver-plan'){
        addUserBtn = <div onClick={this.showUpgradePopup.bind(this)} className="add-client-btn">Add User</div>;

      }else{
        addUserBtn = <div onClick={this.expandPopup.bind(this)} className="add-client-btn">Add User</div>;
      }

        if(this.props.customer.customerPlan == 'gold-plan'){
          if(this.state.users.length >= 4){
            addUserBtn = <div onClick={this.showUpgradePopup.bind(this)} className="add-client-btn">Add User</div>;
          }else{
            addUserBtn = <div onClick={this.expandPopup.bind(this)} className="add-client-btn">Add User</div>;
          }

        }

        if(this.props.customer.customerPlan == 'platnium-plan'){

            addUserBtn = <div onClick={this.expandPopup.bind(this)} className="add-client-btn">Add User</div>;


        }

    }


    if(this.state.users.length > 0){
      filteredUsers = this.state.users.filter(
        (data) => {

          return data.first_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
        );

      filteredUsersDisplay = filteredUsers.map(function(data, i){

               if(data.id === this.props.auth.user.id){
                 return <User id={data.id} img={data.user_img_path} key={i} index={i} firstName={data.first_name} lastName={data.last_name} role={data.role} status={data.status}  />
               }else if(this.props.auth.user.role == 'Admin'){
                 return <User id={data.id} img={data.user_img_path} key={i} index={i} firstName={data.first_name} lastName={data.last_name} role={data.role} status={data.status}  />
               }else{
                 return <User id={data.id} img={data.user_img_path} key={i} index={i} firstName={data.first_name} lastName={data.last_name} role={data.role} status={data.status}  />
               }

            },this)
    }
    if(this.state.popup){
            var popup = <CreateUserPopup collapse={this.collapsePopup.bind(this)} />
        } else {

        }
    return (
      <div>
      {popup}
      {upgradePopup}
      <div id="users-content">
        {/*<div className="left-side-filter-container">
          <ul className="left-side-filter">
            <li className="filter-header">User Roles</li>
            {this.state.roles.map(function(data,i){

              return <li onClick={() => this.setSearchTerm(data)} key={i}>{data}</li>
            },this)}

          </ul>
        </div>*/}
        <div className="user-content">
          <div className="client-top-section">
            <input placeholder="Search" onChange={this.updateSearch.bind(this)} className="client-search" />
            {addUserBtn}
          </div>
          <ul className="user-list">

            {filteredUsersDisplay}

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
export default connect(mapStateToProps)(Users);
