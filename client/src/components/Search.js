import React from 'react';
import WordSearch from './WordSearch';
import ExcludeWords from './ExcludeWords';

const Search = () => {
    return (
        <div>
            <h3 className="h3">Search: </h3>
            <WordSearch />
            <ExcludeWords />
        </div>
    )
}

export default Search;
