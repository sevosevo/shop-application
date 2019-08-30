import { GET_REVIEWS_REQUEST, GET_REVIEWS_ERROR, GET_REVIEWS_RESPONSE } from '../types';
import { sendIfNot200 } from './helperMethods';
import authFetch from '../fetch';

const requestReviews = () => ({
    type: GET_REVIEWS_REQUEST
});

const receiveReviews = reviews => ({
    type: GET_REVIEWS_RESPONSE,
    reviews
}); 

const reviewError = () =>  ({
    type: GET_REVIEWS_ERROR
});

export const postReview = (formData, id) => async dispatch => {

    await authFetch(`/api/products/${id}/reviews`, { method: 'POST', body: JSON.stringify(formData), headers: {'Content-Type': 'application/json'} });

    dispatch(getReviews(id));

}

export const getReviews = id => async dispatch => {

    try{

    dispatch(requestReviews());

    const _res = await fetch(`/api/products/${id}/reviews/details`, { method: 'GET' });

    sendIfNot200(_res, reviewError);

    const reviews = await _res.json();

    dispatch(receiveReviews(reviews));

    }catch(error){

        dispatch({
            type: GET_REVIEWS_ERROR,
            error
        });

    }

};