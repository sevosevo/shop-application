import {
    GET_REVIEWS_ERROR,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_RESPONSE
} from '../types';


const reviewReducer = (state = {
    loading: false,
    reviews: [],
    error: null
}, action) => {
    switch(action.type) {
        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_REVIEWS_RESPONSE:
            return {
                ...state,
                reviews: action.reviews,
                loading: false
            }
        case GET_REVIEWS_ERROR: 
            return {
                loading: false,
                error: action.error
            }
        default : return state;
    }
}

export default reviewReducer;