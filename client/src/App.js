import React, { useEffect } from 'react';
import { loadUser } from './actions/auth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Profile from './components/Profile';
import Register from './components/Register';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Product from './components/Product';
import Alert from './components/Alert';
import Categories from './components/Categories';
import Departments from './components/Departments';
import UpdateProfile from './components/UpdateProfile';
import UpdateProfileAddress from './components/UpdateProfileAddress';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/access/PrivateRoute'
import AddProduct from './components/AddProduct';
import AddCategory from './components/AddCategory';
import AddDepartment from './components/AddDepartment';
import Home from './components/Home';

const App = () => {

	useEffect(() => {

		store.dispatch(loadUser());

	}, []);


	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div className="container">
					<Alert />
					<Switch>
						<Route  path="/" exact component={Home} />
						<Route  path="/products/inCategory/:id" component={ProductList}/>
						<Route  path="/products/:id" component={Product} />
						<Route  path="/departments" component={Departments} />
						<Route  path="/categories/inDepartment/:id" component={Categories} />
						<Route  path="/categories" component={Categories} />
						<Route  path="/register" component={Register} />
						<Route  path="/login" component={Login} />
						<Route  path="/products" exact component={ProductList} />
						<PrivateRoute path='/profile/edit/address' component={UpdateProfileAddress}/>
						<PrivateRoute path="/profile/edit" component={UpdateProfile} />
						<PrivateRoute path="/profile/addProduct" component={AddProduct} />
						<PrivateRoute path="/profile/addCategory" component={AddCategory} />
						<PrivateRoute path="/profile/addDepartment" component={AddDepartment} />
						<PrivateRoute path="/profile" component={Profile} />
					</Switch>
				</div>
			</Router>
		</Provider>
	)
}


export default App;