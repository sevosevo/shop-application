import React from 'react';
import {
    formatDate
} from '../formatDate';
import {
    Link,
    withRouter
} from 'react-router-dom';



const CategoryItem = ({category}) => {
    return (
            <Link to={`/products/inCategory/${category.id}`} className="list-group-item list-group-item-action flex-column align-items-start active my-2">
                <div className="d-flex justify-content-between">
                <h5 className="mb-1">{category.name}</h5>
                <small>{formatDate(category.createdAt)}</small>
                </div>
                <p className="mb-1">{category.description}</p>
                <small>{category.updatedAt === category.createdAt ? 'Didn\'t have any updates' : 'Updated at '+formatDate(category.updatedAt) }</small>
                <br/>
                {category.department && <b>Department: {category.department.name}</b>}
            </Link>
    )
}


export default CategoryItem;
