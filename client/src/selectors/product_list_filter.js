import { createSelector } from 'reselect';

const products = state => state.products;
const range = state => state.range;
const sortBy = state => state.sortedBy;
const showDiscounted = state => state.discounted;

const getFilteredList = (products, range, sortedBy, showDiscounted) => {
    let filteredProducts = {};

    if(showDiscounted){
        filteredProducts.products = products.products.filter(x => {
            if(x.discountedPrice > 0.00) return true;
            return false
        });
    }else{
        filteredProducts.products = products.products;
    }
    if(filteredProducts.products.length === 0) return filteredProducts;
    //Filtering products by price
    filteredProducts.products = filteredProducts.products.filter(x => { 
        if(x.discountedPrice > 0.00){
            return parseFloat(x.discountedPrice) <= range;
        }
        return parseFloat(x.price) <= range
    });
    //Sort products by name, description
    if(sortBy !== 'none'){ 
        filteredProducts.products = filteredProducts.products.sort((a, b) => {
            switch(sortedBy) {
                case 'nameASC': 
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                case 'nameDESC':
                    if(a.name > b.name) return -1;
                    if(a.name < b.name) return 1;
                case 'descASC':
                    if(a.description > b.description) return 1;
                    if(a.description < b.description) return -1;
                case 'descDESC':
                    if(a.description > b.description) return -1;
                    if(a.description < b.description) return 1;
            }
        });
    }

    filteredProducts.count = filteredProducts.products.length;

    return filteredProducts;
};


export default createSelector(products, range, sortBy, showDiscounted, getFilteredList);