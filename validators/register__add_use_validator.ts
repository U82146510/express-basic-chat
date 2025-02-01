import Joi,{type Schema} from "joi";

//This schema validate the input for register a name from UI.

interface UserInput{
    name:string;
}

const name_validator = (schema:Schema)=>(payload:UserInput)=>schema.validate(payload,{abortEarly:false});

const name_schema = Joi.object<UserInput>({
    name:Joi.string().trim().required().min(1),
});

export const user_validation_schema = name_validator(name_schema);



//This schema validate the input for add a friend to name from UI.

interface add_friend extends UserInput{
    friend:string;
}

const friend_validator = (schema:Schema)=>(payload:add_friend)=>schema.validate(payload,{abortEarly:false});

const friend_schema = Joi.object({
    name:Joi.string().trim().min(1).required(),
    friend:Joi.string().trim().min(1).required()
});

export const friend_validation_schema = friend_validator(friend_schema);