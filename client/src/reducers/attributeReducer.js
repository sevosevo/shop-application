import { GET_ATTRIBUTES_REQUEST, GET_ATTRIBUTES_RESPONSE, GET_ATTRIBUTES_ERROR } from '../types';


const attributeReducer = (state = {
	isFetching: false,
	attributes: [],
	error: null
}, action) => {
	switch(action.type) {
		case GET_ATTRIBUTES_RESPONSE: 
			return {
				...state,
				isFetching: false,
				attributes: action.attributes
			}
		case GET_ATTRIBUTES_ERROR:
			return {
				...state,
				error: action.error,
				isFetching: false
			}
		case GET_ATTRIBUTES_REQUEST: 
			return {
				...state,
				isFetching: true
			}
		default: 
			return state;
	}
}


export default attributeReducer;