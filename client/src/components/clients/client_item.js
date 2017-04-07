import React from 'react';
import { Link } from 'react-router';

class ClientItem extends React.Component{
    
  render(){
    var deleteClientBtn;
    if(this.props.deleteClient !== undefined){
      deleteClientBtn = <div onClick={() => this.props.deleteClient(this.props.index, this.props.id)} className="delete-client-btn">Delete</div>;
    }
    return (
                  <li>
                    <div className="client-list-img" style={{backgroundImage: 'url(' + this.props.imgUrl + ')' }} />
                    <Link to={"/admin/clients/" + this.props.id}><div className="client-list-title">{this.props.clientName}<br /><span className="small-text">{this.props.industry}</span></div></Link>
                    <div className="client-list-activity">
                      {deleteClientBtn}
                    </div>
                  </li>
    );
  }
  }

export default ClientItem;