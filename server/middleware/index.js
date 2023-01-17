import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import * as status from '../Controllers/status.js'

dotenv.config();

export const generateToken = (email, pass) => {

    // create a token with the email-pass (primary key as most suitable for token generation) && tokenkey
    const token = jwt.sign({email, pass}, process.env.SECRET_TOKEN_KEY);
    return token
}

export const checkToken = (req, res, next) => {
    const header = req.headers['auth_token'];
    console.log(header);
    if(header === null || header === undefined)
        return res.status(200).json({code: status.AUTHORIZATION_FAILED});
    
    const token = header.split(" ")[1].slice(1, -1);
    console.log(typeof(token));

    if(token === null || token === undefined)
        return res.status(401).json({code: status.AUTHORIZATION_FAILED});
    else{
        jwt.verify(token, process.env.SECRET_TOKEN_KEY, (error, user) => {
            if(error)
                return res.status(401).json({code: status.AUTHORIZATION_FAILED});
            else    
                next();
        })
    }
}