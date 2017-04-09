import React from 'react';



class Role extends React.Component {
  
render(){
  var accesses = [];
  this.props.roleAccesses.forEach(function(item){
    accesses.push(item + ', ');
  })
  var color;
  if(this.props.roleName == 'Admin'){
    color = '#3080e8';
  }else{
    color = '#39c4f9';
  }
    return (
      <li className="user-list-item">
        <div className="user-list-img" style={{background: color}}><i className="fa fa-glass" /></div>
        <div className="user-list-info">
          <div className="user-list-name">{this.props.roleName}</div>
          <div className="user-list-type" style={{color: '#1eb34c'}}>{accesses}</div>
        </div>
        <div className="client-list-activity">
          {/*<div onClick={() => this.props.deleteRole(this.props.index, this.props.id)} className="delete-client-btn">Delete</div>*/}
        </div>
      </li>


    );
  }
  }

export default Role;