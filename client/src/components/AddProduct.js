import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { getAllAttributes } from '../actions/attribute';
import { getCategories } from '../actions/categories';
import authFetch from '../fetch';

const AddProduct = ({ history, attributes: { attributes, isFetching }, setAlert, getAllAttributes, getCategories, categories: { categories, loading } }) => {

    const img = useRef(null);
    const img2 = useRef(null);
    const thumbn = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        discountedPrice: 0
    });
	
    const [attr, setAttr] = useState({});
    const [category, setCategory] = useState('Choose');

    const handleCategoryChange = ev => setCategory(ev.target.value);

	const addAttributeField = (ev) => {
        ev.preventDefault();
        const num = Object.keys(attr).length + 1;
		if(Object.keys(attr).length < 3) { 
			setAttr({
                ...attr,
                ['attribute'+num]: 'Choose'  
            });
		}else{ 
			setAlert({ message: 'You can\'t have more then 3 attributes on one product.', classToHave: 'warning', time: 3000 });
        }
	}

    const handleFormChange = ev => setFormData({
        ...formData,
        [ev.target.name] : ev.target.value
    });

    const handleAttrChange = ev => setAttr({
        ...attr,
        [ev.target.name] : ev.target.value
    });

   
    const onSubmit = ev => {
        ev.preventDefault();

        if(category === 'Choose'){
            return setAlert({message: 'Category field is required.', time: 3000, classToHave: 'danger'});
        }
        
        const data = new FormData();

        if(img.current.files[0]){
            data.append('image', img.current.files[0]);
        }
        if(img2.current.files[0]){
            data.append('image2', img2.current.files[0]);
        }
        if(thumbn.current.files[0]){
            data.append('thumbnail', thumbn.current.files[0]);
        }

        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        Object.keys(attr).forEach(key => {
            data.append(key, attr[key]);
        });

        data.append('category', category);
        
        //Passing data const init by FormData will  automaticly set boundary and other headers for you
        authFetch('/api/products', { method: 'POST', body: data })
        .then(async resp => {
            if(resp.status === 422 && !resp.ok){
                const res = await resp.json();
                return res.errors.forEach(error => {
                    setAlert({message: error, classToHave: 'danger', time: 3000});
                });
            }
            setAlert({message: 'Product added', time: 3000, classToHave: 'success'});
            history.push('/products');
        })
        .catch(err => console.log(err));


    }
	
	useEffect( () => {
        getAllAttributes();
        getCategories();
	}, [] );
	

    const { name, description, price, discountedPrice, image, image2, thumbnail } = formData;

    return (
        <form>
            <div className="form-group my-5">
                <label htmlFor="category">Select category: </label>
                <select id="category" className="form-control" name="category" onChange={handleCategoryChange}>
                <option value="Choose">Choose</option>
                {
                    !loading && <React.Fragment>
                        {
                            categories.map(category => <option id={category.id} value={category.id}>{category.name} - {category.department.name}</option>)
                        }
                        </React.Fragment>
                }
                </select>
                <label  htmlFor="name">Name: </label>
                <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" value={name} onChange={handleFormChange} />
                <label htmlFor="name">Description: </label>
                <input type="text" className="form-control" id="description" placeholder="Enter description" name="description" value={description} onChange={handleFormChange} />
                <label htmlFor="dayphone">Price: </label>
                <input type="number" className="form-control" id="price"  name="price" value={price} onChange={handleFormChange} />
                <label htmlFor="evephone">Discounted Price </label>
                <input type="number" className="form-control" id="discountedPrice"  name="discountedPrice" value={discountedPrice} onChange={handleFormChange} />
                <label htmlFor="image">Image: </label>
                <input type="file" className="form-control" id="image" ref={img} filename="image"   />
                <label htmlFor="image2">Image2: </label>
                <input type="file" className="form-control" id="image2" ref={img2} filename="image2"  />
                <label htmlFor="thumbnail">Thumbnail: </label>
                <input type="file" className="form-control" id="thumbnail" ref={thumbn} filename="thumbnail"  />
				{
                    !isFetching && <button className="my-3" onClick={addAttributeField}>Add Attribute</button>
                }
				{
					!isFetching && Object.keys(attr).map(key => <select key={key} name={key} value={attr[key]} className="form-control" onChange={handleAttrChange}>
                        <option value="Choose">Choose</option>
                        {
                                attributes.map(attr => <option key={attr.id} value={attr.id}>{attr.name}</option>) 
                        }                       
                    </select>)
                }
                <input type="submit" value="Add Product" className="btn btn-block btn-secondary my-4" onClick = {onSubmit} />
            </div>
        </form>
    )
}
const mapStateToProps = state => ({
    attributes: state.attributes,
    categories: state.categories
});
export default connect(mapStateToProps, { setAlert, getAllAttributes, getCategories })(AddProduct);
