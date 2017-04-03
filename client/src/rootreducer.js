import { combineReducers } from 'redux';

import auth from './reducers/auth';
import client from './reducers/set_client';

export default combineReducers({
	auth,
	client
	
})