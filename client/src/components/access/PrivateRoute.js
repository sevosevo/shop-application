import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from '../Loading';

const PrivateRoute = ({ component: Component, isAuthenticated, loading, ...rest}) =>  {
  if(loading) {
    return <Loading />;
  }
  return (
  <Route
    {...rest}
    render={props =>{
      return !isAuthenticated && !loading ? <Redirect to='/login' /> : <Component {...props} />
    }
  }
  />
)}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(PrivateRoute);
