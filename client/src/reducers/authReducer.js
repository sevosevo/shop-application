import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, LOGOUT } from '../types';


const auth = (state = {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token'),
    error: null,
    loading: true
}, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                user: action.user,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                token: action.token
            }
        case AUTH_ERROR: 
        case LOGOUT:
            return {
                ...state,
                user:null,
                token:null,
                isAuthenticated:false,
                error: action.error,
                loading: false
            }
    }
    return state;
}


export default auth;