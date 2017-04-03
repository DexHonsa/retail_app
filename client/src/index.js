import React from 'react';
import 'whatwg-fetch';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { browserHistory, IndexRoute } from 'react-router';
import {Provider} from 'react-redux';
import App from './components/app';
import LoginHome from './components/login/login';
import Admin from './components/admin';
import Map from './components/map/map';
import Clients from './components/clients/clients';
import ViewClient from './components/clients/view_client';
import Users from './components/users/users';
import Roles from './components/roles/roles';
import KeyMetrics from './components/key_metrics/key_metrics';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import setAuthoizationToken from './utils/set_authorization_token';
import RootReducer from './rootreducer';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/auth_actions';


import '../style/admin.css';
import '../style/mycss.css';
import '../style/style.css';
import '../style/animate.css';
import '../style/view_client.css';
import '../style/key_metrics.css';
import '../bootstrap/css/bootstrap.min.css';
import '../style/font-awesome.min.css';


const store = createStore(
        RootReducer,
        compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

if(localStorage.jwtToken){
  setAuthoizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}









ReactDOM.render(
	
  <Provider store={store}>
    <Router history={browserHistory}>
    	<Route path="/" component={App}>
        <IndexRoute Component={LoginHome}/>
        <Route path="/login" component={LoginHome}></Route>
    		<Route path="/admin" component={Admin}>
    			<IndexRoute component={Clients}></IndexRoute>
    			<Route path="/admin/clients" component={Clients}></Route>
    			<Route path="/admin/users" component={Users}></Route>
                <Route path="/admin/roles" component={Roles}></Route>
    		</Route>
        <Route path="/admin/clients/:id" component={ViewClient}></Route>
    		<Route path="map" component={Map}></Route>
        <Route path="map/:clientId" component={Map}></Route>
        <Route path="key_metrics" component={KeyMetrics}></Route>
    	</Route>
    	
    	
    </Router>
  </Provider>
  , document.querySelector('.everything'));
