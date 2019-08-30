import React from 'react';
import {
	Link
} from 'react-router-dom';


const ProductItem = ({ product }) => {
	return (
		<div className="row card my-4 col-md-12" style={{width: '25rem', margin: '0 auto'}}>
			<img class="card-img-top" src={`/api/images/${product.thumbnail}`} alt="Card image cap" height="450px" />
			<div className="card-body">
				<h5 className="card-title">{ product.name }</h5>
				<h6 className="card-subtitle mb-2 text-muted">
				{  product.discountedPrice > 0 ? <span style={{textDecoration: 'line-through'}}>{product.price + '$'}</span> : <span>{product.price + '$'}</span>} 
				{ product.discountedPrice > 0 && <span className="badge badge-primary ">{ product.discountedPrice }$</span> }
				</h6>
				<p className="card-text">{ product.description }</p>
				<Link to={`/products/${product.id}`} className="card-link">Details</Link>
				<Link to="#" className="card-link">Add To Cart</Link>
			</div> 
	 	 </div>
	)
}

export default ProductItem;