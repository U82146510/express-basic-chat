import { Router } from "express";
import {register_user,add_a_friend} from '../controllers/register_add_user.ts'
export const register_add_user:Router = Router();

register_add_user.post('/register',register_user);
register_add_user.post('/add_a_friend',add_a_friend);

