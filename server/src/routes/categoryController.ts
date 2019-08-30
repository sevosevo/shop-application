import express, { Router, Request, Response, NextFunction } from 'express';
import Error from '../interfaces/Error';
import CategoryStatic from '../statics/CategoryStatic';
import { CategoryModel } from '../factories/Category';
import errorHandler from '../custom/helperFunctions/errorHandler';
import DepartmentStatic from '../statics/DepartmentStatic';
import authenticate from '../custom/authentication/authenticate';
import { validationResult } from 'express-validator';
import categoryValidator from '../custom/validators/categoryValidator';

const router: Router = express.Router();

router.post('/categories', authenticate, categoryValidator.create, async(request:Request, response:Response, next:NextFunction) => {
    const errors = validationResult(request).formatWith(categoryValidator.errorFormatter);
    if(!errors.isEmpty()){
        return response.status(422).json(errors.array({onlyFirstError: false}));
    }
    const {
        name,
        description,
        department 
    } : {name: string, description: string, department: number} = request.body;
    //Department should be a number when ran through categoryValidator...

    const category = await CategoryStatic.create({ departmentId: department, name, description });

    response.status(200).json(category);

});

router.get('/categories/inDepartments', async(request:Request, response:Response, next:NextFunction) => {

    const {
        order,
        page = 1,
        limit = 20
    } = request.body;
    let categories: {rows:CategoryModel[], count: number};
    let query: any;

    try{

    const offset = (page - 1) * limit;

    query = {include: {model: DepartmentStatic, attributes: ['name']}};

    query.limit = limit;

    query.offset = offset;

    if(order)
        query.order = [
            [order, 'ASC']
        ];

    categories = await CategoryStatic.scope('CategoryAttributes').findAndCountAll(query);

    response
        .status(200)
        .json(categories);
        
    }catch(err){
        errorHandler(err, next);
    }

});


router.get('/categories', async(request: Request, response: Response, next: NextFunction) => {
    const {
        order,
        page = 1,
        limit = 20
    } = request.body;
    let categories: {rows:CategoryModel[], count: number};
    let query: any;

    try{

    const offset = (page - 1) * limit;

    query = {};

    query.limit = limit;

    query.offset = offset;

    if(order)
        query.order = [
            [order, 'ASC']
        ];

    categories = await CategoryStatic.scope('CategoryAttributes').findAndCountAll(query);

    response
        .status(200)
        .json(categories);
    }catch(err){
        errorHandler(err, next);
    }
});
router.get('/categories/:id', async(request:Request, response:Response, next: NextFunction) => {

    const id = request.params.id;
    let category: CategoryModel;

    try{

    if(!id) {
        const error : Error = {
            code: 'CAT_01',
            message: 'Category don\'t exist on that id.'
        };
        return next(error);
    }

    category = await CategoryStatic.scope('CategoryAttributes').findByPk(id);

    response
        .status(200)
        .json(category);

    }catch(err){
        errorHandler(err, next);
    }
});

router.get('/categories/inProduct/:id', async(request:Request, response:Response, next:NextFunction) => {
    
    const id = request.params.id;
    let categories: CategoryModel[];

    try{

    categories = await CategoryStatic.findByProductId(id);

    response
        .status(200)
        .json(categories);

    }catch(err){
        errorHandler(err, next);
    }
});

router.get('/categories/inDepartment/:id', async(request:Request, response:Response, next:NextFunction) => {
    
    const id = request.params.id;
    let categories: CategoryModel[];

    try{

    categories = await CategoryStatic.findByDepartmentId(id);

    response
        .status(200)
        .json(categories);

    }catch(err){
        errorHandler(err, next);
    }
});


export default router;