import React from 'react';
import 'whatwg-fetch';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { browserHistory, IndexRoute } from 'react-router';
import {Provider} from 'react-redux';
import App from './components/app';
import {connect} from 'react-redux';


import LoginHome from './components/login/login';
import Admin from './components/admin';
import Map from './components/map/map';
import Clients from './components/clients/clients';
import Reports from './components/reports/reports';
import ViewClient from './components/clients/view_client';
import Users from './components/users/users';
import Roles from './components/roles/roles';
import UserProfile from './components/user_profile/user_profile';
import Messages from './components/messages/messages';
import Rankings from './components/rankings/rankings';
import KeyMetrics from './components/key_metrics/key_metrics_map';
import SignUps from './components/superadmin/signups';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import setAuthoizationToken from './utils/set_authorization_token';
import RootReducer from './rootreducer';
import jwtDecode from 'jwt-decode';
import { setCurrentUser, setCustomer } from './actions/auth_actions';
import Property from './components/property/property';
import PropertyDetails from './components/property/property_details';
import FinancialDetails from './components/property/financial_details';
import LeaseInformation from './components/property/lease_information';
import Terms from './components/property/lease_abstract/terms';
import Revenue from './components/property/lease_abstract/revenue';
import Capex from './components/property/lease_abstract/capex';
import Options from './components/property/lease_abstract/options';
import Clauses from './components/property/lease_abstract/clauses';
import Documents from './components/property/lease_abstract/documents';
import Insurance from './components/property/lease_abstract/insurance';
import Tenant from './components/property/lease_abstract/tenant';
import ViewLising from './components/listing/view_listing';
import Pipeline from './components/pipeline/pipeline';
import EmailReport from './components/reports/email_report';



import '../style/admin.css';
import '../style/mycss.css';
import '../style/style.css';
import '../style/animate.css';
import '../style/view_client.css';
import '../style/view_listing.css';
import '../style/key_metrics.css';
import '../style/messages.css';
import '../bootstrap/css/bootstrap.min.css';
import '../style/font-awesome.min.css';
import '../style/view_property.css';
import '../style/login.css';


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
  store.dispatch(setCustomer(localStorage.customerId, localStorage.customerPlan, localStorage.customerStatus));
}








ReactDOM.render(

  <Provider store={store}>
    <Router history={browserHistory}>
    	<Route path="/" component={App}>
        <IndexRoute Component={LoginHome}/>
        <Route path="/login" component={LoginHome}></Route>
        <Route path="/signups" component={SignUps}></Route>
        <Route path="/user/:id" component={UserProfile}></Route>
        <Route path="/rankings" component={Rankings}></Route>
        <Route path="/pipeline" component={Pipeline}></Route>
        <Route path="/rankings/population" component={Rankings} field="Population"></Route>
        <Route path="/rankings/households" component={Rankings} field="TotalHouseholds"></Route>
        <Route path="/rankings/education" component={Rankings} field="EducationBachelorOrGreater"></Route>
        <Route path="/rankings/income" component={Rankings} field="IncomePerHousehold"></Route>
        <Route path="/reports" component={Reports}></Route>
        <Route path="/emailreport/:id" component={EmailReport}></Route>
    		<Route path="/admin" component={Admin}>
    			<Route path="/admin/clients" component={Clients}></Route>
    			<Route path="/admin/users" component={Users}></Route>
                <Route path="/admin/roles" component={Roles}></Route>
                <Route path="/admin/messages" component={Messages}></Route>
    		</Route>
        <Route path="/admin/clients/:id" component={ViewClient}></Route>
		<Route path="map" component={Map}></Route>
        <Route path="map/:zip" component={Map}></Route>
        <Route path="keymetrics" component={KeyMetrics}></Route>
        <Route path="/listing/:id" component={ViewLising}></Route>
        <Route path="/property/:id" component={Property}>
          <IndexRoute Component={PropertyDetails}/>
          <Route path="/property/propertydetails/:id" component={PropertyDetails}></Route>
          <Route path="/property/financialdetails/:id" component={FinancialDetails}></Route>
          <Route path="/property/leaseinformation/:id" component={LeaseInformation}>
            <Route path="/property/leaseinformation/terms/:id" component={Terms}></Route>
            <Route path="/property/leaseinformation/revenue/:id" component={Revenue}></Route>
            <Route path="/property/leaseinformation/capex/:id" component={Capex}></Route>
            <Route path="/property/leaseinformation/options/:id" component={Options}></Route>
            <Route path="/property/leaseinformation/clauses/:id" component={Clauses}></Route>
            <Route path="/property/leaseinformation/documents/:id" component={Documents}></Route>
            <Route path="/property/leaseinformation/insurance/:id" component={Insurance}></Route>
            <Route path="/property/leaseinformation/tenant/:id" component={Tenant}></Route>
          </Route>
        </Route>
    	</Route>


    </Router>
  </Provider>
  , document.querySelector('.everything'));
