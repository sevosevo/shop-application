import { connect } from 'react-redux';
import { setSorting } from '../actions/filter';
import React from 'react';

const SortBy = ({ setSorting, sortedBy }) => {

    const handleChange = ev => {

        setSorting(ev.target.value);
s
    }

    return (
        <div className="mb-5 border-bottom border-secondary">
            <h5><span className="badge badge-success">Sort by</span></h5>
            <select onChange={handleChange} className="mb-3">
                <option value="none">None</option>
                <option value="nameASC">Name Ascending</option>
                <option value="nameDESC">Name Descending</option>
                <option value="descASC">Desc Ascending</option>
                <option value="descDESC">Desc Descending</option>
            </select>
        </div>
    )
};

const mapStateToProps = state => ({
    sortedBy: state.sortedBy
});
export default connect(mapStateToProps, { setSorting })(SortBy);