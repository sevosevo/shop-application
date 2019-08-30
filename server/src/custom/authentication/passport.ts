import passport from 'passport';
import { Strategy, StrategyOptions } from 'passport-jwt';
//Social authenticaiton
const FacebookStrategy = require('passport-facebook-token');
const GoogleStrategy = require('passport-google-plus-token');
//Request interface
import { Request } from 'express';
import Customer  from '../../statics/CustomerStatic';

const customExtractor = (req: Request) => {
    let token = null;
    const header = <string>req.headers['user-key'];
    if( header ){ //Schema must be bearer 
        const [schema, key] = header.split(' ');
        if(!schema  || schema.toLowerCase() !== 'bearer'){
            return token;
        } //Token must exist
        if(key){
            token = key;
        }
    }
    return token;
}

const jwtOptions : StrategyOptions = {
    jwtFromRequest: customExtractor,
    secretOrKey: process.env.JWT_SECRET
};

/*
    JWT-LOGIN
*/
passport.use('jwt-login', new Strategy(jwtOptions, async(jwt_payload, next) => {
    try{
        const user = await Customer.findOne({where: {
            id: jwt_payload.user.id
        }});

        if( user ){

            next(null, user);

        }else {

            next(null, false, {message: 'Valid token, but user doesn\'t exist anymore'});

        }
    }catch(err){
        return next(err, false);
    }
}));

console.log('Client id: '+process.env.GOOGLE_CLIENT_ID, 'Client key'+process.env.GOOGLE_CLIENT_SECRET);
//Google Strategy
passport.use('google-jwt', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async (accessToken:any, refreshToken:any, profile:any, done:any) => {
    try{
        const email = profile.emails[0].value;
        const {
            id,
            displayName
        } = profile;

        let user = await Customer.findOne({ where: {facebookId: id} });
        if(!user){
            user = await Customer.create({googleId: id, name: displayName, email: email});
        }
        done(null, user);
    }catch(err){
        done(err, false);
    }
})
);


//console.log('Client secret: '+process.env.FACEBOOK_CLIENT_SECRET, 'Client key'+process.env.FACEBOOK_CLIENT_KEY);
passport.use('facebook-jwt', new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_KEY,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
}, async (accessToken:any, refreshToken:any, profile:any, done:any) => {
    try{
        const email = profile.emails[0].value;
        const {
            id, 
            displayName
        } = profile;
        let user = await Customer.findOne({ where: {facebookId: id} });
        if(!user) {
            user = await Customer.create({facebookId: id, name: displayName, email: email});
        }

        done(null, user);

    }catch(err){
        done(err, false);
    }
})
);