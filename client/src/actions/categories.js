import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_RESPONSE,
    CATEGORY_ERROR
} from '../types';
import {
    sendIfNot200
} from './helperMethods';

const requestCategories = () => ({
    type: GET_CATEGORIES_REQUEST
});
const receiveCategories = (categories, count) => ({
    type: GET_CATEGORIES_RESPONSE,
    categories,
    count
})
const categoriesError = (error) => ({
    type: CATEGORY_ERROR,
    error
})

export const getCategories = () => async dispatch => {
    
    dispatch(requestCategories());

    const _res = await fetch('/api/categories/inDepartments', {
        method: 'GET'
    });

    if(await sendIfNot200(_res, categoriesError, dispatch)) return true;

    const res = await _res.json();
    
    
    dispatch(receiveCategories(res.rows, res.count));

}

export const getCategoriesInDepartment = id => async dispatch => {

    dispatch(requestCategories());

    const _res = await fetch(`/api/categories/inDepartment/${id}`, { method: 'GET' });

    if(await sendIfNot200(_res, categoriesError, dispatch)) return true;

    const res = await _res.json();

    dispatch(receiveCategories(res, res.length));

}