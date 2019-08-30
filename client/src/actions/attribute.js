import {
    GET_ATTRIBUTE_RESPONSE,
    GET_ATTRIBUTES_REQUEST,
    GET_ATTRIBUTES_RESPONSE
} from '../types';
import {
    productError
} from './product';

const receiveAttributes = attributes => ({
    type: GET_ATTRIBUTE_RESPONSE,
    attributes
});

const requestAttributes = () => ({
    type: GET_ATTRIBUTES_REQUEST
});
const receiveAllAttributes = attributes => ({
    type: GET_ATTRIBUTES_RESPONSE,
    attributes
});

export const getAllAttributes = () => async dispatch => {
    try{

        dispatch(requestAttributes());

        const _res = await fetch(`/api/attributes`);

        if(!_res.ok || _res.status !== 200) {
            return dispatch(productError({
                status: _res.status,
                message: 'XHR didn\'t respond with status 200'
            }));
        }
        
        const res = await _res.json();

        dispatch(receiveAllAttributes(res))

    }catch(error) {

        dispatch(productError({
            status: 500,
			message: error.message
		}));

    }
}

export const getAttributes = id => async dispatch => {
    try{

        const _res = await fetch(`/api/attributes/inProduct/${id}/withValues`);
    
        if(!_res.ok || _res.status !== 200) {
            return dispatch(productError({
                status: _res.status,
                message: 'XHR didn\'t respond with status 200'
            }));
        }
    
        const res = await _res.json();
        
        dispatch(receiveAttributes({id, rows:res}));
        
    }catch(error){

        console.log(error);

        dispatch(productError({
            status: 500,
			message: error.message
		}));

    }
}
