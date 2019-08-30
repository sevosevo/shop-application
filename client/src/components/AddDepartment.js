import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addDepartment, getDepartments } from '../actions/departments';


const AddDepartment = ({ history, addDepartment, getDepartments }) => {
    
    const [ formData, setFormData ] = useState({
        name: '',
        description: ''
    });

    const handleInputChange = ev => setFormData({...formData, [ev.target.name] : ev.target.value});

    const handleSubmit = ev => {
        ev.preventDefault();

        //I run getDepartments only because my logic 'fetching only when needed' is focused on whatever deparments array is empty or no..
        //I should have used object structure
        getDepartments();
        addDepartment(formData, history);
    }
    
    return (
        <div className="form-group py-5">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" name="name" placeholder="Department name" onChange={handleInputChange} />
                <label htmlFor="description">Description</label>
                <input type="text" id="description" className="form-control" name="description" placeholder="Description" onChange={handleInputChange} />
                <input type="submit" className="btn btn-primary btn-block my-3" />
            </form>
        </div>
    )
}

export default connect(null, { addDepartment, getDepartments })(AddDepartment);
