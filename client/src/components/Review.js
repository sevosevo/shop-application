import React, {Fragment} from 'react';
import { formatDate } from '../formatDate';
const titleClass = 'card-title';

const Review = ({review}) => {
    return (
    <div className="card col-4 my-2">
      <div className="card-body">
        <p><small className="card-text">
         Written by { review.customer.name } on { formatDate(review.createdAt) } 
        </small></p>
        <p className="card-text">{ 
          review.review.split('\n').map((i, n) => {
            return n > 0 ? <Fragment><br/>{i}</Fragment> : <Fragment>{i}</Fragment>;
           }) 
          }
        </p>
         <span
        className={
          ((review.rating >= 1 && review.rating <= 2) && `${titleClass} badge badge-danger`) ||
          (review.rating == 3) && `${titleClass} badge badge-warning` || 
          (review.rating > 3) && `${titleClass} badge badge-success` 
          }>Rating: { review.rating } </span>
      </div>
    </div>
    )
}

export default Review;
