import React from 'react';
import { Link } from 'react-router-dom';

export default ({ checkInfo }) => <div className="alert alert-warning">
        <p>Missing following fields:  </p>
        <ul>
            {
                Object.keys(checkInfo).map(key => {
                    if(!checkInfo[key]) return <li key={key}><span className="badge badge-info">{ key }</span></li>
                })
            }
        </ul>
</div>;