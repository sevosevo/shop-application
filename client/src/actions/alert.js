import {
    SET_ALERT, REMOVE_ALERT
} from '../types';
import uuid4 from 'uuid/v4';

const createAlert = alert => ({
    type: SET_ALERT,
    alert
})

const removeAlert = id => ({
    type: REMOVE_ALERT,
    id
})

export const setAlert = ({ message, time, classToHave}) => dispatch => {

    const alert = {
        message,
        classToHave,
        id: uuid4()
    }

    dispatch(createAlert(alert));

    setTimeout( () => {

        dispatch(removeAlert(alert.id))

    }, time);

};