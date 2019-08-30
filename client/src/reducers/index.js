import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import {
	filterRangeReducer,
	sortByReducer,
	showDiscountedReducer
} from './filterReducers';
import alertReducer from './alertReducer';
import categoriesReducer from './categoriesReducer';
import productReducer from './productReducer';
import departmentReducer from './departmentReducer';
import authReducer from './authReducer';
import waitReducer from './waitReducer';
import reviewReducer from './reviewReducer';
import profileReducer from './profileReducer';
import warningReducer from './warningReducer';
import attributeReducer from './attributeReducer';

export default combineReducers({
	products: productsReducer,
	range: filterRangeReducer,
	sortedBy: sortByReducer,
	discounted: showDiscountedReducer,
	alerts: alertReducer,
	categories: categoriesReducer,
	product: productReducer,
	departments: departmentReducer,
	auth: authReducer,
	review: reviewReducer,
	profile: profileReducer,
	wait: waitReducer,
	warning: warningReducer,
	attributes: attributeReducer
});

