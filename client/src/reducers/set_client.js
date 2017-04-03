import { SET_CURRENT_CLIENT } from '../actions/types';
const initialState = {
	clientName: 'Select a Client'
}

function setClient(state = initialState, action){
	switch(action.type){
		case SET_CURRENT_CLIENT:
			return {...state.client, clientId: action.clientId, ...state.client, clientName: action.clientName}
		case "LOGOUT":
			return {...state.client, clientId: "",...state.client, clientName: "Select a Client"}
			
		default:
			return state;
	}
}

export default setClient;
