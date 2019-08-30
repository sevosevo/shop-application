import {
    GET_DEPARTMENTS_RESPONSE,
    DEPARTMENT_ERROR,
    GET_DEPARTMENT_RESPONSE
} from '../types';
import {
    sendIfNot200
} from './helperMethods';
import {
    setAlert
} from './alert';
import authFetch from '../fetch';

/*
    Departments will not change that frequent so if they are loaded in store, we won't force loading them again
*/

const shouldFetchDepartments = (_departments) => {
    const department = _departments.departments;
    if (department.length === 0) {
      return true;
    } else {
      return false;
    }
}
  
export const fetchDepartmentsIfNeeded = () => {
    return (dispatch, getState) => {
      if (shouldFetchDepartments(getState().departments)) {
        return dispatch(getDepartments());
      }
    }
}

const receiveDepartments = departments => ({
    type: GET_DEPARTMENTS_RESPONSE,
    departments
});
const receiveDepartment = department => ({
    type: GET_DEPARTMENT_RESPONSE,
    department
})
const departmentsError = error => ({
    type: DEPARTMENT_ERROR,
    error
});

export const getDepartments = () => async dispatch => {

    try{

    const _res = await fetch('/api/departments', { method: 'GET' });

    if(await sendIfNot200(_res, departmentsError, dispatch)) return;

    const departments = await _res.json();

    dispatch(receiveDepartments(departments));

    dispatch(setAlert(departments.length + ' departments found.', 2000, 'success'));

    }catch(error) {
        dispatch(departmentsError({
            status: 500,
            message: error.message
        }));
    }
};

export const addDepartment = (formData, history) => async dispatch => {
    try{

    const _res = await authFetch('/api/departments', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(formData)});

    if(await sendIfNot200(_res, departmentsError, dispatch)) return;

    const res = await _res.json();

    dispatch(receiveDepartment(res));

    history.push('/products');

    }catch(error)  {
        dispatch(departmentError({
            status: 500,
            message: error.message
        }))
    }
};