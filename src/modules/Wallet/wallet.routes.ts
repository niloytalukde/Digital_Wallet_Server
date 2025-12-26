import { Router } from "express";
import {  getMyWallet, sendMoney, withdrawMoney } from "./wallet.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../User/user.model";


const walletRouter=Router();

// walletRouter.post('/deposit/:id',checkAuth(Role.USER, Role.AGENT), depositMoney);
walletRouter.post('/withdraw',checkAuth(Role.USER, Role.AGENT), withdrawMoney);
walletRouter.get('/my',checkAuth(Role.USER, Role.AGENT), getMyWallet);
walletRouter.post('/send',checkAuth(Role.USER, Role.AGENT), sendMoney);

export default walletRouter;
