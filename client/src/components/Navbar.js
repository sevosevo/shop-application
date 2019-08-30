import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({
	auth: {isAuthenticated}
	, history
	, logout
}) => {

	let links;

	const defaultLinks = (
		<Fragment>
			<li className="nav-item active">
					<Link to="/" className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
			</li>
			<li className="nav-item">
			<Link className="nav-link" to="/departments">All departments</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/categories">All categories</Link>
			</li>
			<li className="nav-item">
				<Link to="/products" className="nav-link">Products</Link>
			</li>
		</Fragment>
	)
	if(isAuthenticated) {
		links = (
			<Fragment>
			{
				defaultLinks
			}
			<li className="nav-item">
				<Link className="nav-link" to="/profile">My profile</Link>
			</li>
			<li className="nav-item">
				<a className="nav-link" to="#" onClick={ev => logout(history)}>Logout</a>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/profile/addProduct">Add Product</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/profile/addCategory">Add Category</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/profile/addDepartment">AddDepartment</Link>
			</li>
			</Fragment>
		)
	}else{
		links = (
		<Fragment>
			{ 
				defaultLinks 
			}
			<li className="nav-item">
			<Link className="nav-link" to='/register'>Register</Link>
			</li>
			<li className="nav-item">
			<Link className="nav-link" to="/login">Login</Link>
			</li>
		</Fragment>
		)
	}


	return (
	<nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
		<a className="navbar-brand" href="#">Store</a>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNav">
			<ul className="navbar-nav">
				{ links }
			</ul>
		</div>
	</nav>
)};

export default connect(state => ({ auth: state.auth }), { logout })(withRouter(Navbar));