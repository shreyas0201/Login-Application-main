import user_data from '../models/user_data.js'
import * as status from './status.js'

const signup = async (req, res) => {
    const {name, email, pass} = req.body;

    try{        
        const user = await user_data.findOne( {email} );
        // if user exists
        if(user !== null)
            return res.status(200).json({code: status.USER_EXISTS});
        
        await user_data.create({name, email, pass});
        return res.status(200).json({code: status.SUCCESS});
        
    }
    catch(exception){
        return res.status(500)
    }
    
    

}

export default signup;