import { SET_CUSTOMER } from '../actions/types';
const initialState = {
	customerId: '',
	customerPlan:'',
	customerPlanStatus:''
}

function setCustomer(state = initialState, action){
	switch(action.type){
		case SET_CUSTOMER:
			return {...state.customerId, customerId: action.customerId,...state.customerPlan, customerPlan: action.plan, ...state.customerPlanStatus, customerPlanStatus: action.status}
		case "LOGOUT":
			return {...state.customerId, customerId: "",...state.customerPlan, customerPlan: "",...state.customerPlanStatus, customerPlanStatus: ""}

		default:
			return state;
	}
}

export default setCustomer;
