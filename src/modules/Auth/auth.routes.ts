import { Router } from "express";
import { changePassword, login, logOut, registerUser } from './auth.controller';
import { checkAuth } from './../../middlewares/checkAuth';
import { Role } from "../User/user.model";



const authRoutes = Router()
authRoutes.post("/register",registerUser)
authRoutes.post("/login",login)
authRoutes.patch("/changePassword",checkAuth(Role.ADMIN,Role.AGENT,Role.USER),changePassword)
// TODO: must added forgot password
authRoutes.post("/logout",logOut)
export default authRoutes