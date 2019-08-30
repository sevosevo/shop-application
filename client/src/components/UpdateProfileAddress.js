import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProfileIfNeeded, updateProfileAddress } from '../actions/profile';
import Loading from './Loading';

const UpdateProfileAddress = ({ profile: { profile, loading }, fetchProfileIfNeeded, updateProfileAddress, history }) => {

    const [formData, setFormData] = useState({
        city: '',
        address1: '',
        address2: '',
        region: '',
        postalCode: '',
        country: ''
    });

    const handleFormChange = ev => setFormData({
            ...formData,
            [ev.target.name] : ev.target.value
        });


    const handleSubmit = ev => {
        ev.preventDefault();
        updateProfileAddress(formData, history);
    };

    useEffect( () => {

        fetchProfileIfNeeded();

        let prepopulatedForm = new Object();
        let fields = new Array('city', 'address1', 'address2', 'region', 'postalCode', 'country');

        fields.forEach(field => {
            if(!loading && profile){
                 prepopulatedForm[field] = profile[field] ? profile[field] : '';
            }
        });

        setFormData({...formData, ...prepopulatedForm});


    }, [fetchProfileIfNeeded] );

    const { 
    city,
    address1,
    address2,
    region,
    postal,
    country
} = formData;


    return (
        <Fragment>
        {!loading && profile && <form>
            <div className="form-group my-5">
                <label htmlFor="country">Country: </label>
                <input type="text" className="form-control" id="country" placeholder="Country" name="country" value={country} onChange={handleFormChange} />
                <label htmlFor="email">City: </label>
                <input type="text" className="form-control" id="city" placeholder="City" name="city" value={city} onChange={handleFormChange} />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                <label htmlFor="name">Address 1: </label>
                <input type="text" className="form-control" id="address1" placeholder="First address" name="address1" value={address1} onChange={handleFormChange} />
                <label htmlFor="dayphone">Address 2: </label>
                <input type="text" className="form-control" id="address2" placeholder="Second address"  name="address2" value={address2} onChange={handleFormChange} />
                <label htmlFor="evephone">Region: </label>
                <input type="text" className="form-control" id="region" placeholder="Region"  name="region" value={region} onChange={handleFormChange} />
                <label htmlFor="mobilephone">Postal: </label>
                <input type="text" className="form-control" id="postal" name="postalCode" placeholder="POSTAL" value={postal} onChange={handleFormChange} />
                <input type="submit" value="Save changes" className="btn btn-block btn-secondary my-4" onClick = {handleSubmit} />
            </div>
        </form>
        }
        {(loading || !profile) && <Loading />}
        </Fragment>
    )
}

export default connect(state => ({profile: state.profile}), { fetchProfileIfNeeded, updateProfileAddress }) (UpdateProfileAddress);
