import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Alert = ({alerts}) => {
    return (
        <Fragment>
            {alerts.length > 0 && alerts.map(alert => <div key={alert.id} className={`alert alert-${alert.classToHave}`}>{alert.message}</div>)}
        </Fragment>
    )
}

export default connect(state => ({
    alerts: state.alerts
}))(Alert);
