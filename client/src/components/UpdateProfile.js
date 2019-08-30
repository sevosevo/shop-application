import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProfileIfNeeded } from '../actions/profile';
import { updateProfile } from '../actions/profile';
import Loading from './Loading';

const UpdateProfile = ({ profile: { profile, loading }, fetchProfileIfNeeded, updateProfile, history }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        dayPhone: '',
        evePhone: '',
        mobPhone: ''
    });

    const handleFormChange = ev => setFormData({
            ...formData,
            [ev.target.name] : ev.target.value
        });


    const handleSubmit = ev => {
        ev.preventDefault();
        updateProfile(formData, history);
    };

    useEffect( () => {

        fetchProfileIfNeeded();

        let prepopulatedForm = new Object();
        let fields = new Array('email', 'name', 'dayPhone', 'evePhone', 'mobPhone');

        fields.forEach(field => {
            if(!loading && profile){
                 prepopulatedForm[field] = profile[field] ? profile[field] : '';
            }
        });

        setFormData({...formData, ...prepopulatedForm});


    }, [fetchProfileIfNeeded] );

    const { email, name, password, dayPhone, evePhone, mobPhone } = formData;

    return (
        <Fragment>
        { 
            !loading && profile && <form>
            <div className="form-group my-5">
                <label  htmlFor="email">Email address: </label>
                <input type="text" className="form-control" id="email" placeholder="Enter new email" name="email" value={email} onChange={handleFormChange} />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                <label htmlFor="name">Name: </label>
                <input type="text" className="form-control" id="name" placeholder="Enter new email" name="name" value={name} onChange={handleFormChange} />
                <label htmlFor="dayphone">Dayphone: </label>
                <input type="tel" className="form-control" id="dayphone"  name="dayPhone" value={dayPhone} onChange={handleFormChange} />
                <label htmlFor="evephone">Evephone: </label>
                <input type="tel" className="form-control" id="evephone"  name="evePhone" value={evePhone} onChange={handleFormChange} />
                <label htmlFor="mobilephone">Mobilephone: </label>
                <input type="tel" className="form-control" id="mobilephone" name="mobPhone" value={mobPhone} onChange={handleFormChange} />
                <div className="alert alert-danger my-4">
                    <label htmlFor="password">Password: </label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={handleFormChange} placeholder="Enter your old password or new depending on whatever you want to change it."/>
                </div>
                <input type="submit" value="Save changes" className="btn btn-block btn-secondary" onClick = {handleSubmit} />
            </div>
        </form>}
        {(loading || !profile) && <Loading />}
        </Fragment>
    )
}

export default connect(state => ({profile: state.profile}), { fetchProfileIfNeeded, updateProfile }) (UpdateProfile);
