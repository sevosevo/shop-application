import React from 'react';
import SortBy from './SortBy';
import RangePriceSlider from './RangePriceSlider';
import ShowDiscounted from './ShowDiscounted';

const Filter = () => {
    return (
        <div className={"col-md-3 px-4 my-2"} >
            <RangePriceSlider />
            <SortBy />
            <ShowDiscounted />
        </div>
    )
}

export default Filter;
