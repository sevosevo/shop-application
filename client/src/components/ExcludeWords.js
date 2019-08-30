import React, { useState } from 'react';
import { searchProducts } from '../actions/products';
import { connect } from 'react-redux';

const ExcludeWords = ({ searchProducts }) => {

    const [ extractWords, setExtractWords ] = useState('');
    const [ limit, setLimit ] = useState(1);

    const handleChange = (ev) => {
        setExtractWords(ev.target.value);
    }

    const extractData = input => {
        let values = input.split(',');
        values = values.map(value => value.trim());
        return values.join(' ');
    }

    const handleClick = () => {
        const words = extractData(extractWords);
        searchProducts({limit, queryString: words, allWord: false});
    };

    const onSelectChange = ev => {
        setLimit(ev.target.value);
    }

    return (
            <div className="input-group my-3 border-bottom border-secondary pb-3">
                <input type="text" className="form-control" placeholder="Example: car, house" value={extractWords} onChange={handleChange}/>
                <select onChange={onSelectChange}>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="35">35</option>
                    <option value="50">50</option>
                </select>
                <button className="btn btn-secondary" onClick={handleClick}>Exclude</button>
            </div>
    )
}

export default connect(null, { searchProducts })(ExcludeWords);
