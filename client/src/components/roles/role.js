import React from 'react';



class Role extends React.Component {
  
render(){
    return (
      <li className="user-list-item">
        <div className="user-list-img"><i className="fa fa-glass" /></div>
        <div className="user-list-info">
          <div className="user-list-name">{this.props.roleName}</div>
          <div className="user-list-type" style={{color: '#1eb34c'}}>All Access</div>
        </div>
      </li>


    );
  }
  }

export default Role;