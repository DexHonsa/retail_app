import React from 'react';




class ContactItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {contacts : props.contacts}
  }

  
  
render(){
    return (

      <li id={this.props.id}><span>{this.props.first_name} {this.props.last_name}</span> <span>{this.props.title}</span> <span>{this.props.email}</span> <span>{this.props.phone}</span><i onClick={this.props.delete} className="fa fa-close" /></li>

    );
  }
  }

export default ContactItem;