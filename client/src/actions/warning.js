import { WARNING_TURN_OFF, WARNING_TURN_ON  } from '../types';


export const warningTurnOn = () => ({
    type: WARNING_TURN_ON
});
export const warningTurnOff = () => ({
    type: WARNING_TURN_OFF
});