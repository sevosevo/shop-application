import express, { Router, Request, Response, NextFunction } from 'express';
import DepartmentStatic from '../statics/DepartmentStatic';
import errorHandler from '../custom/helperFunctions/errorHandler';
import Error from '../interfaces/Error';
import authenticate from '../custom/authentication/authenticate';
import { validationResult } from 'express-validator';
import departmentValidator from '../custom/validators/departmentValidator';

const router : Router = express.Router();

router.post('/departments', authenticate, departmentValidator.create, async(request:Request, response:Response, next:NextFunction) => {
    try{
        const errors = validationResult(request).formatWith(departmentValidator.errorFormatter);
        if(!errors.isEmpty()) {
            return response.status(422).json(errors.array({onlyFirstError:false}));
        }

        const {
            name,
            description
        } = request.body;

        const department = await DepartmentStatic.create({name, description});

        response.status(200).json(department);

    }catch(error){
        errorHandler(error, next);
    }
});

router.get('/departments', async(request:Request, response:Response, next:NextFunction) => {
    try{
        //Inference  will set proper type
        const departments = await DepartmentStatic.findAll();

        response.status(200).json(departments);

    }catch(error){
        errorHandler(error, next);
    }
});

router.get('/department/:id', async(request:Request, response:Response, next:NextFunction) => {
    try{

        const id = parseInt(request.params.id);

        const department = await DepartmentStatic.findByPk(id);

        if(!department) { 
            
                const error: Error = {
                    code: 'DPT_01',
                    message: 'Department doesn\'t exist on that id.'
                }
                return next(error);
         
        }

        response.status(200).json(department);

    }catch(error){
        errorHandler(error, next);
    }
});

export default router;