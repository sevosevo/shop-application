import {
    GET_DEPARTMENTS_RESPONSE,
    DEPARTMENT_ERROR,
    GET_DEPARTMENT_RESPONSE
} from '../types';

const departmentReducer = (state = {
    departments: [],
    error: null,
    loading: true
}, action) => {
    switch(action.type) {
        case GET_DEPARTMENTS_RESPONSE: 
            return {
                ...state,
                departments: action.departments,
                loading: false
            }
        case GET_DEPARTMENT_RESPONSE: 
            return {
                ...state,
                departments: state.departments.concat(action.department),
                loading: false
            }
        case DEPARTMENT_ERROR: 
            return {
                ...state,
                loading: false,
                error: action.error,
            }
    }
    return state;
}


export default departmentReducer;