import express, { Router, NextFunction, Request, Response } from 'express';
import errorHandler from '../custom/helperFunctions/errorHandler';
//Importing Sequelize's Customer
import Customer  from '../statics/CustomerStatic';
import Error from '../interfaces/Error';
//Importing bcrypt, used for hashing
import bcrypt from 'bcrypt';
//Importing jsonwebtoken
import jwt from 'jsonwebtoken';
import passport from 'passport';
import authValidator from '../custom/validators/profileValidator';
import  { validationResult } from 'express-validator';

const router : Router = express.Router();

/*
    Login user
*/
router.post('/customers/login', authValidator.login, async(request:Request, response:Response, next:NextFunction) => {
    const {
        email,
        password
    } = request.body;
    try{

        const errors = validationResult(request).formatWith(authValidator.errorFormatter);
        if(!errors.isEmpty()){
            return response.status(422).json({errors: errors.array({onlyFirstError:false})});
        }
        
        const didFind = await Customer.findOne({
            where: {
                email
            }
        });

        if( didFind ){ 

            bcrypt.compare(password, didFind.password, (err, same) => {
                if(err)  {
                    return errorHandler(err, next);
                }
                if(same){

                    const payload = didFind.returnJwtPayload();

                    const expiresIn = '2h';

                    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
                        expiresIn
                    });

                    delete didFind.dataValues.password;

                    response
                    .status(200)
                    .json({
                        customer: didFind,
                        accessToken,
                        expiresIn
                     });

                }else{
                    const error: Error = {
                        code: 'USR_01',
                        message: 'Email or password is invalid.',
                        status: 422
                    }
                    return next(error);
                }
            })
        }else{
            const error: Error = {
                code: 'USR_05',
                message: 'User with that email doesn\'t exist',
                status: 422
            }
            return next(error);
        }
    }catch(error){
        errorHandler(error, next);
    }
});

//Login/Register witht Google account
router.post('/customers/google', passport.authenticate('google-jwt', {session: false}), (req, res, next) => {
    
    const { token, expiresIn } = createJwt(req);

    res.status(200).json({
        customer: req.user,
        accessToken: token,
        expiresIn
    });
    
});

//Login/Register with Facebook account
router.post('/customers/facebook', passport.authenticate('facebook-jwt', {session: false}), (req, res, next) => {

    const { token, expiresIn } = createJwt(req);

    res.status(200).json({
        customer: req.user,
        accessToken: token,
        expiresIn
    });

});

//Function handles JWT creation
function createJwt(req: Request, expiresIn = '3h') {
    const jwt_payload = req.user.returnJwtPayload();

    const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, {
        expiresIn
    });

    return {token, expiresIn};
}

export default router;