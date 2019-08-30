import { WARNING_TURN_ON, WARNING_TURN_OFF } from '../types';


const warningReducer = (state = true, action) => {
    if(action.type === WARNING_TURN_ON) {
        return true;
    }
    if(action.type === WARNING_TURN_OFF) {
        return false;
    }
    return state;
} 

export default warningReducer;