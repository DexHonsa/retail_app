import React from 'react';
import {Link} from 'react-router';


class User extends React.Component {
  
render(){
  var icon;
  if(this.props.img === undefined){
   icon = <i className="fa fa-glass" />;
  }else{
    icon = '';
  }
  var deleteBtn;
  if(this.props.deleteUser === undefined){
        deleteBtn = undefined;
        }else{
          deleteBtn = <div onClick={() => this.props.deleteUser(this.props.index, this.props.id)} className="delete-client-btn">Delete</div>
        }

    
    return (
      <Link to={'/user/' + this.props.id}><li className="user-list-item animated fadeInUp">
              <div className="user-list-img" style={{backgroundImage: 'url('+this.props.img+')'}}>{icon}</div>
              <div className="user-list-info">
                <div className="user-list-name">{this.props.firstName} {this.props.lastName}</div>
                <div className="user-list-type">{this.props.role}</div>
               
              </div>
              <div className="client-list-activity">
              {deleteBtn}
                  
                  
                </div>
              
        </li></Link>

    );
  }
  }

export default User;