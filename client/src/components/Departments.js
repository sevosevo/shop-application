import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    fetchDepartmentsIfNeeded
} from '../actions/departments';
import Loading from './Loading';
import DepartmentItem from './DepartmentItem';
import Overlay from './Overlay';


const Departments = ({ fetchDepartmentsIfNeeded, departments: {departments, loading} }) => {

    useState( () => {

        fetchDepartmentsIfNeeded();

    } );

    return (
        <Overlay header={"List of departments"} >
            {  loading ? <Loading /> : departments.map(department => (
            <div className="list-group" key={department.id}>
                <DepartmentItem key={department.id} department={department}/>
            </div>)
            )}
        </Overlay>
    )
}

const mapStateToProps = state => ({
    departments: state.departments
});

export default connect(mapStateToProps, { fetchDepartmentsIfNeeded })(Departments);
