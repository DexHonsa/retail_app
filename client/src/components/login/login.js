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
		        
		        <div className="stage">
		          <div className="main-message">Tenant Relationships Redefined.<br /><span style={{fontSize: '30pt'}}>Site selection made easy.</span></div>
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
