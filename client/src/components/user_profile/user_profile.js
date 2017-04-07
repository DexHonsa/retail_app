import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class UserProfile extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			userId: this.props.params.id,
			user: []

		}
	}

	componentDidMount() {
		this.getUser();
	}
	getUser(){
		var this2 = this;
		axios.get('/api/users/' + this.state.userId).then(function(res){
			this2.setState({
				user: res.data.User
				
			})
			
			
		})
	}
	render(){
		
		
		return(
			<main className="main">
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', height: 'calc(100vh - 70px)', padding: 0}}>
            <div className="view-client-top">
              <div className="view-client-logo-container">
                <div className="view-client-logo-img" style={{backgroundImage: 'url('+this.state.user.user_img_path+')'}} />
                <div className="change-logo-btn">Change Profile Pic</div>
              </div>
              <div className="view-client-title">{this.state.user.first_name}<br /><span style={{fontSize: '15pt', color: '#808080'}}>{this.state.user.role}</span></div>
            </div>
            <div className="details-container">
              <div className="col-sm-8">
                <div className="client-details">
                  <div className="field-header">Your Info</div>
                  <div className="field-container">
                    <div className="field-title">Email Address</div>
                    <div className="field-value">{this.state.user.email}</div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">Password</div>
                    <div className="field-value">Change Password</div>
                  </div>
                </div>
                
              </div>
              <div className="col-sm-4">
                <div className="client-contacts">
                  <div className="client-contact-header">Related Contacts</div>
                  <div className="client-contact-item">
                    <div className="client-contact-desc">Jeffery Ortiz<br /><span style={{fontSize: '10pt', color: '#808080'}}>Coordinator</span></div>
                    <div className="client-contact-icons"><i className="fa fa-envelope" /> <i className="fa fa-phone" /> <i className="fa fa-times-rectangle" /></div>
                  </div>
                  <div className="client-contact-item">
                    <div className="client-contact-desc">Jeffery Ortiz<br /><span style={{fontSize: '10pt', color: '#808080'}}>Coordinator</span></div>
                    <div className="client-contact-icons"><i className="fa fa-envelope" /> <i className="fa fa-phone" /> <i className="fa fa-times-rectangle" /></div>
                  </div>
                  <div className="client-contact-item">
                    <div className="client-contact-desc">Jeffery Ortiz<br /><span style={{fontSize: '10pt', color: '#808080'}}>Coordinator</span></div>
                    <div className="client-contact-icons"><i className="fa fa-envelope" /> <i className="fa fa-phone" /> <i className="fa fa-times-rectangle" /></div>
                  </div>
                  <div className="client-contact-item">
                    <div className="client-contact-desc">Jeffery Ortiz<br /><span style={{fontSize: '10pt', color: '#808080'}}>Coordinator</span></div>
                    <div className="client-contact-icons"><i className="fa fa-envelope" /> <i className="fa fa-phone" /> <i className="fa fa-times-rectangle" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

			);
	}
}


function mapStateToProps(state){
  return{
    auth: state.auth,
    client: state.client
  }
}
export default connect(mapStateToProps)(UserProfile);