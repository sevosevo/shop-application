import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import IError from '../../interfaces/Error';

function authenticate(req: Request, res: Response, next: NextFunction) {
   passport.authenticate('jwt-login', { session: false }, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
         let code, status, message, field;
         if(info.message === 'Valid token, but user doesn\'t exist anymore'){
            code = 'AUT_03';
            message = info.message;
            status = 403;
         }else if(info.message === 'No auth token') {
            code = 'AUT_01';
            message = info.message;
            status = 403;
         }else{
            code = 'AUT_02';
            message = 'Access Unauthorized'
            status = 403;
         }
         field = 'API_KEY'

         const error: IError = {
            code: code,
            message: message,
            status: status,
            field: field
         }
         next(error);
      }
      req.login(user, { session: false }, function (err) {
         if (err) return next(err);

         return next();
      })
   })(req, res, next);
}


export default authenticate;