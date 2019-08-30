import React from 'react';
import RangeSlider from 'react-rangeslider';
import { connect } from 'react-redux';
import { setPriceRange } from '../actions/filter';

const RangePriceSlider = ({ price, setPriceRange }) => {

    return (
    <div className="mb-5 border-bottom border-secondary">
        <h5><span className="badge badge-primary ">Price range</span></h5>
        <RangeSlider 
            value={price}
            orientation="horizontal"
            onChange={setPriceRange}
            max={100}
            min={1}
        />
    </div>
    )

}
const  mapStateToProps = state => ({
    price: state.range
});
export default connect(mapStateToProps, { setPriceRange })(RangePriceSlider);