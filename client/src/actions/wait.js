import { START_WAIT, STOP_WAIT } from '../types';

export const startWait = () => dispatch => {
    dispatch({
        type: START_WAIT
    });
}
export const stopWait = () => dispatch => {
    dispatch({
        type: STOP_WAIT
    });
}