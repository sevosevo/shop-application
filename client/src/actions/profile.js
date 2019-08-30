import { GET_PROFILE_REQUEST, GET_PROFILE_RESPONSE, GET_PROFILE_ERROR } from '../types';
import { sendIfNot200 } from './helperMethods';
import authFetch from '../fetch';
import { setAlert } from './alert';

const requestProfile = () => ({
    type: GET_PROFILE_REQUEST
});
const receiveProfile = profile => ({
    type: GET_PROFILE_RESPONSE,
    profile
});
const profileError = error => ({
    type: GET_PROFILE_ERROR,
    error
})
export const getProfile = () => async dispatch => {

    try{

        dispatch(requestProfile());

        const _res = await authFetch('/api/customer', { method: 'GET' });

        if(await sendIfNot200(_res, profileError, dispatch)) return true;

        const profile = await _res.json();

        dispatch(receiveProfile(profile));

    }catch(err){

        dispatch(profileError({
            status: 500,
            error: err.message
        }));

    }
}
export const updateProfile = (formData, history) => async dispatch => {
    try{

        dispatch(requestProfile());

        console.log(formData);

        const _res = await authFetch('/api/customer', { method: 'PUT', body: JSON.stringify({
            ...formData
        }), headers: {'Content-Type': 'application/json'} });

        if(await sendIfNot200(_res, profileError, dispatch)) return true;

        const profile = await _res.json();
        
        dispatch(receiveProfile(profile));

        history.push('/profile');

        dispatch(setAlert({message: 'You updated your profile', time: 3000, classToHave: 'warning'}));

    }catch(err){
       
        dispatch(profileError({
            status: 500,
            error: err.message
        }));

    }
}
export const updateProfileAddress = (formData, history) => async dispatch => {
    try{

        dispatch(requestProfile());

        const _res = await authFetch('/api/customer/address', 
        {
             method: 'PUT', 
             body: JSON.stringify({
                 ...formData,
                 shippingRegionId: 1
             }), 
             headers: {
                'Content-Type': 'application/json'
             } 
        });

        if(await sendIfNot200(_res, profileError, dispatch)) return true;

        const profile = await _res.json();

        dispatch(receiveProfile(profile));

        history.push('/profile');

        dispatch(setAlert({message: 'You updated your profile', time: 3000, classToHave: 'warning'}));

    }catch(err){

        dispatch(profileError({
            status: 500,
            error: err.message
        }))

    }
}

/*
Because profile page is not changing that often,
we are not going to refetch every times user visits page.
Instead we are going to give user refresh option which will call getProfile() which will force refresh of the page
*/

const shouldFetchProfile = (_profile) => {
    const profile = _profile.profile;
    if (!profile) {
      return true
    } else {
      return false
    }
}
  
export const fetchProfileIfNeeded = () => {
    return (dispatch, getState) => {
      if (shouldFetchProfile(getState().profile)) {
        return dispatch(getProfile());
      }
    }
}