 import axios from 'axios';
 import setAuthorizationToken from '../utils/set_authorization_token';
 import { SET_CURRENT_USER, SET_CURRENT_CLIENT } from './types';
 import jwtDecode from 'jwt-decode';
 import { browserHistory } from 'react-router';

export function setCurrentUser(user){
	return {
		type: SET_CURRENT_USER,
		user
	};
}
export function setCurrentClient(clientId, clientName){
	return { 
		type: SET_CURRENT_CLIENT,
		clientId,
		clientName
	};
}
export function logoutClear(){
	return {
		type: "LOGOUT"
	}
}
export function logout(){

	return dispatch => {
		localStorage.removeItem('jwtToken');
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
		browserHistory.push('/login');
		dispatch(logoutClear());
	}
}
export function userLogin(data) {
	return dispatch => {
		return axios.post('/api/login', data).then(res => {
			const token = res.data.token;
			localStorage.setItem('jwtToken', token);
			setAuthorizationToken(token);
			dispatch(setCurrentUser(jwtDecode(token)));
		})
	}
}


// export function userSignup(data) {
// 	return dispatch => {
// 		return axios.post('/api/signup', data).then(res => {
// 			const token = res.data.token;
// 			localStorage.setItem('jwtToken', token);
// 			setAuthorizationToken(token);

// 			dispatch(setCurrentUser(jwtDecode(token)));
			
// 		})
// 	}
// }