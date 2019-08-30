import React, { useEffect, Fragment } from 'react';
import { getProduct } from '../actions/product';
import { getAttributes } from '../actions/attribute';
import { getReviews } from '../actions/review';
import { connect } from 'react-redux';
import Loading from './Loading';
import ReviewForm from './ReviewForm';
import Review from './Review';
import calculateRating from '../selectors/calculate_rating';
import styled from 'styled-components';

const Style = styled.div`
	.jumbotron{
		padding-bottom: 15px;
		margin-bottom: 0px;
	}
`;

const Product = (
	{match: {params: {id}}
	, product: {product, loading}
	, getProduct
	, getAttributes
	, isAuthenticated
	, getReviews
	, review: {reviews}
	, rating}
	) => {


	useEffect( () => {

		getProduct(id);
		getAttributes(id);
		getReviews(id);

	}, [getProduct, getAttributes, getReviews]);

	const {[id]: prod} = product || {};

	return loading || !prod ? <Loading /> : <Style>
			<div className="product jumbotron row">
			<div id="carouselExampleControls" className="carousel slide h-100 col-md-6" data-ride="carousel">
				<div class="carousel-inner">
					<div class="carousel-item active">
					<img class="d-block" style={{height: '500px', width: 'auto'}} src={`/api/images/${prod.image}`}alt="First image"/>
					</div>
					<div class="carousel-item">
					<img class="d-block" style={{height: '500px', width: 'auto'}} src={`/api/images/${prod.image2}`} alt="Second image"/>
					</div>
				</div>
					<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="sr-only">Previous</span>
					</a>
					<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="sr-only">Next</span>
					</a>
				</div>
				<div className="about col-md-5">
					<h3 style={{textDecoration: 'underline'}}>{ prod.name }</h3>
					<h6>
					<span className={"badge badge-pill "+
					(((rating >= 1 && rating <= 2) && 'badge-danger') || ((rating > 2 && rating <= 3) && 'badge-warning') || ((rating > 3) && 'badge-success') )
					}>Rating: { rating } </span>
					</h6>
					<p>{ prod.description }</p>
				{ prod.attributes && 
					<ul className="list-group list-group-flush"> 
						{
							prod.attributes.map(attribute => (
								<li className="list-group-item">
								<i>{attribute.name} </i>: <select className="form-control">{attribute.attributeValues.map(atrValue => <option>{ atrValue.value }</option>)}</select>
								</li>
							))
						}
					</ul> 
				}
				<p className="alert alert-warning text-center">{prod.discountedPrice > 0 ? <Fragment>
					<span className="badge badge-pill badge-danger">{ prod.price }$</span>  => <span className="badge badge-pill badge-success">{ prod.discountedPrice + '$' }</span>
				</Fragment> : <span className="badge badge-pill badge-danger">{prod.price + '$'}</span>}</p>
				{
					isAuthenticated && <button className="btn btn-primary btn-block my-2">Add to Cart</button>
				}
				</div>
			</div>
			<div className="reviews">
			{
				isAuthenticated && <ReviewForm id={id}/>
			}
			</div>
				{
					isAuthenticated && reviews.length > 0 && 
							<div className="reviews">
								<h3 className="h3 card-title mb-2"><i>Reviews:</i></h3>
								<div className="row">
									{
										reviews.map(review => <Review review={review}/>)
									}
							</div>
					</div>
				}
			</Style>
}

const mapStateToProps = state => ({
	product: state.product,
	isAuthenticated: state.auth.isAuthenticated,
	review: state.review,
	rating: calculateRating(state)
});

export default connect(mapStateToProps, { getProduct, getAttributes, getReviews })(Product);


