import { START_WAIT, STOP_WAIT } from '../types';

const waitReducer = (state={wait:false}, action) => {
    switch(action.type){ 
        case START_WAIT:
            return { wait: true }
        case STOP_WAIT: 
            return { wait: false}
    }
    return state;
}

export default waitReducer;