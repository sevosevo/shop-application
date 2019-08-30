import Error from '../../interfaces/Error';
import { NextFunction } from 'express';

function errorHandler(error : any, next: NextFunction, customError ?: Error) : void {
    if(process.env.NODE_ENV === 'development'){
       console.error(error);
       const err: Error = {
          message: error.message, //Here we get specific error for developer to look at
          code: 'SRV_DEV',
          status: 500
       };
       return next(err);
    }else{
       if(!customError){
          customError = {
             message: 'Server error, please contact server administrator.',
             code: 'SRV_01',
             status: 500
          }
       } // If we don't provide custom error and env is production throw generic error. Generic errors like this are for production so the user can't see what went wrong on the server
       return next(customError);
    }
 };
 

export default errorHandler;