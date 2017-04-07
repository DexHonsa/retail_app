import React from 'react';
import {browserHistory} from 'react-router';
import logo from '../../../images/sitemap_logo.png';
import {connect} from 'react-redux';
import { userLogin } from '../../actions/auth_actions';
import LoginForm from './login_form';


class LoginHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username : '',
			password : '',
			errors : {}, 
			isLoading : ''
		}		
	}
componentDidMount() {
		if(this.props.auth.isAuthenticated){
			browserHistory.push('/admin/users')
		}else{

		}
	}
	
	render() {
		
		return(
			<div className="wrapper">
		        <header className="header">
		          <div className="container-fluid">
		            <div className="logo"><img alt="" style={{height: 20, display: 'inline-block', lineHeight: 50}} src={logo} /></div>
		            <div className="main-nav">
		            </div>
		          </div>
		        </header>{/* /.header */}
		        <div className="stage">
		          <div className="main-message">Tenant Management Redefined.<br /><span style={{fontSize: '30pt'}}>Site selection made easy.</span></div>
		          <div className="login-container">
		            <LoginForm/>
		          </div>
		        </div>
		      </div>

			);
	}	
}

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {userLogin})(LoginHome);
