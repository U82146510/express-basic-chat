import { type Request,type Response,type NextFunction } from "express";
import mongoose from "mongoose";
import {user_validation_schema,friend_validation_schema} from '../validators/register__add_use_validator.ts';
import { User } from "../models/user_model.ts";

interface UserInput{
    name:string;
};

interface add_friend extends UserInput{
    friend:string;
};

//Add a new user to the DB.
export const register_user = async(req:Request<{},{},UserInput>,res:Response,next:NextFunction):Promise<void>=>{
    const {value,error} = user_validation_schema(req.body);
    if(error){
        res.status(400).json({
            message:'fail',
            errors:error.message,
        });
        return;
    }
    try {
        const exist_user = await User.findOne({name:value.name.toLowerCase()});
        if(exist_user){
            res.status(409).json({message:'name already registered'});
            return;
        }
        const user = await User.create({name:value.name.toLowerCase()});
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

//Add a friend to user lists.
export const add_a_friend = async(req:Request<{},{},add_friend>,res:Response,next:NextFunction):Promise<void>=>{
    const {value,error} = friend_validation_schema(req.body);
    if(error){
        res.status(400).json({
            message:'fail',
            error:error.message
        });
        return;
    }
    try {
        const user = await User.findOne({name:value.name.toLowerCase()});
        if(!user){
            res.status(404).json({message:`user ${value.name} Not found`});
            return;
        }
        const exist_friend = user.friends.find((f)=>f.name===value.friend.toLowerCase());
        if(exist_friend){
            res.status(409).json({message:`friend ${exist_friend.name} is already in your list`});
            return;
        }
        user.friends.push({name:value.friend,messages:[] as mongoose.Types.ObjectId[]});
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};