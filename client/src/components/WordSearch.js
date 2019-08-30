import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchProducts } from '../actions/products';

const style = {
    display: 'block'
};

const WordSearch = ({ searchProducts }) => {

    const [ searchString, setSearchString ] = useState('');
    const [ limit, setLimit ] = useState(1);

    const onSelectChange = ev => {

        setLimit(ev.target.value);

    }

    const onChange = ev => {
        setSearchString(ev.target.value);
    }
    const handleClick = ev => {

		searchProducts({limit, queryString: searchString, allWord: true, descriptionLength: 60});
		
    }

    return (
        <div className="input-group my-3 pb-3">
            <input type="text" className="form-control" style={style} placeholder="Search for words"  value={searchString} onChange={onChange} />
            <select onChange={onSelectChange}>
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="35">35</option>
                <option value="50">50</option>
            </select>
            <button className="btn btn-secondary" onClick={handleClick}>Search</button>
        </div>
    )
}

export default connect(null, { searchProducts })(WordSearch);
