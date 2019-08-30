import {
    SET_PRICE_RANGE,
    SET_SORT_BY,
    SHOW_DISCOUNTED
} from '../types.js';

export const setPriceRange = (value) => ({
    type: SET_PRICE_RANGE,
    value
});

export const setSorting = (sortBy) => ({
    type: SET_SORT_BY,
    sortBy
});
export const showDiscounted = (show) => ({
    type: SHOW_DISCOUNTED,
    show
});