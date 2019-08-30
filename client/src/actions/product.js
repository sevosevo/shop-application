import {
    GET_PRODUCT_RESPONSE,
    GET_PRODUCT_ERROR
} from '../types';


const receiveProduct = product => ({
    type: GET_PRODUCT_RESPONSE,
    product
});

export const productError = error => ({
    type: GET_PRODUCT_ERROR,
    error
});

export const getProduct = id => async dispatch => {

    try{
        
        const _res = await fetch(`/api/products/${id}`, { method: 'GET' });

        if(!_res.ok || _res.status !== 200) {
            return dispatch(productError({
                status: _res.status,
                message: 'XHR didn\'t respond with status 200'
            }));
        }

        const res = await _res.json();

        dispatch(receiveProduct(res));
    }catch(error){
        
        dispatch(productError({
            status: 500,
            message: error.message
        }));

    }

}