import { GET_CATEGORIES_REQUEST, GET_CATEGORIES_RESPONSE, CATEGORY_ERROR } from '../types';


const categoryReducer = (state = {
    categories: [],
    loading: false,
    count: null,
    errors: []
}, action) => {
    switch(action.type) {
        case GET_CATEGORIES_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case GET_CATEGORIES_RESPONSE: 
            return {
                ...state,
                categories: action.categories,
                count: action.count,
                loading: false
            }
        case CATEGORY_ERROR: 
            return {
                ...state,
                loading: false,
                error: action.error
         }
    }
    return state;
}

export default categoryReducer;



/*
const catRed = (state = {
    categories: {},
    loading: false,
    count: 0,
    error: null
}, action) => { 
    switch(action.type) {
        case GET_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_CATEGORIES_RESPONSE:
            return {
                ...state,
                categories: {
                    [action.category.id] : {
                        ...action.category
                    }
                },
                count: state.count + 1
            }
        case CATEGORY_ERROR: 
            return {
                ...state,
                loading: false,
                errors:
            }
    }
};
//Action creators
export const getCategory = () => async dispatch => {
    
    dispatch(requestCategories());

    const _res = await fetch('/api/categories/inDepartments', {
        method: 'GET'
    });

    if(await sendIfNot200(_res, categoriesError, dispatch)) return true;

    const res = await _res.json();
    
    res.forEach(category => dispatch(receiveCategory({
        type: GET_CATEGORY_RESPONSE,
        category
    })));
    
}

//Front end
const categories = Object.keys(state.categories).map(key => state.categories[key]);

*/
