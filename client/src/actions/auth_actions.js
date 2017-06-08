 import axios from 'axios';
 import setAuthorizationToken from '../utils/set_authorization_token';
 import { SET_CURRENT_USER, SET_CURRENT_CLIENT,SET_CUSTOMER } from './types';
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
export function setCustomer(customerId, plan, status){
  return {
    type:SET_CUSTOMER,
    customerId,
    plan,
    status
  }
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

export function getCustomer(data){

  return dispatch => {
  return axios.get('/api/getCustomer' + '/' + data).then(res => {
    localStorage.setItem('customerId', res.data.customer.id);
    localStorage.setItem('customerPlan', res.data.customer.subscriptions.data[0].plan.id);
    localStorage.setItem('customerStatus', res.data.customer.subscriptions.data[0].status);
    
    dispatch(setCustomer(res.data.customer.id, res.data.customer.subscriptions.data[0].plan.id,res.data.customer.subscriptions.data[0].status))
  })
}
}

export function userLogin(data) {
	return dispatch => {
		return axios.post('/api/login', data).then(res => {
			const token = res.data.token;
			localStorage.setItem('jwtToken', token);
			setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
      return jwtDecode(token);
      //getCustomer(jwtDecode(token));


		})
	}
}

export function userSignup(data) {
	return dispatch => {
		return axios.post('/api/signUpUser', data).then(res => {
			const token = res.data.token;
			localStorage.setItem('jwtToken', token);
			setAuthorizationToken(token);
			dispatch(setCurrentUser(jwtDecode(token)));
		})
	}
}
