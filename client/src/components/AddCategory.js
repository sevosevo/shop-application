import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDepartmentsIfNeeded } from '../actions/departments';
import { setAlert } from '../actions/alert';
import authFetch from '../fetch';

const AddCategory = ({departments: {departments, loading}, fetchDepartmentsIfNeeded, history, setAlert}) => {

    const [ formData, setFormData ] = useState({
        name: '',
        description: '',
        department: 'Select'
    });

    useEffect( () => {
        fetchDepartmentsIfNeeded();
    }, [] )

    const handleInputChange = ev => {
        setFormData({...formData, [ev.target.name] : ev.target.value});
    }

    const handleSubmit = ev => {
        ev.preventDefault();

        authFetch('/api/categories', { method: 'POST', body: JSON.stringify(formData), headers: {'Content-Type': 'application/json'} })
        .then(async resp => {
            if(resp.status === 422 && !resp.ok){
                const errors = await resp.json();
                return errors.forEach(error => {
                    setAlert({message: error, classToHave: 'danger', time: 3000});
                });
            }
            setAlert({message: 'Category added', time: 3000, classToHave: 'success'});
            history.push('/products');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="form-group py-5">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" name="name" placeholder="Category name" onChange={handleInputChange} />
                <label htmlFor="description">Description</label>
                <input type="text" id="description" className="form-control" name="description" placeholder="Description" onChange={handleInputChange} />
                <label htmlFor="department">Select department</label>
                {
                    !loading && <select id="department" name="department" className="form-control"  onChange={handleInputChange}>
                        <option value="Select">Select</option>
                        {
                            departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)
                        }
                    </select>
                }
                <input type="submit" className="btn btn-primary btn-block my-3" />
            </form>
        </div>
    )
}

export default connect(state => ({departments: state.departments}), { fetchDepartmentsIfNeeded, setAlert })(AddCategory);
