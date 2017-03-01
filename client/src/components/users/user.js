import React from 'react';



class User extends React.Component {
  
render(){
    return (
      <li className="user-list-item">
              <div className="user-list-img"><i className="fa fa-glass" /></div>
              <div className="user-list-info">
                <div className="user-list-name">{this.props.firstName} {this.props.lastName}</div>
                <div className="user-list-type">{this.props.role}</div>
                <div className="user-list-last-activity">Last Login: 2/12/17</div>
              </div>
              <div className="user-list-status">Status: <span style={{color: '#1BB745'}}>{this.props.status}</span></div>
        </li>

    );
  }
  }

export default User;