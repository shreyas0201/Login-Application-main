import user_data from "../models/user_data.js"
import * as status from './status.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import * as middleware from '../middleware/index.js'

dotenv.config()

const login = async (req, res) => {
    
    const {email, pass} = req.body;

    try{
        const user = await user_data.findOne( {email, pass})
        
        if(user === null)  
            return res.status(200).json({code: status.INVALID_CREDENTIALS});
 
        const token = middleware.generateToken();
        
        return res.status(200).json({code: status.SUCCESS, user, token});
    }
    catch(exception){
        return res.status(500)
    }
}

export default login;