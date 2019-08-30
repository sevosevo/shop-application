import express, {Request, Response, NextFunction} from 'express';
import Sequelize, { WhereOptions } from 'sequelize';
import errorHandler from '../custom/helperFunctions/errorHandler';
//import Error interface
import Error from '../interfaces/Error';
//Import sequelize's product model
import {ProductModel} from '../factories/Product';
//Authentication middleware
import authenticate from '../custom/authentication/authenticate';
import ProductStatic from '../statics/ProductStatic';
import CustomerStatic from '../statics/CustomerStatic';

import { validationResult } from 'express-validator';
import productValidator from '../custom/validators/productValidator';
import fs from 'fs';
import path from 'path';

import multer from 'multer';

const diskStorage: multer.DiskStorageOptions = {
	destination: (req, file, cb) =>  {
		cb(null, path.join(__dirname, '../', '../', 'images'));
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname+'-'+Date.now());
	}
};
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
	const ext = path.extname(file.originalname);
	if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
		return cb(new Error('Only images are allowed'))
	}
	cb(null, true)
}
const limits = { fileSize: 500000 };


const router = express.Router();

/*
	Gets all products 
	Limit is 20 by default
	return fields:
		id	integer
		name	string
		description	string
		price	string
		discounted_price	string
		thumbnail	string
*/
router.get('/products', async(request:Request, response:Response, next:NextFunction) => {
	try{
		const page  = parseInt(request.query.page) || 1;
		const limit = parseInt(request.query.limit) || request.app.get('LIMIT');
		const offset = (page - 1) * limit
		//Our backend endpoint is doing cropping of description
		//By default it will crop all descriptions with chars length more then 20

		let descriptionLength = request.query.descriptionLength || 20;

		if(isNaN(parseInt(descriptionLength))) {
			const error: Error = {code: 'PRD_02', message: 'Description length must be a number', status: 422, field: 'descriptionLength'};
			return response.status(422).json(error);
		}else if(typeof descriptionLength === 'string'){
			descriptionLength = parseInt(descriptionLength);
			//Now we know description length is a number;
		}
		//What should returned json look like
		let products : {count: number, rows: ProductModel[]};

		//We are using literal here because sequelize is not advanced enough to support ifs and concats functions...
		products = await ProductStatic.findAndCountAll({
			limit,
			offset,
			attributes: 
			[
				'id', 
				'name', 
				'price', 
				'discountedPrice', 
				'thumbnail', 
				[
					Sequelize.literal(
						`IF(
							LENGTH(description) <= ${descriptionLength}, 
							description, 
							CONCAT(LEFT(description, ${descriptionLength}), '...') 
						) `
					), 
					'description'
				]
			]
		});

		response
		.status(200)
		.json(products);

	}catch(err){
		errorHandler(err, next);
	}
});


/*
	Same as /products
	Adds search functionality:
	- queryString -> Word to search for
	- allWord -> if false, queryString must not be found in titles or descriptions
	- page, limit, offset -> tells backend how many results to skip and return

	return fields:
		id	integer
		name	string
		description	string
		price	string
		discounted_price	string
		thumbnail	string
*/
router.get('/products/search', async(request:Request, response:Response, next:NextFunction) => {
	try{
		const queryString: string = request.query.queryString;
		let allWord: any = request.query.allWord;
		const page: number  = parseInt(request.query.page) || 1; //Always a number
		const limit : number = parseInt(request.query.limit) || request.app.get('LIMIT');
		const offset : number = (page - 1) * limit;
		//Our backend endpoint is doing cropping of description
		//By default it will crop all descriptions with chars length more than 20
		let descriptionLength = request.query.descriptionLength || 20;
		
		if(isNaN(parseInt(descriptionLength))) {
			const error: Error = {code: 'PRD_02', message: 'Description length must be a number', status: 422, field: 'descriptionLength'};
			return response.status(422).json(error);
		}else if(typeof descriptionLength === 'string'){
			descriptionLength = parseInt(descriptionLength);
		}
		//If user didn't send allWord, assume it's true
		if(typeof allWord === 'undefined'){
			allWord = true;
		}else if(typeof allWord === 'string'){
			allWord = allWord === 'true';
		}
		console.log(allWord);
		let products : {count: number, rows: ProductModel[]};

		//Where is optional and depends on what queryString is
		let where: any;
		
		let query: any = {
			limit,
			offset,
			attributes: 
			[
				'id', 
				'name', 
				'price', 
				'discountedPrice', 
				'thumbnail', 
				[
					//We are using literal here because sequelize is not advanced enough to support ifs and concats functions...
					Sequelize.literal(
						`IF(
							LENGTH(description) <= ${descriptionLength}, 
							description, 
							CONCAT(LEFT(description, ${descriptionLength}), '...') 
						) `
					), 
					'description'
				]
			]
		}

		if(queryString && allWord === true || allWord === false){
			if(allWord === true){
				where = <unknown>(Sequelize.literal(`MATCH(name, description) AGAINST (+:word IN BOOLEAN MODE)`)) as WhereOptions;
			}else{
				where = <unknown>(Sequelize.literal(`NOT MATCH(name, description) AGAINST (+:word IN BOOLEAN MODE)`)) as WhereOptions;
			}
		}
		if(where){
			query = {
				...query,
				where,
				replacements: {
					word: queryString
				}
			}
		}

		products = await ProductStatic.findAndCountAll(query);

		response
		.status(200)
		.json(products);

	}catch(err){
		errorHandler(err, next);
	}
});
/*
	Get product by id
	return fields:
		- all
*/
router.get('/products/:id', async(request:Request, response:Response, next:NextFunction) => {
	const id : number = parseInt(request.params.id);
	let product : ProductModel;

	try{

	product = await ProductStatic.scope('ProductCompleteAttributes').findByPk(id);
	
	//If there is no product throw friendly message to client
	if(!product){
		const err: Error = {
			message: 'Product with this id doesn\'t  exist',
			code: 'PRD_01',
			field: 'id'
		}
		return next(err);
	}

	response.status(200)
	.json(product);

	}catch(err){
		errorHandler(err, next);
	}
});
/*
	Searches for products in certain category
	Return fields:
		id	integer
		name	string
		description	string
		price	string
		discounted_price	string
		thumbnail	string

*/
router.get('/products/inCategory/:categoryId', async(request:Request, response:Response, next:NextFunction) => {
	
	const categoryId: number = parseInt(request.params.categoryId);
	const queryString: string = request.query.queryString;
	let allWord: any = request.query.allWord;

	//Defining type for later type checking
	let products: {count: number, rows:ProductModel[]};

	const page  = parseInt(request.query.page) || 1;
	const limit = parseInt(request.query.limit) || request.app.get('LIMIT');
	const offset = (page - 1) * limit;

	if(typeof allWord === 'undefined'){
		allWord = true;
	}else if(typeof allWord === 'string'){
		allWord = allWord === 'true';
	}

	let descriptionLength = request.query.descriptionLength || 20;
	if(isNaN(parseInt(descriptionLength))) {
		const error: Error = {code: 'PRD_02', message: 'Description length must be a number', status: 422, field: 'descriptionLength'};
		return response.status(422).json(error);
	}else if(typeof descriptionLength === 'string'){
		descriptionLength = parseInt(descriptionLength);
	}

	try{

	let where;
	if(queryString && allWord === true || allWord === false){
		if(allWord === true){
			where = <unknown>(Sequelize.literal(`MATCH(name, description) AGAINST (+:word IN BOOLEAN MODE)`)) as WhereOptions;
		}else{
			where = <unknown>(Sequelize.literal(`NOT MATCH(name, description) AGAINST (+:word IN BOOLEAN MODE)`)) as WhereOptions;
		}
	}

	//Finds all users in certain category
	products = await ProductStatic.getByCategoryId([
		'id', 
		'name', 
		'price', 
		'discountedPrice', 
		'thumbnail', 
		[
			//We are using literal here because sequelize is not advanced enough to support ifs and concats functions...
			Sequelize.literal(
				`IF(
					LENGTH(description) <= ${descriptionLength}, 
					description, 
					CONCAT(LEFT(description, ${descriptionLength}), '...') 
				) `
			), 
			'description'
		]
	], categoryId, {offset, limit, where});
	
	response.status(200).json(products);

	}catch(err){
		errorHandler(err, next);
	}
});
/*
	Gets specific product's details
	Return fields:
		id	integer
		name	string
		description	string
		price	string
		discounted_price	string
		image	string
		image2	string
*/
router.get('/products/:id/details', async(request:Request, response:Response, next:NextFunction) => {
	const id: number = parseInt(request.params.id);
	let product: ProductModel;

	try{

	product = await ProductStatic.scope('ProductDetailAttributes').findByPk(id);

	if(!product){
		const error: Error = {
			message: 'Product with this id doesn\'t exist',
			code: 'PRD_01',
			field: 'id'
		}
		return next(error);
	}

	response.status(200).json(product);
	
	}catch(err){
		errorHandler(err, next);
	}
});
/*
	Gets product's reviews
*/
router.get('/products/:id/reviews', async(request:Request, response:Response, next:NextFunction) => {
	const id: number = parseInt(request.params.id);

	try{

	const product = await ProductStatic.findByPk(id);

	if(!product){
		const error: Error = {
			message: 'Product with this id doesn\'t exist',
			code: 'PRD_01',
			field: 'id'
		}
		return next(error);
	}
	const reviews = await product.getReviews();

	response.status(200).json(reviews);

	}catch(err){
		errorHandler(err, next);
	}
});

router.get('/products/:id/reviews/details', async (request:Request, response:Response, next:NextFunction) => {
	const id: number = parseInt(request.params.id);

	try{

	const product = await ProductStatic.findByPk(id);
	
	if(!product){
		const error: Error = {
			message: 'Product with this id doesn\'t exist',
			code: 'PRD_01',
			field: 'id'
		}
		return next(error);
	}
	const reviews = await product.getReviews({include: [{model: CustomerStatic, attributes: ['name']}]});

	response.status(200).json(reviews);

	}catch(err){
		errorHandler(err, next);
	}
});
/*
	Create review for the product
*/
router.post('/products/:id/reviews',  authenticate, async(request:Request, response:Response, next:NextFunction) => {

	const id: number = parseInt(request.params.id);

	const {
		name,
		review,
		rating
	} = request.body;

	const product = await ProductStatic.findByPk(id);

	if(!product){
		const error: Error = {
			message: 'Product with this id doesn\'t exist',
			code: 'PRD_01',
			field: 'id'
		}
		return next(error);
	}
	const rev = await request.user.createReview({name, review, rating, productId: product.id});
	
	response.status(200).json(rev);
});

router.post('/products', authenticate, multer({ 
	fileFilter: fileFilter,
	storage: multer.diskStorage(diskStorage),
	limits
}).fields([{name: 'image', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'thumbnail', maxCount: 1}]), productValidator.create, 
async(request:Request, response:Response, next:NextFunction) => {
	try{
	const errors = validationResult(request).formatWith(productValidator.errorFormatter);
        if(!errors.isEmpty()){
			//This is logic for deleting files that are uploaded by multer when posting here
			let files = new Array(
				request.files.image && request.files.image[0],
				request.files.image2 && request.files.image2[0],
				request.files.thumbnail && request.files.thumbnail[0]
			);
			files = files.filter(file => typeof file !== 'undefined');
			files.forEach((file:any) => {
				if( fs.existsSync(file.path) ) 
					fs.unlink(file.path, err => {
						if( err ) return next(err);
					} );
			});
			return response.status(422).json({errors: errors.array({onlyFirstError:false})});
		}
	
		let createObj: any;
		let attributes: number[];
		let cat: number;

		const {
			name,
			description,
			discountedPrice,
			price,
			attribute1,
			attribute2,
			attribute3,
			category
		} = request.body;

		console.log(name, description, discountedPrice, price);

		const { image, image2, thumbnail }: any = request.files; //Get files information

		createObj = {name, description, price, discountedPrice};

		if(image){
			createObj.image = image[0].filename;
		}
		if(image2){
			createObj.image2 = image2[0].filename;
		}
		if(thumbnail){
			createObj.thumbnail = thumbnail[0].filename;
		}
		const product = await ProductStatic.create(createObj);

		attributes = [parseInt(attribute1), parseInt(attribute2), parseInt(attribute3)];

		attributes = attributes.filter(attr => typeof attr === 'number' && !isNaN(attr));

		if(attributes.length > 0){
			await product.addAttributes(attributes);
		}

		cat = parseInt(category);
		if(!isNaN(cat) && typeof cat === 'number') {
			await product.addCategories([cat]);
		}

		response.status(200).json(product);
	}catch(err) {
		next(err);
	}
});

export default router;

