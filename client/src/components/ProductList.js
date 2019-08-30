import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProductItem from './ProductItem';
import { getProducts, getProductsByCategory } from '../actions/products';
import { setAlert } from '../actions/alert';
import Loading from './Loading';
import product_list_filter from '../selectors/product_list_filter';
import Filter from './Filter';
import Search from './Search';
import Overlay from './Overlay';
import Categories from './Categories';

const alignCenter = {
	textAlign: 'center'
}

const limit = 4;

const ProductList = ({ 
	getProducts
	, getProductsByCategory
	, products: {products, count}
	, loading
	, match
	, count: numberOfAllProducts
	, setAlert }) => {

		const [page, setPage] = useState(1);
		const [inCategoryPage, setInCategoryPage] = useState({});

		const loadMore = () => {

			if(!match.params.id){
				getProducts({limit, descriptionLength: 30, page: page+1});
				setPage(page+1);
			}else{
				getProductsByCategory({categoryId: match.params.id, limit, descriptionLength: 30, page: inCategoryPage[match.params.id]+1 });
				setInCategoryPage({[match.params.id]: inCategoryPage[match.params.id]+1});
			}
			
		}

		useEffect( () => {

				if(match.params.id){

					getProductsByCategory({categoryId: match.params.id, limit, descriptionLength: 30});

				}else{
					
					getProducts({limit, descriptionLength: 30});

				}
	
		}, [match] );

		return (
			<Overlay header={"Thank you for visiting our store."} paragraph={"Register for free!"}>
				<div className={"row"}>
					<Filter />
							{
							loading ? <div className="col-md-6 align-self-center " style={alignCenter}><Loading /></div> : (
								<div className="col-md-6" style={alignCenter}>
								{ !match.params.id && <Search />}	
								{
										count > 0 ? products.map(product => <ProductItem key={product.id} product={product} />)	: <h2 className="h2 alert alert-info">No products found here. Please check in later.</h2>
								}
								{
									count < numberOfAllProducts && <button className="badge badge-secondary py-2 my-2" onClick={loadMore}>Load more</button>
								}
							</div>
							)
						}
						<Categories showAllBtn={true} />
				</div>
			</Overlay>
		)
}


const mapStateToProps = (state) => (
	{
		products: product_list_filter(state),
		loading: state.products.loading,
		count: state.products.count
	}
)

export default connect(mapStateToProps, { getProducts, getProductsByCategory, setAlert })(ProductList);
							