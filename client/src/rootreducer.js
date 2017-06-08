import { combineReducers } from 'redux';

import auth from './reducers/auth';
import client from './reducers/set_client';
import customer from './reducers/set_customer';

export default combineReducers({
	auth,
	client,
	customer

})
