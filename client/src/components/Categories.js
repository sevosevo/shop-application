import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    getCategories,
    getCategoriesInDepartment
} from '../actions/categories';
import Loading from './Loading';
import CategoryItem from './CategoryItem';
import { Link } from 'react-router-dom';
import Overlay from './Overlay';


const Categories = ({ getCategories, getCategoriesInDepartment, categories: {categories, loading}, match, showAllBtn }) => {

    useState( () => {
      
            if(match){
                if(!match.params.id){
                    getCategories();
                }else{
                    getCategoriesInDepartment(match.params.id);
                }
            }else{
                getCategories();
            }
        
    } );

    const Categ = (
        <Fragment>
        {
            showAllBtn && <div style={{textAlign: 'center'}}>
                <h3 className="h3">Categories: </h3>
                <h5><Link to="/products"><span className="badge badge-danger">All categories</span></Link></h5>
            </div>
        }
        {  
            loading ? <Loading /> : categories.map(category => (
            <div className="list-group" key={category.id}>
                <CategoryItem key={category.id} category={category}/>
            </div>))
        }
        </Fragment>
    )

    return showAllBtn ? <div className="col-md-3">{Categ}</div> : <Overlay header="List of categories">{Categ}</Overlay>;
}

const mapStateToProps = state => ({
    categories: state.categories
});

export default connect(mapStateToProps, { getCategories, getCategoriesInDepartment })(Categories);
