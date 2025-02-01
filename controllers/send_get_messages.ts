import { type Request,type Response,type NextFunction } from "express";
import{User,Messages} from '../models/user_model.ts';
import mongoose from "mongoose";
import {send_validation_schema,get_validation_schema} from '../validators/send_get_messages_validator.ts';

interface send_message{
    from:string;
    to:string;
    message:string;
};

interface query_message{
    name:string;
    friend:string;
};

export const send_message = async(req:Request<{},{},send_message>,res:Response,next:NextFunction):Promise<void>=>{
    const {value,error} = send_validation_schema(req.body);
    if(error){
        res.status(400).json({message:'fail',error:error.message});
        return;
    }
    try {
        const user = await User.findOne({name:value.to});
        if(!user){
            res.status(404).json({message:`name ${value.from} not found`});
            return;
        }
        const grp = user.friends.find((arg)=>arg.name===value.from.toLowerCase());
        
        if(!grp){
            res.status(404).json({message:`friend ${value.from} not found`});
            return;
        }                
        const create_message = await Messages.create({from:value.from.toLowerCase() ,to:value.to.toLowerCase() ,message:value.message});
        const add_message_to_name = grp.messages.push(create_message._id as mongoose.Types.ObjectId);
        await user.save();
        res.status(201).json({message:"success"});
    } catch (error) {
        next(error);
    }
};

export const get_message = async(req:Request<{},{},{},query_message>,res:Response,next:NextFunction):Promise<void>=>{
    const {value,error} = get_validation_schema(req.query);
    try {
        if(error){
            res.status(400).json({message:'fail',error:error.message});
            return;
        }
        let user = await User.findOne({name:value.name.toLowerCase()});
        if(!user){
            res.status(404).json({message:`name ${value.name} not found`});
            return;
        }
        const friendData = user.friends.find((f) => f.name === value.friend.toLowerCase());
        if (!friendData) {
            res.status(404).json({ message: `Friend ${value.friend} not found in ${value.name}'s friend list` });
            return;
        }

        const populatedMessages = await User.findOne({name:value.name.toLowerCase()}).select('friends')
        .populate({
            path: "friends.messages",
            model: "Message",
            match: { _id: { $in: friendData.messages } }
        });

        if (!populatedMessages) {
            res.status(404).json({ message: `No messages found for ${value.friend}` });
            return;
        }
        const friendWithMessages = populatedMessages.friends.find((f) => f.name === value.friend.toLowerCase());

        res.status(200).json({
            friend: friendWithMessages?.name,
            messages: friendWithMessages?.messages || [],
        });


    } catch (error) {
        next(error);
    }
}