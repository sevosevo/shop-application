import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE } from '../types';
import { setAlert } from './alert';
import fetchWithBearer from '../fetch';
import { startWait, stopWait } from './wait';
import { sendIfNot200 } from './helperMethods';

export const authError = error => ({
  type: AUTH_ERROR,
  error
})

export const loadUser = (time=30000) => async dispatch => {

      const _res = await fetchWithBearer('/api/customer', { method: 'GET' });

      if(_res.status !== 200 || !_res.ok) {

        //This will execute if there is no token, token is invalid or is expired.

          localStorage.removeItem('token');

          dispatch({
              type: AUTH_ERROR
          });
          dispatch({
              type: CLEAR_PROFILE
          })

          return;
      }

      const userData = await _res.json();

      dispatch({
        type: USER_LOADED,
        user: userData
      });
    
  };

export const register = ({ name, email, password }) => async dispatch => {

    dispatch(startWait());

    const _res =  await fetch('/api/customers', {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    });

    dispatch(stopWait());
    
    if(await sendIfNot200(_res, authError, dispatch)) return true;

    const res = await _res.json();

    localStorage.setItem('token', res.accessToken);

    dispatch({
      type: REGISTER_SUCCESS,
      token: res.accessToken
    });

    dispatch(loadUser());

    dispatch(setAlert({message:'Successfully registered', time: 3000, classToHave:'success'}));
  
};

export const login = ({email, password}) => async dispatch => {

  dispatch(startWait());

  const _res = await fetch('/api/customers/login', { method: 'POST', body: JSON.stringify({email, password}), headers: {'Content-Type': 'application/json'} });
  const res = await _res.json();

  //Wrong credentials
  if(!_res.ok || _res.status === 422){

    dispatch(setAlert({message: res.message, time: 3000, classToHave:'danger'}));

    dispatch(stopWait());

    return;
  }

  localStorage.setItem('token', res.accessToken);

  dispatch({
    type: LOGIN_SUCCESS,
    token: res.accessToken
  });

  dispatch(loadUser());

  dispatch(stopWait());

  dispatch(setAlert({message: 'Logged in', time: 3000, classToHave:'success'}));

}

export const logout = history => dispatch => {
    dispatch({
      type: LOGOUT
    });

    localStorage.removeItem('token');

    history.push('/login');
};