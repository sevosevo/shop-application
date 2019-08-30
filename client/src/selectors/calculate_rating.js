import { createSelector } from 'reselect';

const reviews = state => state.review.reviews;

const calculateRating = reviews => {
    
    let calculatedRating = 0;
    let allRev = 0;

    if(reviews.length > 0){

        reviews.forEach(review => allRev += review.rating);

        calculatedRating = parseFloat(String(allRev / reviews.length)).toFixed(2);

    }

    return calculatedRating;
};

export default createSelector(reviews, calculateRating);