import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const alertReducer = (state = [], action) => {
    switch(action.type){
    case SET_ALERT:
        return [
            ...state,
            action.alert
        ]
    case REMOVE_ALERT:
        return state.filter(alert => alert.id !== action.id)
    }
    return state;
};


export default alertReducer;