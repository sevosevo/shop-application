import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className={"spinner"}>
            <Spinner animation={"border"} />
            <Spinner animation={"border"} />
            <Spinner animation={"grow"} />
            <Spinner animation={"grow"} />
        </div>
    )
}

export default Loading;
