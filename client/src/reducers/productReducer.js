import { GET_PRODUCT_RESPONSE, GET_ATTRIBUTE_RESPONSE, GET_PRODUCT_ERROR  } from '../types';

const prodReducer = (state = {}, action) => {
    switch(action.type){
        case GET_PRODUCT_RESPONSE: 
            return {
                ...state,
                [action.product.id] : {
                    ...state[action.product.id],
                    ...action.product
                }
            }
        case GET_ATTRIBUTE_RESPONSE: 
        console.log(action);
            return {
                ...state,
                [action.attributes.id]: {
                    ...state[action.attributes.id],
                    attributes: action.attributes.rows
                }
            }
    }
    return state;
}


const productReducer = (state = {
    product: {},
    loading: true,
    error: null
}, action) => {
    switch(action.type) {
        case GET_PRODUCT_RESPONSE: 
            return {
                ...state,
                loading: false,
                product: prodReducer(state.product, action)
            }
        case GET_ATTRIBUTE_RESPONSE: 
            return {
                ...state,
                product: prodReducer(state.product, action)
            }
        case GET_PRODUCT_ERROR: 
            return {
                ...state,
                error: action.error,
                loading: false
            }
    }
    return state;
};

export default productReducer;