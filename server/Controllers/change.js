import mongoose from "mongoose";
import user_data from "../models/user_data.js";
import * as status from './status.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const change_user_data = async(req, res) => {

    const {id, name, email, pass} = req.body;
    try{
        await user_data.findByIdAndUpdate(id, {name, pass})
        const new_user = await user_data.findById(id);
        return res.status(200).json({code: status.SUCCESS, user: new_user});
    }
    catch(exception){
        return res.status(500)
    }
}

export default change_user_data;