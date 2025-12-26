import { Router } from "express";
import { addMoneyToUserAsAgent, cashOutFromUserAsAgent } from "./agent.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../User/user.model";



const agentRouter = Router();
agentRouter.post("/cash-in", checkAuth(Role.AGENT),addMoneyToUserAsAgent);
agentRouter.post("/cash-out", checkAuth(Role.AGENT), cashOutFromUserAsAgent);

export default agentRouter;
    