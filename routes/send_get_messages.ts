import { Router } from "express";
import {send_message,get_message} from '../controllers/send_get_messages.ts';

export const send_get_messages:Router = Router();

send_get_messages.post('/send',send_message);
send_get_messages.get('/get',get_message);