import { Router } from "express";
import { changePassword, login, logOut, registerUser } from './auth.controller';



const authRoutes = Router()
authRoutes.post("/register",registerUser)
authRoutes.post("/login",login)
authRoutes.post("/changePassword",changePassword)
// TODO: must added forgot password
authRoutes.post("/logout",logOut)
export default authRoutes