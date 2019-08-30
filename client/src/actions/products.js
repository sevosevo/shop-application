import {
	GET_PRODUCTS_ERROR,
	GET_PRODUCTS_RESPONSE,
	GET_PRODUCTS_REQUEST,
	ADD_TO_PRODUCTS
} from '../types.js';
import { 
	setAlert
} from './alert';
import { parseQueryParam } from '../actions/helperMethods';

const getProductsRequest = () => ({
	type: GET_PRODUCTS_REQUEST
});
const getProductsResponse = (products, count) => ({
	type: GET_PRODUCTS_RESPONSE,
	products,
	count
});
const productsError = (error) => ({
	type: GET_PRODUCTS_ERROR,
	error
});
const addProducts = (products, count) => ({
	type: ADD_TO_PRODUCTS,
	products,
	count
})

export const searchProducts = ({ queryString, limit, descriptionLength, allWord }) => async dispatch => {
	try{

		dispatch(getProductsRequest());

		const params = parseQueryParam({
			queryString,
			limit: limit || 7,
			descriptionLength: descriptionLength || 5,
			allWord: allWord 
		})

		const _res = await fetch('/api/products/search'+params);

		if(!_res.ok || _res.status !== 200) {
			return dispatch(productsError({
				status: res.status,
				message: 'XHR didn\'t respond with status 200'
			}));
		}

		const res = await _res.json();
		
		//Passing 0 as second argument because I will not have support for load more in search
		dispatch(getProductsResponse(res.rows, 0));

		dispatch(setAlert({
			message: res.rows.length +' products fetched that satisfy your search requests.', 
			classToHave: 'success', 
			time: 3000
		}));

	}catch(err){

		dispatch(productsError({
			message: err.message,
			status: 500
		}));
	}
};

export const getProducts = ({ limit, descriptionLength, page = 1 }) => async dispatch => {
	try{

		dispatch(getProductsRequest());

		const params = parseQueryParam({
			limit: limit || 7,
			descriptionLength: descriptionLength || 5, 
			page: page,
		});

		const _res = await fetch('/api/products'+params, {
			method: 'GET'
		});

		if(!_res.ok || _res.status !== 200) {

			return dispatch(productsError({
				status: res.status,
				message: 'XHR didn\'t respond with status 200'
			}));

		}

		const res = await _res.json();

		if(page === 1) {
			dispatch(getProductsResponse(res.rows, res.count));
		}else{
			dispatch(addProducts(res.rows, res.count));
			window.scrollTo(0,document.body.scrollHeight);
		}

	}catch(error) {

		dispatch(productsError({
			message: error.message,
			status: 500
		}));

	}
};

export const getProductsByCategory = ({ limit, descriptionLength, page = 1, categoryId  }) => async dispatch => {
	try{

		dispatch(getProductsRequest());

		const params = parseQueryParam({
			limit: limit || 7,
			descriptionLength: descriptionLength || 5, 
			page: page
		});
		
		const _res = await fetch(`/api/products/inCategory/${categoryId}${params}`, {
			method: 'GET'
		});

		if(!_res.ok || _res.status !== 200) {

			return dispatch(productsError({
				status: res.status,
				message: 'XHR didn\'t respond with status 200'
			}));

		}

		const res = await _res.json();

		if(page === 1){
			dispatch(getProductsResponse(res.rows, res.count));
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}else{
			dispatch(addProducts(res.rows, res.count));
			window.scrollTo(0,document.body.scrollHeight);
		}
		//Scroll user to the top of the page

	}catch(error) {

		dispatch(productsError({
			message: error.message,
			status: 500
		}));

	}
}