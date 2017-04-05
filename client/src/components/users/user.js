import React from 'react';



class User extends React.Component {
  
render(){
  var icon;
  if(this.props.img === undefined){
   icon = <i className="fa fa-glass" />;
  }else{
    icon = '';
  }
    return (
      <li className="user-list-item">
              <div className="user-list-img" style={{backgroundImage: 'url('+this.props.img+')'}}>{icon}</div>
              <div className="user-list-info">
                <div className="user-list-name">{this.props.firstName} {this.props.lastName}</div>
                <div className="user-list-type">{this.props.role}</div>
                <div className="user-list-status">Status: <span style={{color: '#1BB745'}}>{this.props.status}</span></div>
              </div>
              <div className="client-list-activity">
                  <div onClick={() => this.props.deleteUser(this.props.index, this.props.id)} className="delete-client-btn">Delete</div>
                  
                </div>
              
        </li>

    );
  }
  }

export default User;