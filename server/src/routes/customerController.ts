import express, { Router, Request, Response } from 'express';
import Customer  from '../statics/CustomerStatic';
import {CustomerModel} from '../factories/Customer';
import Error from '../interfaces/Error';
import { NextFunction } from 'connect';
import errorHandler from '../custom/helperFunctions/errorHandler';
import jwt from 'jsonwebtoken';
import authenticate  from '../custom/authentication/authenticate';

import { validationResult } from 'express-validator';

import profileValidator from '../custom/validators/profileValidator';

const router: Router = express.Router();

/*
   Gets customer that is logged in
*/
router.get('/customer', authenticate, (request: Request, response: Response, next: NextFunction) => {
   
   delete request.user.password;

   response
   .status(200)
   .json(request.user);

});

/*
   Gets all users/customers 

   *This route is not specified but i added it.*
*/
router.get('/customers', async (request: Request, response: Response, next: NextFunction) => {
   try {
      //Explicit type
      let customers: CustomerModel[];

      //We don't want to get password from users
      customers = await Customer.findAll({
         attributes: {exclude: ['password']} 
      }); //We don't want to get password in return

      response
         .status(200)
         .json(customers);

   } catch (error) {
      errorHandler(error, next);
   }
});

/*
   Register a user/customer providing him login token
*/
router.post('/customers', profileValidator.register, async (request: Request, response: Response, next: NextFunction) => {
   const {
      name,
      email,
      password,
   } = request.body;

   try {

      const errors = validationResult(request).formatWith(profileValidator.errorFormatter);
        if(!errors.isEmpty()){
            return response.status(422).json({errors: errors.array({onlyFirstError:false})});
      }

      const customer = await Customer.create({
         name,
         email,
         password
      }); // Before saving to db, password will be hashed. Hashing logic is part of Sequelize's hook.
      
      //Create cart for user
      await customer.createCart();

      delete customer.dataValues.password; //We don't want to get password in return

      const jwtPayload = customer.returnJwtPayload(); 

      const expiresIn = '2h';

      const accessToken = await jwt.sign(jwtPayload, process.env.JWT_SECRET, {
         expiresIn
      });

      response.json({
         customer,
         accessToken,
         expiresIn
      });

   } catch (error) {
      errorHandler(error, next)
   }
});



/*
   Gets specific customer/user by id
   *Not required but i added it*
*/
router.get('/customers/:id', async (request: Request, response: Response, next: NextFunction) => {
   try {
      let id: number;
      let customer: CustomerModel | null;

      id = request.params.id;
      customer = await Customer.findOne({
         where: {
            id: id
         }
      });

      if (!customer) {
         const err: Error = {
            message: 'This customer/user doesn\'t exist',
            code: 'USR_10',
            status: 404
         };
         return next(err);
      }

      response
         .status(200)
         .json(customer);

   } catch (error) {
      //Error based on ENV
      errorHandler(error, next);
   }
});

/*
   Updates logged in customer/user
*/
router.put('/customer', authenticate, profileValidator.profile, async (request: Request, response: Response, next: NextFunction) => {

   const {
      name,
      email,
      password,
      dayPhone,
      evePhone,
      mobPhone
   } = request.body;

   try {

      const errors = validationResult(request).formatWith(profileValidator.errorFormatter);
      if(!errors.isEmpty()){
          return response.status(422).json({errors: errors.array({onlyFirstError:false})});
      }

      const fields : {[field:string]: string} = {
         name,
         email,
         password,
         dayPhone,
         evePhone,
         mobPhone
      };
      

      for(let field in fields){
         request.user[field] = fields[field];
      }

      const customer = await request.user.save();

      delete customer.dataValues.password;

      response
         .status(200)
         .json(customer);


   } catch (error) {
      errorHandler(error, next);
   }
});
/*
   Updates customer's address
*/
router.put('/customer/address', authenticate, profileValidator.profileAddress, async(request:Request, response:Response, next: NextFunction) => {
   
   
   const errors = validationResult(request).formatWith(profileValidator.errorFormatter);
   if(!errors.isEmpty()){
       return response.status(422).json({errors: errors.array({onlyFirstError:false})});
   }
   
   
   const {
      address1,
      address2,
      city,
      region,
      postalCode,
      country,
      shippingRegionId
   } = request.body;

   try{

      const fields : {[key:string]: string} = {address1,address2,city,region,postalCode,country,shippingRegionId};
      
      for( let key in fields ) {
         request.user[key] = fields[key];
      }

      const result = await request.user.save();

      response
         .status(200)
         .json(result);

   }catch(error){
      errorHandler(error, next);
   }

});
/*
   Updates customer's credit card
*/
router.put('/customers/creditCard', authenticate, async(request:Request, response:Response, next:NextFunction) => {
   const { creditCard } = request.body;

   try{

   request.user.creditCard = creditCard;

   const res = await request.user.save();

   res.status(200).json(res);

   }catch(error){
      errorHandler(error, next);
   }

});

export default router;

