import React from 'react';
import { Link } from 'react-router';

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPage: "",
    }
    
  }


 
  
  


  render(){
      

     
     


    return (
      <main className="main">
        
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', minHeight: 'calc(100vh - 70px)', padding: 0}}>
            <div className="retail-tabs">
              <Link to="/admin/clients" className="retail-tab" activeClassName="active">Clients</Link>
              <Link to="/admin/users" className="retail-tab" activeClassName="active">Users</Link>
              <Link to="/admin/roles" className="retail-tab" activeClassName="active">Roles</Link>
              <Link to="/admin/messages" className="retail-tab" activeClassName="active">Messages</Link>
          
            </div>
            <div>
            {this.props.children}
            </div>
            
           
          </div>
        </div>
      </main>

    );
  }
  }

export default Admin;