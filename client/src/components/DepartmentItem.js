import React from 'react';
import { Link } from 'react-router-dom';
import {
    formatDate
} from '../formatDate';

const DepartmentItem = ({department}) => {
    return (
            <Link to={`/categories/inDepartment/${department.id}`} className="list-group-item list-group-item-action flex-column align-items-start active my-2">
                <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{department.name}</h5>
                <small>{formatDate(department.createdAt)}</small>
                </div>
                <p className="mb-1">{department.description}</p>
                <small>{department.updatedAt === department.createdAt ? 'Didn\'t have any updates' : 'Updated at '+formatDate(category.updatedAt) }</small>
            </Link>
    )
}

export default DepartmentItem;
