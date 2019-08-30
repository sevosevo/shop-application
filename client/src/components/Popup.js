import React from 'react';
import { Link } from 'react-router-dom';

const Popup = () => {
    return (
        <div class="modal" tabIndex="-50" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update your profile!</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>We detected that your profile is not ready for online shopping! <Link to="/profile">Go here</Link> </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Warn me later</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Ignore warning</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Popup
