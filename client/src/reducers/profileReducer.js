import { GET_PROFILE_REQUEST, GET_PROFILE_RESPONSE, GET_PROFILE_ERROR, CLEAR_PROFILE } from '../types';

const profile = (state = {
    loading: false,
    profile: null,
    error: null
}, action) => {
    switch(action.type) {
        case GET_PROFILE_REQUEST:  
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE_RESPONSE:
            return {
                ...state,
                loading: false,
                profile: action.profile
            }
        case GET_PROFILE_ERROR: 
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile:null
            }
    }

    return state;
}

export default profile;