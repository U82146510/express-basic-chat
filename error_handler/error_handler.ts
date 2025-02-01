import {type Request,type Response,type NextFunction} from 'express'
export const error_handler = (err:Error,req:Request,res:Response,next:NextFunction):void=>{
    console.error(err.message);
    if(err.name ==='ValidationError'){
       res.status(400).json({ error: err.message });
       return;
    }
    res.status(500).json({error:err.message});
}