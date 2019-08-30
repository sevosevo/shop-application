import React, {  useState } from 'react';
import { connect } from 'react-redux';
import { showDiscounted } from '../actions/filter';

const ShowDiscounted = ({ showDiscounted }) => {

    const [ checkedField, setCheckedField ] = useState('false');
    
    const onChange = ev => {
        setCheckedField(ev.target.value);
        showDiscounted(ev.target.value === 'true');
    }

    return (
       <div className="mb-5 border-bottom border-secondary">
            <h5><span className="badge badge-warning">Show</span></h5>
            <div className="radio">
                <label><input type="radio" name="showDiscounted" value="false" checked={checkedField === 'false'} onChange={onChange} />All</label>
            </div>
            <div className="radio">
                <label><input type="radio" name="showDiscounted" value="true" checked={checkedField === 'true'} onChange={onChange} />Only discounted</label>
            </div>
        </div>
    )
}



export default connect(null, { showDiscounted })(ShowDiscounted);
