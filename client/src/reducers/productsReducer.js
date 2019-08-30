
import {
	GET_PRODUCTS_ERROR,
	GET_PRODUCTS_RESPONSE,
	GET_PRODUCTS_REQUEST,
	ADD_TO_PRODUCTS
} from '../types';


const initialState = {
	products: [],
	loading: false,
	error: {},
	count: 0
}

const productsReducer = (state = initialState, action) => {
	switch(action.type){
		case GET_PRODUCTS_REQUEST:
			return {
				...state,
				loading: true
			}
		case GET_PRODUCTS_RESPONSE:
			return {
				...state,
				products: action.products,
				loading: false,
				count: action.count
			}
		case GET_PRODUCTS_ERROR: {
			return {
				...state,
				loading: false,
				error: action.error
			}
		}
		case ADD_TO_PRODUCTS: {
			return {
				...state,
				products: state.products.concat(action.products),
				count: action.count,
				loading: false
			}
		}
		default:
			return state;	
	}
}

export default productsReducer;
