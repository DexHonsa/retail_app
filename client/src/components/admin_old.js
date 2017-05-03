import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import Clients from './clients/clients';
import Users from './users/users';

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPage: "clients",
    }
    this.onNav = this.onNav.bind(this);
  }

  onNav(nav){
    this.setState({
      showPage : nav
    })

  }





  render(){
    var page;
    if(this.state.showPage == "clients"){
        page =  <Clients />;
      }
      if(this.state.showPage == "users"){
        page =  <Users />;
      }



    return (
      <main className="main">
        <div className="popup" style={{display: 'none'}}>
          <div className="popup-container animated fadeInUp">
            <div className="popup-title">Add New Client</div>
            <form>
              <div className="popup-small-title">Upload a Logo</div>
              <div className="upload-picture">
                <i className="fa fa-camera" />
              </div>
              <div className="popup-small-title">Basic Info</div>
              <div className="form-row">
                <div style={{flex: 2}}>
                  <p>
                    <label htmlFor="client-name">Client Name</label>
                    <input className="popup-input" type="text" name="field_id" id="client-name" />
                  </p>
                </div>
                <div className="popup-selector-dropdown" style={{flex: 1}}>
                  <select>
                    <option default>Industry</option>
                    <option>Industry</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div style={{flex: 1}}>
                  <p>
                    <label htmlFor="address">Street Address</label>
                    <input className="popup-input" type="text" name="field_id" id="address" />
                  </p>
                </div>
                <div style={{flex: 1, marginLeft: 10}}>
                  <p>
                    <label htmlFor="city">City</label>
                    <input className="popup-input" type="text" name="field_id" id="city" />
                  </p>
                </div>
              </div>
              <div className="form-row">
                <div className="popup-selector-dropdown" style={{flex: 1, maxWidth: 250, marginLeft: 0}}>
                  <select>
                    <option default>State</option>
                    <option>Alabama</option>
                    <option>Arkansa</option>
                    <option>Alaska</option>
                    <option>New York</option>
                    <option>Virginia</option>
                    <option>California</option>
                    <option>Nevada</option>
                    <option>Nebraska</option>
                    <option>New York</option>
                    <option>Virginia</option>
                    <option>California</option>
                    <option>Nevada</option>
                    <option>Nebraska</option>
                    <option>New York</option>
                    <option>Virginia</option>
                    <option>California</option>
                    <option>Nevada</option>
                    <option>Nebraska</option>
                    <option>New York</option>
                    <option>Virginia</option>
                  </select>
                </div>
                <div style={{flex: 1, maxWidth: 100, marginLeft: 10}}>
                  <p>
                    <label htmlFor="zip">Zip</label>
                    <input className="popup-input" type="text" name="field_id" id="zip" />
                  </p>
                </div>
              </div>
              <div className="popup-small-title">Contact Info</div>
              <div className="added-contacts">
                <ul className="added-contacts-list">
                  <li><span>Henry Rice</span> <span>Director of Marketing</span> <span>HenryRice@gmail.com</span> <span>(760)534-9625</span><i className="fa fa-close" /></li>
                  <li><span>Mary Slumber</span> <span>Director of Sales</span> <span>HenryRice@gmail.com</span> <span>(760)534-9625</span><i className="fa fa-close" /></li>
                </ul>
              </div>
              <div className="form-row">
                <div style={{flex: 1}}>
                  <p>
                    <label htmlFor="first-name">First Name</label>
                    <input className="popup-input" type="text" name="field_id" id="first-name" />
                  </p>
                </div>
                <div style={{flex: 1, marginLeft: 10}}>
                  <p>
                    <label htmlFor="last-name">Last Name</label>
                    <input className="popup-input" type="text" name="field_id" id="last-name" />
                  </p>
                </div>
                <div style={{flex: 1, marginLeft: 10}}>
                  <p>
                    <label htmlFor="title-name">Title</label>
                    <input className="popup-input" type="text" name="field_id" id="title-name" />
                  </p>
                </div>
              </div>
              <div className="form-row">
                <div style={{flex: 2}}>
                  <p>
                    <label htmlFor="email">Email</label>
                    <input className="popup-input" type="text" name="field_id" id="email" />
                  </p>
                </div>
                <div style={{flex: 2, marginLeft: 10}}>
                  <p>
                    <label htmlFor="phone">Phone</label>
                    <input className="popup-input" type="text" name="field_id" id="phone" />
                  </p>
                </div>
                <div style={{flex: 1, marginLeft: 10}}>
                  <div className="add-contact-btn">Add Contact</div>
                </div>
              </div>
              <div className="form-row" style={{borderTop: 'solid 1px #e0e0e0'}}>
                <div className="create-client-btn" style={{marginTop: 15}}>Create Client</div>
              </div>
            </form>
          </div>
        </div>
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', minHeight: 'calc(100vh - 70px)', padding: 0}}>
            <div className="retail-tabs">
              <div onClick={() => this.onNav('clients')} className="retail-tab">Clients</div>
              <div onClick={() => this.onNav('users')} className="retail-tab" >Users</div>
              <div onClick={() => this.onNav('roles')} className="retail-tab" >Roles</div>
              <div onClick={() => this.onNav('messages')} className="retail-tab">Messages</div>
            </div>
            <div>
            {page}
            </div>


          </div>
        </div>
      </main>

    );
  }
  }

export default Admin;
