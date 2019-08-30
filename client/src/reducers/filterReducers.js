import {
    SET_PRICE_RANGE,
    SET_SORT_BY,
    SHOW_DISCOUNTED
} from '../types';


export const filterRangeReducer = (state = 100, action) => {
    switch(action.type){
        case SET_PRICE_RANGE:
            return action.value
    }
    return state;
}
export const sortByReducer = (state = 'none', action) => {
    switch(action.type){
        case SET_SORT_BY:
            return action.sortBy;
    }
    return state;
}
export const showDiscountedReducer = (state=false, action) => {
    switch(action.type){
        case SHOW_DISCOUNTED: 
            return action.show
    }
    return state;
}