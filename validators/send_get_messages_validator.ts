import Joi,{type Schema} from "joi";


//Validate the send message from UI.
interface send_message{
    from:string;
    to:string;
    message:string;
}

const send_schema = Joi.object({
    from:Joi.string().min(1).trim().required(),
    to:Joi.string().min(1).trim().required(),
    message:Joi.string().min(1).required()
});

const send_validator = (schema:Schema)=>(payload:send_message)=>schema.validate(payload);

export const send_validation_schema = send_validator(send_schema);

//Validate the get query from UI.
interface query_message{
    name:string;
    friend:string;
};

const get_schema = Joi.object({
    name:Joi.string().min(1).trim().required(),
    friend:Joi.string().min(1).trim().required(),
});

const get_validator = (schema:Schema)=>(payload:query_message)=>schema.validate(payload);
export const get_validation_schema = get_validator(get_schema);