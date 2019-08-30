import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/auth'; 
import { Redirect } from 'react-router-dom';
import Processing from './Processing';

const Register = ({register, isAuthenticated, wait: {wait}}) => {
    
    const [ formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = ev => {
        ev.preventDefault();

        register(formData);
    }

    const handleInputChange = ev => {
        setFormData({
            ...formData,
            [ev.target.name] : ev.target.value
        })
    }

    if(isAuthenticated){
        return <Redirect to="/products" />
    }

    return (
        <div className="my-5">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input name="name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={formData['name']} placeholder="Enter name" onChange={ev => handleInputChange(ev)} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input name="email" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={formData['email']} onChange={ev => handleInputChange(ev)} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={formData['password']} onChange={ev => handleInputChange(ev)} />
                </div>
                { wait ? <Processing /> : <input type="submit" className="btn btn-primary" value="Register" />}
            </form>
        </div>
    )
};

export default connect(state=>({isAuthenticated: state.auth.isAuthenticated, wait: state.wait}), { register })(Register);
