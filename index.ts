import express,{type Express} from 'express';
import dotenv from 'dotenv';
import {register_add_user} from './routes/register_add_user.ts';
import {send_get_messages} from './routes/send_get_messages.ts';
import {connectDB} from './config/connect_to_db.ts'; 
import {error_handler} from './error_handler/error_handler.ts';
dotenv.config();

const app:Express = express();
app.use(express.json());

app.use('/user',register_add_user);
// /user/register - route to register a new user; {name:<name>} "post req"
// /user/add_a_friend/add_a_friend - route to add a new friend to friend list. {name:<name>,friend:<friend_name>} "post req"
app.use('/message',send_get_messages);
// /message/send - route to send a message from UI;{"from":<name>,"to":<friend>,"message":<text>} "post req"
// /message/get - route to get all messages from a certain friend; {name:<name>,friend:<friend>} "Get res, using query"
app.use(error_handler);

const start = async():Promise<void>=>{
    try {
        await connectDB();
        app.listen(3000,()=>console.log('server listen on:3000'));
    } catch (error) {
        console.log(error);
    }
}


start();