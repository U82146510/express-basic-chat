import mongoose,{Document,Schema} from "mongoose";

interface IUser extends Document{
    name:string;
    friends:Array<{name:string,messages:mongoose.Types.ObjectId[]}>
};

interface IMessages extends Document{
    from:string,to:string,message:string
};


const user_schema = new Schema<IUser>({
    name:{type:String,required:[true,'name is required'],lowercase: true,unique:true},
    friends:[{
        name:{type:String,lowercase: true},
        messages:[{type:Schema.Types.ObjectId,ref:'Message'}]
    }]
});

const messages_schema = new Schema<IMessages>({
    from:String,
    to:String,
    message:{type:String,required:[true,'message is required']}

});

export const User = mongoose.model('User',user_schema);
export const Messages = mongoose.model('Message',messages_schema);