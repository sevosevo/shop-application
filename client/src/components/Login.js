import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth'; 
import { Redirect } from 'react-router-dom';
import Processing from './Processing';

const Login = ({login, isAuthenticated, wait: {wait}}) => {
    
    const [ formData, setFormData] = useState({});

    const handleSubmit = ev => {
        ev.preventDefault();

        login(formData);
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
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" onChange={ev => handleInputChange(ev)} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={ev => handleInputChange(ev)} />
                </div>
                 { wait ? <Processing /> : <input type="submit" className="btn btn-primary" value="Login" />}
            </form>
        </div>
    )
};

export default connect(state=>({isAuthenticated: state.auth.isAuthenticated, wait: state.wait}), { login })(Login);
